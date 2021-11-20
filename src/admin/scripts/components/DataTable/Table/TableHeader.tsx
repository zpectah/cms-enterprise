import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';

import { DATA_TABLE } from '../../../constants';
import { cellsTypesProps, sortType, tableHeaderCellItemProps } from '../types';

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
	const { t } = useTranslation(['common', 'components']);

	const getHeadCells = () => {
		const cells = [] as tableHeaderCellItemProps[];

		if (tableCells.name)
			cells.push({
				id: 'name',
				numeric: false,
				disablePadding: true,
				label: 'Name',
				align: tableCells.name[0],
				width: tableCells.name[1],
			});

		if (tableCells.active)
			cells.push({
				id: 'active',
				numeric: true,
				disablePadding: true,
				label: 'Active',
				align: tableCells.active[0],
				width: tableCells.name[1],
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
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell>
				{getHeadCells().map((cell) => (
					<TableCell
						key={cell.id}
						align={cell.align}
						padding={cell.disablePadding ? 'none' : 'normal'}
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
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell
					key={'actions'}
					align={'right'}
					padding={'normal'}
					style={{ width: '125px' }}
				>
					<span>Actions</span>
				</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default TableHeader;
