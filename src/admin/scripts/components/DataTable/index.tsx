import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';

import { ROUTE_SUFFIX } from '../../constants';
import { routeItemProps } from '../../types/pages';
import { appModelProps } from '../../types/app';
import { Section, Button, Typography } from '../ui';
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
	const history = useHistory();
	const { t } = useTranslation(['common', 'page']);

	const buttonCreateHandler = () =>
		history.push(`${routeObject.path}${ROUTE_SUFFIX.detail}/new`);

	return (
		<>
			<ContentTitle
				title={t(`page:${model}.page.title`)}
				listPath={routeObject.path}
			/>
			<ModuleViewHeading
				secondaryChildren={<div>data table options ...</div>}
				tertiaryChildren={
					<Button
						variant="contained"
						color="success"
						onClick={buttonCreateHandler}
						startIcon={<AddIcon />}
						dataAppId={`button.create.new.${model}`}
					>
						{t(`buttonNew.${model}`)}
					</Button>
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
