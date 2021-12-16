import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { string } from '../../../../../utils/utils';
import { ROUTES, ROUTE_SUFFIX, TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { moduleObjectProps } from '../../types/app';
import { OrdersItemProps } from '../../types/model';
import {
	selectedArrayProps,
	selectedItemsProps,
	confirmDialogTypeProps,
} from '../../types/table';
import { useOrders } from '../../hooks/model';
import getDetailData from '../../utils/getDetailData';
import { useSettings } from '../../hooks/common';
import { ConfirmDialog, Preloader } from '../../components/ui';
import DataTable from '../../components/DataTable';
import OrdersDetailForm from './OrdersDetailForm';
import { useToasts } from '../../hooks/common';

interface OrdersModuleProps {}

const OrdersModule = ({}: OrdersModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'messages']);
	const [detail, setDetail] = useState<string | number>(null);
	const [detailData, setDetailData] = useState<OrdersItemProps>(null);
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
		Orders,
		createOrders,
		updateOrders,
		toggleOrders,
		deleteOrders,
		confirmOrders,
		cancelOrders,
		reloadOrders,
		orders_loading,
		orders_error,
	} = useOrders();
	const moduleObject: moduleObjectProps = {
		model: 'Orders',
		route: ROUTES.market.orders,
		detail: {},
		table: {
			tableCells: {
				name: ['left', 'auto'],
				type: ['left', '150px'],
				order_status: ['center', '125px'],
			},
			tableSearchProps: [
				'name',
				'email',
				'phone',
				'customer_name',
				'country',
				'city',
				'address',
			],
		},
	};
	const createNewCallback = () =>
		history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/new`);
	const openDetailHandler = (id: string, redirect?: boolean) => {
		setDetail(id);
		setDetailData(getDetailData(id, 'Orders', Orders));
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
	const detailSubmitHandler = (data: OrdersItemProps) => {
		const master: OrdersItemProps = _.cloneDeep(data);
		setProcessing(true);
		if (master.id == 'new') {
			master.name =
				new Date().valueOf() + `-${string.getRandom(5, 'uppercase')}`;
			createOrders(master).then((response) => {
				reloadOrders();
				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemCreated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				setProcessing(false);
			});
		} else {
			if (master.status !== 1) {
				master.items = detailData.items;
				master.price_total = detailData.price_total;
			}
			updateOrders(master).then((response) => {
				reloadOrders();
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
		toggleOrders(master).then((response) => {
			reloadOrders();
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
			deleteOrders(master).then((response) => {
				reloadOrders();
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
	const confirmOrderHandler = (id: number | string) => {
		const master: selectedArrayProps = [id];
		setProcessing(true);
		confirmOrders(master).then((response) => {
			reloadOrders();
			setSelectedItems([]);
			createToasts({
				title: t('messages:success.itemUpdated', { count: master.length }),
				context: 'success',
				timeout: TOASTS_TIMEOUT_DEFAULT,
			});
			setProcessing(false);
		});
	};
	const cancelOrderHandler = (id: number | string) => {
		const master: selectedArrayProps = [id];
		setProcessing(true);
		cancelOrders(master).then((response) => {
			reloadOrders();
			setSelectedItems([]);
			createToasts({
				title: t('messages:success.itemUpdated', { count: master.length }),
				context: 'success',
				timeout: TOASTS_TIMEOUT_DEFAULT,
			});
			setProcessing(false);
		});
	};

	useEffect(() => {
		if (Orders) toggleDetail();
	}, [params.id, Orders]);

	return (
		<>
			{Orders ? (
				<>
					{detail && detailData ? (
						<OrdersDetailForm
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
						/>
					) : (
						<DataTable
							model={moduleObject.model}
							routeObject={moduleObject.route}
							tableData={Orders}
							tableCells={moduleObject.table.tableCells}
							tableSearchProps={moduleObject.table.tableSearchProps}
							selectedItems={selectedItems}
							onToggle={itemToggleHandler}
							onDelete={itemDeleteHandler}
							onSelect={itemSelectHandler}
							languageList={Settings?.language_active}
							languageDefault={Settings?.language_default}
							onCreateCallback={createNewCallback}
							withoutLanguageToggle
							customActionTriggers={[
								{
									key: 'order_confirm',
									label: t('button.confirmOrder'),
									callback: confirmOrderHandler,
									disabled: false,
								},
								{
									key: 'order_cancel',
									label: t('button.cancelOrder'),
									callback: cancelOrderHandler,
									disabled: false,
								},
							]}
						/>
					)}
				</>
			) : (
				<Preloader.Block />
			)}
			<Preloader.Bar isProcessing={isProcessing || orders_loading} />
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

export default OrdersModule;
