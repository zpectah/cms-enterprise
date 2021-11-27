import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { ROUTES, ROUTE_SUFFIX, TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { moduleObjectProps } from '../../types/app';
import { PagesItemProps } from '../../types/model';
import {
	selectedArrayProps,
	selectedItemsProps,
	confirmDialogTypeProps,
} from '../../types/table';
import { usePages } from '../../hooks/model';
import getDetailData from '../../utils/getDetailData';
import { useSettings } from '../../hooks/common';
import { ConfirmDialog, Preloader } from '../../components/ui';
import DataTable from '../../components/DataTable';
import PagesDetailForm from './PagesDetailForm';
import { useToasts } from '../../hooks/common';

interface PagesModuleProps {}

const PagesModule = ({}: PagesModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'messages']);
	const [detail, setDetail] = useState<string | number>(null);
	const [detailData, setDetailData] = useState<PagesItemProps>(null);
	const [selectedItems, setSelectedItems] = useState<selectedItemsProps>([]);
	const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
	const [confirmDialogType, setConfirmDialogType] =
		useState<confirmDialogTypeProps>(null);
	const [confirmDialogData, setConfirmDialogData] =
		useState<selectedArrayProps>([]);

	const { createToasts } = useToasts(dispatch);
	const { Settings } = useSettings();
	const {
		Pages,
		createPages,
		updatePages,
		togglePages,
		deletePages,
		pages_loading,
		pages_error,
	} = usePages();

	// Module object data & options
	const moduleObject: moduleObjectProps = {
		model: 'Pages',
		route: ROUTES.app.pages,
		detail: {},
		table: {
			tableCells: {
				name: ['left', 'auto'],
				type: ['left', '150px'],
				active: ['right', '125px'],
			},
			tableSearchProps: ['name'],
		},
	};

	// Trigger callback for detail
	const createNewCallback = () =>
		history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/new`);

	// Trigger open detail with current id and set data
	const openDetailHandler = (id: string, redirect?: boolean) => {
		setDetail(id);
		setDetailData(getDetailData(id, 'Pages', Pages));

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
	const detailSubmitHandler = (data: PagesItemProps) => {
		const master: PagesItemProps = _.cloneDeep(data);

		console.log('AJAX ... create/save ...', master);

		if (master.id == 'new') {
			createPages(master).then((response) => {
				console.log('create response', response);

				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemCreated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
			});
		} else {
			updatePages(master).then((response) => {
				console.log('update response', response);

				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemUpdated', { count: 1 }),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
			});
		}
	};

	// When error returns from submit
	const detailSubmitErrorHandler = (error: string) =>
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

	// When item/row opens confirm dialog
	const itemDeleteHandler = (ids: selectedArrayProps) => {
		const master: selectedArrayProps = [...ids];

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
	const itemToggleHandler = (ids: selectedArrayProps) => {
		const master: selectedArrayProps = [...ids];

		console.log('AJAX ... toggle ...', master);

		togglePages(master).then((response) => {
			console.log('toggle response', response);

			setSelectedItems([]);
			createToasts({
				title: t('messages:success.itemUpdated', { count: master.length }),
				context: 'success',
				timeout: TOASTS_TIMEOUT_DEFAULT,
			});
		});
	};

	// When item/row is confirmed to submit confirm dialog
	const dialogConfirmHandler = () => {
		if (confirmDialogType == 'delete') {
			const master: selectedArrayProps = [...confirmDialogData];

			console.log('AJAX ... delete ...', master);

			deletePages(master).then((response) => {
				console.log('delete response', response);

				setSelectedItems([]);
				closeConfirmHandler();
				createToasts({
					title: t('messages:success.itemDeleted', { count: master.length }),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				if (master.length == 1) history.push(moduleObject.route.path);
			});
		} else if (confirmDialogType == 'formDirty') {
			closeConfirmHandler();
			history.push(moduleObject.route.path);
		}
	};

	const toggleDetail = useCallback(() => {
		if (params.id) {
			setDetail(params.id);
			openDetailHandler(params.id);
		} else {
			setDetailData(null);
		}
	}, [params.id]);

	useEffect(() => {
		if (Pages) toggleDetail();
	}, [params.id, Pages]);

	return (
		<>
			{Pages ? (
				<>
					{detail && detailData ? (
						<PagesDetailForm
							detailData={detailData}
							detailOptions={moduleObject.detail}
							onSubmit={detailSubmitHandler}
							onSubmitError={detailSubmitErrorHandler}
							onCancel={detailCancelHandler}
							onDelete={(id) => itemDeleteHandler([id])}
							languageList={Settings.language_active}
							languageDefault={Settings.language_default}
							onCreateCallback={createNewCallback}
						/>
					) : (
						<DataTable
							model={moduleObject.model}
							routeObject={moduleObject.route}
							tableData={Pages}
							tableCells={moduleObject.table.tableCells}
							tableSearchProps={moduleObject.table.tableSearchProps}
							selectedItems={selectedItems}
							onToggle={itemToggleHandler}
							onDelete={itemDeleteHandler}
							onSelect={itemSelectHandler}
							languageList={Settings.language_active}
							languageDefault={Settings.language_default}
							onCreateCallback={createNewCallback}
						/>
					)}
				</>
			) : (
				<Preloader.Block />
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

export default PagesModule;
