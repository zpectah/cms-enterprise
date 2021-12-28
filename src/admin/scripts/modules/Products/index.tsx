import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { ROUTES, ROUTE_SUFFIX, TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { moduleObjectProps } from '../../types/app';
import {
	ProductsItemProps,
	ProductsItemLangProps,
	PostsItemLangProps,
} from '../../types/model';
import {
	selectedArrayProps,
	selectedItemsProps,
	confirmDialogTypeProps,
} from '../../types/table';
import { useProducts } from '../../hooks/model';
import getDetailData from '../../utils/getDetailData';
import { useSettings } from '../../hooks/common';
import { ConfirmDialog, Preloader } from '../../components/ui';
import DataTable from '../../components/DataTable';
import ProductsDetailForm from './ProductsDetailForm';
import { useToasts } from '../../hooks/common';
import { getLanguagesFields } from '../../utils/detail';
import { string } from '../../../../../utils/utils';

interface ProductsModuleProps {}

const ProductsModule = ({}: ProductsModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'messages']);
	const [detail, setDetail] = useState<string | number>(null);
	const [detailData, setDetailData] = useState<ProductsItemProps>(null);
	const [selectedItems, setSelectedItems] = useState<selectedItemsProps>([]);
	const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
	const [confirmDialogType, setConfirmDialogType] =
		useState<confirmDialogTypeProps>(null);
	const [confirmDialogData, setConfirmDialogData] =
		useState<selectedArrayProps>([]);
	const [isProcessing, setProcessing] = useState<boolean>(false);
	const { createToasts, createErrorToast } = useToasts(dispatch);
	const { Settings } = useSettings();
	const {
		Products,
		createProducts,
		updateProducts,
		toggleProducts,
		deleteProducts,
		reloadProducts,
		products_loading,
		products_error,
	} = useProducts();
	const moduleObject: moduleObjectProps = {
		model: 'Products',
		route: ROUTES.market.products,
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
	const createNewCallback = () =>
		history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/new`);
	const openDetailHandler = (id: string, redirect?: boolean) => {
		const detail = getDetailData(id, 'Products', Products);
		if (id == 'new')
			detail['lang'] = getLanguagesFields(Settings?.language_active, {
				title: '',
				description: '',
				content: '',
			} as ProductsItemLangProps);
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
	const detailSubmitHandler = (data: ProductsItemProps) => {
		const master: ProductsItemProps = _.cloneDeep(data);
		setProcessing(true);
		// reformat data before save
		master.name = master.name.split(' ').join('-');
		if (master.id == 'new') {
			createProducts(master).then((response) => {
				reloadProducts();
				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemCreated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				setProcessing(false);
			});
		} else {
			updateProducts(master).then((response) => {
				reloadProducts();
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
		toggleProducts(master).then((response) => {
			reloadProducts();
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
			deleteProducts(master).then((response) => {
				reloadProducts();
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
	const createFromTemplateHandler = (id: number | string) => {
		const detail = getDetailData('new', 'Products', Products);
		const templateDetail = getDetailData(id, 'Products', Products);
		detail['lang'] = getLanguagesFields(Settings?.language_active, {
			title: '',
			description: '',
		} as PostsItemLangProps);
		const newDetailData = {
			...detail,
			type: templateDetail.type,
			name: `copy-${templateDetail.name}`,
			categories: templateDetail.categories,
			tags: templateDetail.tags,
			item_price: templateDetail.item_price,
			item_discount: templateDetail.item_discount,
			item_weight: templateDetail.item_weight,
			item_depth: templateDetail.item_depth,
			item_height: templateDetail.item_height,
			item_width: templateDetail.item_width,
			producers: templateDetail.producers,
			distributors: templateDetail.distributors,
			options: templateDetail.options,
			manager: templateDetail.manager,
			attachments: templateDetail.attachments,
			lang: {
				...templateDetail.lang,
			},
		};
		setDetail('new');
		setDetailData(newDetailData);
		history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/new`);
		setTimeout(() => setDetailData(newDetailData), 125); // Fix data ...
	};

	useEffect(() => {
		if (Products) toggleDetail();
	}, [params.id, Products]);

	return (
		<>
			{Products ? (
				<>
					{detail && detailData ? (
						<ProductsDetailForm
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
							allItems={Products}
						/>
					) : (
						<DataTable
							model={moduleObject.model}
							routeObject={moduleObject.route}
							tableData={Products}
							tableCells={moduleObject.table.tableCells}
							tableSearchProps={moduleObject.table.tableSearchProps}
							selectedItems={selectedItems}
							onToggle={itemToggleHandler}
							onDelete={itemDeleteHandler}
							onSelect={itemSelectHandler}
							languageList={Settings?.language_active}
							languageDefault={Settings?.language_default}
							onCreateCallback={createNewCallback}
							customActionTriggers={[
								{
									key: 'post_create_from_template',
									label: t('button.duplicate'),
									callback: createFromTemplateHandler,
									disabled: false,
								},
							]}
						/>
					)}
				</>
			) : (
				<Preloader.Block />
			)}
			<Preloader.Bar isProcessing={isProcessing || products_loading} />
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

export default ProductsModule;
