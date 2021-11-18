import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { ROUTES, ROUTE_SUFFIX, TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { moduleObjectProps } from '../../types/app';
import { ProducersItemProps } from '../../types/model';
import { useProducers } from '../../hooks/market';
import getDetailData from '../../utils/getDetailData';
import { useSettings } from '../../hooks/common';
import { ConfirmDialog } from '../../components/ui';
import DataTable from '../../components/DataTable';
import ProducersDetailForm from './ProducersDetailForm';
import { useToasts } from '../../hooks/common';

interface ProducersModuleProps {}

const ProducersModule = ({}: ProducersModuleProps) => {
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
		Producers,
		createProducers,
		updateProducers,
		toggleProducers,
		deleteProducers,
	} = useProducers();

	// Module object data & options
	const moduleObject: moduleObjectProps = {
		model: 'Producers',
		route: ROUTES.market.producers,
		detail: {},
		table: {
			layout: {},
		},
	};

	// Trigger open detail with current id and set data
	const openDetailHandler = (id: string, redirect?: boolean) => {
		setDetail(id);
		setDetailData(getDetailData(id, 'Producers', Producers));

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
			updateProducers(master).then((response) => {
				console.log('update response', response);

				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemCreated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
			});
		} else {
			createProducers(master).then((response) => {
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
		const master = [...ids, ...selectedItems];

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
		const master = [...ids, ...selectedItems];

		console.log('AJAX ... toggle ...', master);

		toggleProducers(master).then((response) => {
			console.log('toggle response', response);

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

			deleteProducers(master).then((response) => {
				console.log('delete response', response);

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
				<ProducersDetailForm
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
					{Producers ? (
						<DataTable
							model={moduleObject.model}
							routeObject={moduleObject.route}
							tableData={Producers}
							tableOptions={moduleObject.table}
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

export default ProducersModule;
