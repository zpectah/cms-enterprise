import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { ROUTES, ROUTE_SUFFIX, TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { moduleObjectProps } from '../../types/app';
import { UsersItemProps } from '../../types/model';
import {
	selectedArrayProps,
	selectedItemsProps,
	confirmDialogTypeProps,
} from '../../types/table';
import { useUsers } from '../../hooks/model';
import getDetailData from '../../utils/getDetailData';
import { useSettings, useProfile } from '../../hooks/common';
import { ConfirmDialog, Preloader } from '../../components/ui';
import DataTable from '../../components/DataTable';
import UsersDetailForm from './UsersDetailForm';
import { useToasts } from '../../hooks/common';
import { string } from '../../../../../utils/utils';

interface UsersModuleProps {}

const UsersModule = ({}: UsersModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'messages']);
	const [detail, setDetail] = useState<string | number>(null);
	const [detailData, setDetailData] = useState<UsersItemProps>(null);
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
		Users,
		createUsers,
		updateUsers,
		toggleUsers,
		deleteUsers,
		reloadUsers,
		users_loading,
		users_error,
	} = useUsers();
	const moduleObject: moduleObjectProps = {
		model: 'Users',
		route: ROUTES.app.users,
		detail: {},
		table: {
			tableCells: {
				email: ['left', 'auto'],
				type: ['left', '150px'],
				active: ['right', '125px'],
			},
			tableSearchProps: [
				'email',
				'nick_name',
				'first_name',
				'middle_name',
				'last_name',
			],
		},
	};
	const createNewCallback = () =>
		history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/new`);
	const openDetailHandler = (id: string, redirect?: boolean) => {
		setDetail(id);
		setDetailData(getDetailData(id, 'Users', Users));
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
	const detailSubmitHandler = (data: UsersItemProps) => {
		const master: UsersItemProps = _.cloneDeep(data);
		setProcessing(true);
		if (master.id == 'new') {
			createUsers(master).then((response) => {
				reloadUsers();
				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemCreated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				setProcessing(false);
			});
		} else {
			updateUsers(master).then((response) => {
				reloadUsers();
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
		const master: (number | string)[] = [...ids];
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
		toggleUsers(master).then((response) => {
			reloadUsers();
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
			deleteUsers(master).then((response) => {
				reloadUsers();
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
		if (Users) toggleDetail();
	}, [params.id, Users]);

	return (
		<>
			{Users ? (
				<>
					{detail && detailData ? (
						<UsersDetailForm
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
							allItems={Users}
							userLevel={Profile?.user_level}
						/>
					) : (
						<DataTable
							model={moduleObject.model}
							routeObject={moduleObject.route}
							tableData={Users}
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
						/>
					)}
				</>
			) : (
				<Preloader.Block />
			)}
			<Preloader.Bar isProcessing={isProcessing || users_loading} />
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

export default UsersModule;
