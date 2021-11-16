import React from 'react';

import { ROUTE_SUFFIX } from '../../constants';
import { routeItemProps } from '../../types/pages';
import { Section, Button, ButtonCreate, Typography } from '../ui';
import ModuleViewHeading from '../ModuleViewHeading';

interface DataTableProps {
	routeObject: routeItemProps;
}

const DataTable = ({ routeObject }: DataTableProps) => {
	return (
		<>
			<ModuleViewHeading
				secondaryChildren={<div>data table options ...</div>}
				tertiaryChildren={
					<ButtonCreate pathPrefix={routeObject.path}>Create new</ButtonCreate>
				}
			>
				<div>searchbar ...</div>
			</ModuleViewHeading>
			<Section>
				data table list
				<br />
				<br />
				<Typography.Link to={routeObject.path + ROUTE_SUFFIX.detail + '/5'}>
					Link to detail (5)
				</Typography.Link>
			</Section>
		</>
	);
};

export default DataTable;
