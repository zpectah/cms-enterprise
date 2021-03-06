import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import styled from 'styled-components';

import {
	cellsTypesProps,
	sortType,
	tableHeaderCellItemProps,
} from '../../../types/table';
import { oneOfModelItemProps } from '../../../types/model';
import { Input } from '../../ui';

const StyledTableCell = styled(TableCell)`
	&.${tableCellClasses.head} {
		background-color: ${(props) => props.theme.dataTable.heading.bg};
	}
`;

interface TableHeaderProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof oneOfModelItemProps,
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: sortType;
	orderBy: keyof oneOfModelItemProps;
	rowCount: number;
	tableCells: cellsTypesProps;
	cellTypes: string[];
}

const TableHeader = ({
	onSelectAllClick,
	order,
	orderBy,
	numSelected,
	rowCount,
	onRequestSort,
	tableCells,
	cellTypes,
}: TableHeaderProps) => {
	const { t } = useTranslation(['common', 'components', 'table']);
	const getHeadCells = () => {
		const cells = [] as tableHeaderCellItemProps[];
		cellTypes.map((type) => {
			if (tableCells[type])
				cells.push({
					id: type,
					label: t(`table:label.${type}`),
					align: tableCells[type][0],
					width: tableCells[type][1],
				});
		});

		return cells;
	};
	const createSortHandler =
		(property: keyof oneOfModelItemProps) =>
		(event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				<StyledTableCell padding="checkbox">
					<Input.Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all items',
						}}
						dataTestId={`table.header.checkbox.selectAll`}
					/>
				</StyledTableCell>
				{getHeadCells().map((cell) => (
					<StyledTableCell
						key={cell.id}
						align={cell.align}
						padding={'none'}
						sortDirection={orderBy === cell.id ? order : false}
						width={cell.width}
					>
						<TableSortLabel
							active={orderBy === cell.id}
							direction={orderBy === cell.id ? order : 'asc'}
							onClick={createSortHandler(cell.id as 'id')}
						>
							{cell.label}
							{orderBy === cell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'Descending' : 'Ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</StyledTableCell>
				))}
				<StyledTableCell
					key="actions"
					align="right"
					padding="normal"
					style={{ width: '125px' }}
				>
					<span>{t('table:label.actions')}</span>
				</StyledTableCell>
			</TableRow>
		</TableHead>
	);
};

export default TableHeader;
