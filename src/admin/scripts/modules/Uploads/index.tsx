import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { ROUTES, ROUTE_SUFFIX, TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { moduleObjectProps } from '../../types/app';
import { UploadsItemProps, UploadsItemLangProps } from '../../types/model';
import {
	selectedArrayProps,
	selectedItemsProps,
	confirmDialogTypeProps,
} from '../../types/table';
import { useUploads } from '../../hooks/model';
import getDetailData from '../../utils/getDetailData';
import { useProfile, useSettings } from '../../hooks/common';
import { ConfirmDialog, Preloader } from '../../components/ui';
import DataTable from '../../components/DataTable';
import UploadsDetailForm from './UploadsDetailForm';
import UploadsDetailNewForm from './UploadsDetailNewForm';
import { useToasts } from '../../hooks/common';
import { getLanguagesFields } from '../../utils/detail';
import { string } from '../../../../../utils/utils';

interface UploadsModuleProps {}

const UploadsModule = ({}: UploadsModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'messages']);
	const [detail, setDetail] = useState<string | number>(null);
	const [detailData, setDetailData] = useState<UploadsItemProps>(null);
	const [selectedItems, setSelectedItems] = useState<selectedItemsProps>([]);
	const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
	const [confirmDialogType, setConfirmDialogType] =
		useState<confirmDialogTypeProps>(null);
	const [confirmDialogData, setConfirmDialogData] =
		useState<selectedArrayProps>([]);
	const [isProcessing, setProcessing] = useState<boolean>(false);
	const { createToasts, createErrorToast } = useToasts(dispatch);
	const { Settings } = useSettings();
	const { Profile } = useProfile();
	const {
		Uploads,
		createUploads,
		updateUploads,
		toggleUploads,
		deleteUploads,
		reloadUploads,
		uploads_loading,
		uploads_error,
	} = useUploads();
	const moduleObject: moduleObjectProps = {
		model: 'Uploads',
		route: ROUTES.app.uploads,
		detail: {},
		table: {
			tableCells: {
				file_name: ['left', 'auto'],
				type: ['left', '150px'],
				active: ['right', '125px'],
			},
			tableSearchProps: ['name'],
		},
	};
	const createNewCallback = () =>
		history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/new`);
	const openDetailHandler = (id: string, redirect?: boolean) => {
		const detail = getDetailData(id, 'Uploads', Uploads);
		if (id == 'new')
			detail['lang'] = getLanguagesFields(Settings?.language_active, {
				label: '',
				description: '',
			} as UploadsItemLangProps);
		setDetail(id);
		setDetailData(detail);
		if (redirect)
			history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/${id}`);
	};
	const closeDetailHandler = () => {
		setDetail(null);
		setDetailData(null);
		history.push(moduleObject.route.path);
	};
	const itemSelectHandler = (selected: readonly string[]) =>
		setSelectedItems(selected);
	// const detailSubmitHandler = (data: UploadsItemProps, count?: number) => {
	// 	const master: UploadsItemProps = _.cloneDeep(data);
	// 	setProcessing(true);
	// 	if (master.id == 'new') {
	// 		// reformat data before save
	// 		master.name = master.name.split(' ').join('-');
	// 		createUploads(master).then((response) => {
	// 			reloadUploads();
	// 			createToasts({
	// 				title: t('messages:success.itemCreated'),
	// 				context: 'success',
	// 				timeout: TOASTS_TIMEOUT_DEFAULT,
	// 			});
	// 			setProcessing(false);
	// 		});
	// 	} else {
	// 		updateUploads(master).then((response) => {
	// 			reloadUploads();
	// 			closeDetailHandler();
	// 			createToasts({
	// 				title: t('messages:success.itemUpdated', { count: 1 }),
	// 				context: 'success',
	// 				timeout: TOASTS_TIMEOUT_DEFAULT,
	// 			});
	// 			setProcessing(false);
	// 		});
	// 	}
	// };
	const detailSubmitHandler = (data: UploadsItemProps, count?: number) => {
		const master: UploadsItemProps = _.cloneDeep(data);
		const counter = count;
		setProcessing(true);
		if (count && master.id == 'new') {
			// reformat data before save
			master.name = master.name.split(' ').join('-');
			console.log('count', count);
			createUploads(master).then((response) => {
				createToasts({
					title: t('messages:success.itemCreated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				if (count === 1) {
					reloadUploads();
					setProcessing(false);
					if (counter > 1)
						createToasts({
							title: t('messages:success.itemsCreated'),
							context: 'success',
							timeout: TOASTS_TIMEOUT_DEFAULT,
						});
				}
			});
		} else if (master.id > 0) {
			updateUploads(master).then((response) => {
				reloadUploads();
				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemUpdated', { count: 1 }),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				setProcessing(false);
			});
		}
	};
	const detailSubmitErrorHandler = (error: string) => createErrorToast(error);
	const detailCancelHandler = (dirty: boolean) => {
		if (dirty) {
			setConfirmDialog(true);
			setConfirmDialogType('formDirty');
		} else {
			closeDetailHandler();
		}
	};
	const itemDeleteHandler = (ids: selectedArrayProps) => {
		const master: selectedArrayProps = [...ids];
		setConfirmDialog(true);
		setConfirmDialogType('delete');
		setConfirmDialogData(master);
	};
	const closeConfirmHandler = () => {
		setConfirmDialog(false);
		setConfirmDialogType(null);
		setConfirmDialogData([]);
	};
	const itemToggleHandler = (ids: selectedArrayProps) => {
		const master: selectedArrayProps = [...ids];
		setProcessing(true);
		toggleUploads(master).then((response) => {
			reloadUploads();
			setSelectedItems([]);
			createToasts({
				title: t('messages:success.itemUpdated', { count: master.length }),
				context: 'success',
				timeout: TOASTS_TIMEOUT_DEFAULT,
			});
			setProcessing(false);
		});
	};
	const dialogConfirmHandler = () => {
		if (confirmDialogType == 'delete') {
			const master: selectedArrayProps = [...confirmDialogData];
			setProcessing(true);
			deleteUploads(master).then((response) => {
				reloadUploads();
				setSelectedItems([]);
				closeConfirmHandler();
				createToasts({
					title: t('messages:success.itemDeleted', { count: master.length }),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				setProcessing(false);
				if (master.length == 1) history.push(moduleObject.route.path);
			});
		} else if (confirmDialogType == 'formDirty') {
			closeConfirmHandler();
			history.push(moduleObject.route.path);
		}
	};
	const toggleDetail = () => {
		if (params.id) {
			setDetail(params.id);
			openDetailHandler(params.id);
		} else {
			setDetailData(null);
		}
	};

	useEffect(() => {
		if (Uploads) toggleDetail();
	}, [params.id, Uploads]);

	return (
		<>
			{Uploads ? (
				<>
					{detail && detailData ? (
						<>
							{detail == 'new' ? (
								<UploadsDetailNewForm
									detailData={detailData}
									detailOptions={moduleObject.detail}
									onSubmit={detailSubmitHandler}
									onSubmitError={detailSubmitErrorHandler}
									onCancel={detailCancelHandler}
									languageList={Settings?.language_active}
									languageDefault={Settings?.language_default}
									onCreateCallback={createNewCallback}
									isProcessing={isProcessing}
								/>
							) : (
								<UploadsDetailForm
									key={`${moduleObject.model}-${detail}`}
									detailData={detailData}
									detailOptions={moduleObject.detail}
									onSubmit={detailSubmitHandler}
									onSubmitError={detailSubmitErrorHandler}
									onCancel={detailCancelHandler}
									onDelete={(id) => itemDeleteHandler([id])}
									languageList={Settings?.language_active}
									languageDefault={Settings?.language_default}
									onCreateCallback={createNewCallback}
									isProcessing={isProcessing}
									profileLevel={Profile?.user_level}
								/>
							)}
						</>
					) : (
						<DataTable
							model={moduleObject.model}
							routeObject={moduleObject.route}
							tableData={Uploads}
							tableCells={moduleObject.table.tableCells}
							tableSearchProps={moduleObject.table.tableSearchProps}
							selectedItems={selectedItems}
							onToggle={itemToggleHandler}
							onDelete={itemDeleteHandler}
							onSelect={itemSelectHandler}
							languageList={Settings?.language_active}
							languageDefault={Settings?.language_default}
							onCreateCallback={createNewCallback}
						/>
					)}
				</>
			) : (
				<Preloader.Block />
			)}
			<Preloader.Bar isProcessing={isProcessing || uploads_loading} />
			<ConfirmDialog
				isOpen={confirmDialog}
				onClose={closeConfirmHandler}
				confirmMethod={confirmDialogType}
				onConfirm={dialogConfirmHandler}
				confirmData={confirmDialogData}
			/>
		</>
	);
};

export default UploadsModule;
