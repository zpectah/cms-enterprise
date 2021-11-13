import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
	const [detail, setDetail] = useState<string>(null);
	const [detailData, setDetailData] = useState<any>(null);

	useEffect(() => setDetail(params.id), [params.id]);

	useEffect(() => {
		if (detail) {
			if (detail == 'new') {
				setDetailData(blankDetailData);
			} else {
				let item = mockData.find((item) => item.id == params.id);

				if (item) setDetailData(item);
			}
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
