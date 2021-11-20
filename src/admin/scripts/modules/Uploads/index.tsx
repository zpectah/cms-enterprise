import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { ROUTES, ROUTE_SUFFIX, TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { moduleObjectProps } from '../../types/app';
import { UploadsItemProps } from '../../types/model';
import { useUploads } from '../../hooks/app';
import getDetailData from '../../utils/getDetailData';
import { useSettings } from '../../hooks/common';
import { ConfirmDialog } from '../../components/ui';
import DataTable from '../../components/DataTable';
import UploadsDetailForm from './UploadsDetailForm';
import { useToasts } from '../../hooks/common';

interface UploadsModuleProps {}

const UploadsModule = ({}: UploadsModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'messages']);
	const [detail, setDetail] = useState<string>(null);
	const [detailData, setDetailData] = useState<any>(null);
	const [selectedItems, setSelectedItems] = useState<
		readonly (number | string)[]
	>([]);
	const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
	const [confirmDialogType, setConfirmDialogType] = useState<
		'delete' | 'formDirty' | null
	>(null);
	const [confirmDialogData, setConfirmDialogData] = useState<
		(number | string)[]
	>([]);

	const { createToasts } = useToasts(dispatch);
	const { Settings } = useSettings();
	const {
		Uploads,
		createUploads,
		updateUploads,
		toggleUploads,
		deleteUploads,
	} = useUploads();

	// Module object data & options
	const moduleObject: moduleObjectProps = {
		model: 'Uploads',
		route: ROUTES.app.uploads,
		detail: {},
		table: {
			tableCells: {
				name: ['left', 'auto'],
				active: ['right', '125px'],
			},
			tableSearchProps: ['name'],
		},
	};

	// Trigger open detail with current id and set data
	const openDetailHandler = (id: string, redirect?: boolean) => {
		setDetail(id);
		setDetailData(getDetailData(id, 'Uploads', Uploads));

		if (redirect)
			history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/${id}`);
	};

	// Trigger closes detail and show table
	const closeDetailHandler = () => {
		setDetail(null);
		setDetailData(null);

		history.push(moduleObject.route.path);
	};

	// When item/row is selected in DataTable
	const itemSelectHandler = (selected: readonly string[]) =>
		setSelectedItems(selected);

	// When detail is submitted (create/update)
	const detailSubmitHandler = (data: any, e: any) => {
		const master = _.cloneDeep(data);

		console.log('AJAX ... create/save ...', master);

		if (master.id == 'new') {
			updateUploads(master).then((response) => {
				console.log('update response', response);

				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemCreated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
			});
		} else {
			createUploads(master).then((response) => {
				console.log('create response', response);

				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemUpdated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
			});
		}
	};

	// When error returns from submit
	const detailSubmitErrorHandler = (error: any, e: any) =>
		createToasts({
			title: error,
			context: 'error',
			timeout: TOASTS_TIMEOUT_DEFAULT,
		});

	const detailCancelHandler = (dirty: boolean) => {
		if (dirty) {
			setConfirmDialog(true);
			setConfirmDialogType('formDirty');
		} else {
			closeDetailHandler();
		}
	};

	// When detail opens confirm dialog
	const detailDeleteHandler = (id: number | string) => {
		const master = [id];

		setConfirmDialog(true);
		setConfirmDialogType('delete');
		setConfirmDialogData(master);
	};

	// When item/row opens confirm dialog
	const itemDeleteHandler = (ids: (number | string)[] = []) => {
		const master = [...ids];

		setConfirmDialog(true);
		setConfirmDialogType('delete');
		setConfirmDialogData(master);
	};

	// When confirm dialog closes
	const closeConfirmHandler = () => {
		setConfirmDialog(false);
		setConfirmDialogType(null);
		setConfirmDialogData([]);
	};

	// When item/row is active/disable toggled
	const itemToggleHandler = (ids: (number | string)[]) => {
		const master = [...ids];

		console.log('AJAX ... toggle ...', master);

		toggleUploads(master).then((response) => {
			console.log('toggle response', response);

			setSelectedItems([]);
			createToasts({
				title: t('messages:success.itemUpdated', { value: master.length }),
				context: 'success',
				timeout: TOASTS_TIMEOUT_DEFAULT,
			});
		});
	};

	// When item/row is confirmed to submit confirm dialog
	const dialogConfirmHandler = () => {
		if (confirmDialogType == 'delete') {
			// proceed delete
			// close and redirect back as callback

			const master = [...confirmDialogData];

			console.log('AJAX ... delete ...', master);

			deleteUploads(master).then((response) => {
				console.log('delete response', response);

				setSelectedItems([]);
				closeConfirmHandler();
				createToasts({
					title: t('messages:success.itemDeleted', { value: master.length }),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				if (confirmDialogData.length == 1)
					history.push(moduleObject.route.path);
			});
		} else if (confirmDialogType == 'formDirty') {
			closeConfirmHandler();
			history.push(moduleObject.route.path);
		}
	};

	useEffect(() => setDetail(params.id), [params.id]);
	useEffect(() => {
		if (detail) {
			openDetailHandler(params.id);
		} else {
			setDetailData(null);
		}
	}, [detail]);

	return (
		<>
			{detail && detailData ? (
				<UploadsDetailForm
					detailData={detailData}
					detailOptions={moduleObject.detail}
					onSubmit={detailSubmitHandler}
					onSubmitError={detailSubmitErrorHandler}
					onCancel={detailCancelHandler}
					onDelete={detailDeleteHandler}
					languageList={Settings.language_active}
					languageDefault={Settings.language_default}
				/>
			) : (
				<>
					{Uploads ? (
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
							languageList={Settings.language_active}
							languageDefault={Settings.language_default}
						/>
					) : (
						<div>Loading</div>
					)}
				</>
			)}
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
