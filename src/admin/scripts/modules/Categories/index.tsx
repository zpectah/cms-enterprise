import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { Typography } from '../../components/ui';

interface CategoriesModuleProps {}

const CategoriesModule = ({}: CategoriesModuleProps) => {
	const params: any = useParams();
	const [detail, setDetail] = useState<string>(null);

	useEffect(() => setDetail(params.id), [params.id]);

	return (
		<>
			<div>...CategoriesModule...</div>

			<div>
				{detail ? (
					<div>
						<div>
							<Typography.Link to={ROUTES.app.categories.path}>
								Link to list
							</Typography.Link>
						</div>
						<div>is detail</div>
					</div>
				) : (
					<div>
						<div>
							<Typography.Link
								to={ROUTES.app.categories.path + ROUTE_SUFFIX.detail + '/5'}
							>
								Link to detail (5)
							</Typography.Link>
						</div>
						<div>is list</div>
					</div>
				)}
			</div>
		</>
	);
};

export default CategoriesModule;
