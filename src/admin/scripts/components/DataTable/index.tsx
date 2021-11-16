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
	tableData: any[];
	tableOptions: {};
	onToggle: (id: (number | string)[]) => void;
	onDelete: (id: (number | string)[]) => void;
	onSelect: (selected: readonly string[]) => void;
}

const DataTable = ({
	model,
	routeObject,
	tableData,
	tableOptions,
	onToggle,
	onDelete,
	onSelect,
}: DataTableProps) => {
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
				{tableData.map((item) => (
					<Typography.Link
						key={item.id}
						to={routeObject.path + ROUTE_SUFFIX.detail + '/' + item.id}
					>
						Link to detail: {item.name}
					</Typography.Link>
				))}
				<br />
				<br />
			</Section>
		</>
	);
};

export default DataTable;
