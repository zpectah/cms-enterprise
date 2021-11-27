import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { ROUTES, ROUTE_SUFFIX, TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { moduleObjectProps } from '../../types/app';
import { CategoriesItemProps } from '../../types/model';
import { useCategories } from '../../hooks/app';
import getDetailData from '../../utils/getDetailData';
import { useSettings } from '../../hooks/common';
import { ConfirmDialog, Preloader } from '../../components/ui';
import DataTable from '../../components/DataTable';
import CategoriesDetailForm from './CategoriesDetailForm';
import { useToasts } from '../../hooks/common';

interface CategoriesModuleProps {}

const CategoriesModule = ({}: CategoriesModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'messages']);
	const [detail, setDetail] = useState<string | number>(null);
	const [detailData, setDetailData] = useState<CategoriesItemProps>(null);
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
		Categories,
		createCategories,
		updateCategories,
		toggleCategories,
		deleteCategories,
		categories_loading,
		categories_error,
	} = useCategories();

	// Module object data & options
	const moduleObject: moduleObjectProps = {
		model: 'Categories',
		route: ROUTES.app.categories,
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
		setDetailData(getDetailData(id, 'Categories', Categories));

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
	const detailSubmitHandler = (data: CategoriesItemProps) => {
		const master: CategoriesItemProps = _.cloneDeep(data);

		console.log('AJAX ... create/save ...', master);

		if (master.id == 'new') {
			createCategories(master).then((response) => {
				console.log('create response', response);

				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemCreated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
			});
		} else {
			updateCategories(master).then((response) => {
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
	const itemDeleteHandler = (ids: (number | string)[]) => {
		const master: (number | string)[] = [...ids];

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
		const master: (number | string)[] = [...ids];

		console.log('AJAX ... toggle ...', master);

		toggleCategories(master).then((response) => {
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
			const master: (number | string)[] = [...confirmDialogData];

			console.log('AJAX ... delete ...', master);

			deleteCategories(master).then((response) => {
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

	useEffect(() => {
		if (Categories) {
			if (params.id) {
				setDetail(params.id);
				openDetailHandler(params.id);
			} else {
				setDetailData(null);
			}
		}
	}, [params.id, Categories]);

	return (
		<>
			{Categories ? (
				<>
					{detail && detailData ? (
						<CategoriesDetailForm
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
							tableData={Categories}
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
				<Preloader.Page />
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

export default CategoriesModule;
