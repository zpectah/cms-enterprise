import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { moduleObjectProps } from '../../types/modules';
import { postsItemProps } from './types';
import DataTable from '../../components/DataTable';
import PostsDetailForm from './PostsDetailForm';

const mockData: postsItemProps[] = [
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

const blankDetailData: postsItemProps = {
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
	const [selectedItems, setSelectedItems] = useState<string[] | number[]>([]);

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
		console.log('openDetailHandler', {});

		setDetail(id);
		setDetailData(getDetail(id));

		if (redirect)
			history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/${id}`);
	};

	// Trigger closes detail and show table
	const closeDetailHandler = () => {
		console.log('closeDetailHandler', {});

		setDetail(null);
		setDetailData(null);

		history.push(moduleObject.route.path);
	};

	// When item/row is selected in DataTable
	const itemSelectHandler = (selected: string[] | number[]) =>
		setSelectedItems(selected);

	// When detail is submitted (create/update)
	const detailSubmitHandler = (data: any, e: any) => {
		console.log('detailSubmitHandler', {});

		const master = _.cloneDeep(data);

		console.log('detailSubmitHandler master', master);
	};

	// When error returns from submit
	const detailSubmitErrorHandler = (error: any, e: any) => {
		console.log('detailSubmitErrorHandler', error);
	};

	// When item/row is active/disable toggled
	const itemToggleHandler = (ids: string[]) => {
		console.log('itemToggleHandler', []);
	};

	// When item/row opens confirm dialog
	const itemDeleteHandler = (ids: string[]) => {
		console.log('itemDeleteHandler', []);
	};

	// When item/row is confirmed to delete
	const itemDeleteConfirmHandler = (ids: string[]) => {
		console.log('itemDeleteConfirmHandler', []);
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
					onSubmit={detailSubmitHandler}
					onSubmitError={detailSubmitErrorHandler}
					detailOptions={moduleObject.detail}
				/>
			) : (
				<DataTable
					model={moduleObject.model}
					routeObject={ROUTES.app.posts}
					tableOptions={moduleObject.table}
				/>
			)}
		</>
	);
};

export default PostsModule;
