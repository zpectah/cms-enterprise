import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';

import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { Typography } from '../../components/ui';
import DataTable from '../../components/DataTable';
import PostsDetailForm from './PostsDetailForm';

const mockData = [
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

const blankDetailData = {
	id: 'new',
	name: '',
	active: true,
};

interface PostsModuleProps {}

const PostsModule = ({}: PostsModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const [detail, setDetail] = useState<string>(null);
	const [detailData, setDetailData] = useState<any>(null);
	const [selectedItems, setSelectedItems] = useState<string[] | number[]>([]);

	const moduleObject: any = {
		model: 'Posts',
		route: ROUTES.app.posts,
		detail: {},
		table: {},
	};

	const getDetail = (id: number | string) => {
		let item;

		if (detail == 'new') {
			item = blankDetailData;
		} else {
			item = mockData.find((item) => item.id == id);
		}

		return item;
	};

	const openDetailHandler = (id: string, redirect?: boolean) => {
		console.log('openDetailHandler', {});

		setDetail(id);
		setDetailData(getDetail(id));

		if (redirect)
			history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/${id}`);
	};
	const closeDetailHandler = () => {
		console.log('closeDetailHandler', {});

		setDetail(null);
		setDetailData(null);

		history.push(moduleObject.route.path);
	};
	const itemSelectHandler = (selected: string[] | number[]) =>
		setSelectedItems(selected);
	const detailSubmitHandler = (data: any) => {
		console.log('detailSubmitHandler', {});

		const master = _.cloneDeep(data);

		console.log('detailSubmitHandler master', master);
	};
	const detailToggleHandler = () => {
		console.log('detailToggleHandler', {});
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
			<div>
				{detail && detailData ? (
					<div>
						<div>
							<Typography.Link to={ROUTES.app.posts.path}>
								Link to list
							</Typography.Link>
							<Typography.Link
								to={ROUTES.app.posts.path + ROUTE_SUFFIX.detail + '/new'}
							>
								Link to new
							</Typography.Link>
						</div>
						<div>
							<PostsDetailForm
								detailData={detailData}
								onSubmit={(data) => {
									console.log('submitted data ', data);
								}}
								onSubmitError={(error) => {
									console.log('submitted error ', error);
								}}
							/>
						</div>
					</div>
				) : (
					<div>
						<div>
							<Typography.Link
								to={ROUTES.app.posts.path + ROUTE_SUFFIX.detail + '/5'}
							>
								Link to detail (5)
							</Typography.Link>
							<Typography.Link
								to={ROUTES.app.posts.path + ROUTE_SUFFIX.detail + '/new'}
							>
								Link to new
							</Typography.Link>
						</div>
						<div>
							<DataTable />
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default PostsModule;
