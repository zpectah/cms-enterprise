import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTE_SUFFIX } from '../../constants';
import { routeItemProps } from '../../types/pages';
import { appModelProps } from '../../types/app';
import { Section, Button, ButtonCreate, Typography } from '../ui';
import ModuleViewHeading from '../ModuleViewHeading';
import ContentTitle from '../../components/Layout/Content/ContentTitle';

interface DataTableProps {
	model: appModelProps;
	routeObject: routeItemProps;
	tableOptions: {};
}

const DataTable = ({ model, routeObject, tableOptions }: DataTableProps) => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<>
			<ContentTitle
				title={t(`page:${model}.page.title`)}
				listPath={routeObject.path}
			/>
			<ModuleViewHeading
				secondaryChildren={<div>data table options ...</div>}
				tertiaryChildren={
					<ButtonCreate pathPrefix={routeObject.path}>
						{t(`buttonNew.${model}`)}
					</ButtonCreate>
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
