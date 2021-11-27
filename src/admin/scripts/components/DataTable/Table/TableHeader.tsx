import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';

import { DATA_TABLE } from '../../../constants';
import palette from '../../../styles/palette';
import {
	cellsTypesProps,
	sortType,
	tableHeaderCellItemProps,
} from '../../../types/table';
import { Input } from '../../ui';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: palette._lightDark,
	},
}));

interface TableHeaderProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof any,
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: sortType;
	orderBy: any; // TODO
	rowCount: number;
	tableCells: cellsTypesProps;
}

const TableHeader = ({
	onSelectAllClick,
	order,
	orderBy,
	numSelected,
	rowCount,
	onRequestSort,
	tableCells,
}: TableHeaderProps) => {
	const { t } = useTranslation(['common', 'components', 'table']);

	const getHeadCells = () => {
		// !!! Keep same order as getBodyCells(row) in Table/index.ts !!!
		const cellTypes: string[] = ['name', 'email', 'type', 'active']; // TODO: new cells
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
		(property: keyof any) => (event: React.MouseEvent<unknown>) => {
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
							onClick={createSortHandler(cell.id)}
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
