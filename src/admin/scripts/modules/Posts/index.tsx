import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { moduleObjectProps, PostsItemProps } from '../../types/app';
import { ConfirmDialog } from '../../components/ui';
import DataTable from '../../components/DataTable';
import PostsDetailForm from './PostsDetailForm';

const mockData: PostsItemProps[] = [
	{
		id: 1,
		name: 'item 1 name',
		active: true,
	},
	{
		id: 2,
		name: 'item 2 name',
		active: false,
	},
	{
		id: 3,
		name: 'item 3 name',
		active: true,
	},
	{
		id: 4,
		name: 'item 4 name',
		active: true,
	},
	{
		id: 5,
		name: 'item 5 name',
		active: true,
	},
];

const blankDetailData: PostsItemProps = {
	id: 'new',
	name: '',
	active: true,
};

interface PostsModuleProps {}

const PostsModule = ({}: PostsModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
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

	// Module object data & options
	const moduleObject: moduleObjectProps = {
		model: 'Posts',
		route: ROUTES.app.posts,
		detail: {},
		table: {
			layout: {},
		},
	};

	// Returns detail object by id
	const getDetail = (id: number | string) => {
		let item;

		if (detail == 'new') {
			item = blankDetailData;
		} else {
			item = mockData.find((item) => item.id == id);
		}

		return item;
	};

	// Trigger open detail with current id and set data
	const openDetailHandler = (id: string, redirect?: boolean) => {
		setDetail(id);
		setDetailData(getDetail(id));

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
	};

	// When error returns from submit
	const detailSubmitErrorHandler = (error: any, e: any) => {
		console.log('detailSubmitErrorHandler', error);
	};

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
	};

	// When item/row is confirmed to submit confirm dialog
	const dialogConfirmHandler = () => {
		if (confirmDialogType == 'delete') {
			// proceed delete
			// close and redirect back as callback

			const master = [...confirmDialogData];

			console.log('AJAX ... delete ...', master);

			closeConfirmHandler();
			if (confirmDialogData.length == 1) history.push(moduleObject.route.path);
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
				<PostsDetailForm
					detailData={detailData}
					detailOptions={moduleObject.detail}
					onSubmit={detailSubmitHandler}
					onSubmitError={detailSubmitErrorHandler}
					onCancel={detailCancelHandler}
					onDelete={detailDeleteHandler}
				/>
			) : (
				<>
					{mockData ? (
						<DataTable
							model={moduleObject.model}
							routeObject={ROUTES.app.posts}
							tableData={mockData}
							tableOptions={moduleObject.table}
							onToggle={itemToggleHandler}
							onDelete={itemDeleteHandler}
							onSelect={itemSelectHandler}
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
			>
				<>
					Confirm data by type ... {JSON.stringify(confirmDialogType)}...{' '}
					{JSON.stringify(confirmDialogData)}
				</>
			</ConfirmDialog>
		</>
	);
};

export default PostsModule;
