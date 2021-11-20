import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import { default as MuiTable } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';

import { DATA_TABLE } from '../../../constants';
import { getComparator, stableSort } from '../utils';
import { cellsTypesProps, sortType, tableBodyCellItemProps } from '../types';
import { Typography } from '../../ui';
import TableHeader from './TableHeader';
import { getElTestAttr } from '../../../utils/tests';

const StyledRowLink = styled(Typography.Title)`
	cursor: pointer;
`;

export interface TableProps {
	tableData: any[];
	tableCells: cellsTypesProps;
	rowPathPrefix: string;
	selectedRows: any[];
	onSelect: (selected: any[]) => void;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	dataAppId?: string;
}

const Table = ({
	tableData,
	tableCells,
	rowPathPrefix,
	selectedRows,
	onSelect,
	onToggle,
	onDelete,
	dataAppId,
}: TableProps) => {
	const history = useHistory();
	const [order, setOrder] = useState<sortType>('desc');
	const [orderBy, setOrderBy] = useState<keyof any>('id'); // TODO
	const [selected, setSelected] = useState<any[]>(selectedRows);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(DATA_TABLE.rowsDefault);

	const tableRowHeight = DATA_TABLE.rowHeightDefault;

	const sortRequestHandler = (
		event: React.MouseEvent<unknown>,
		property: keyof any, // TODO
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const selectAllHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const ns = tableData.map((n) => n.id);
			setSelected(ns);
			return;
		}
		setSelected([]);
	};

	const rowSelectHandler = (event: React.MouseEvent<unknown>, id: string) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: any[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const changePageHandler = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const changeRowsPerPageHandler = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isRowSelected = (id: number | string) => selected.indexOf(id) !== -1;

	const clickDetailHandler = (id: number) => {
		history.push(`${rowPathPrefix}/${id}`);
	};

	const onRowToggleHandler = (id: number) => onToggle(id);

	const onRowDeleteHandler = (id: number) => onDelete(id);

	const getBodyCells = (row: any) => {
		const cells = [] as tableBodyCellItemProps[];

		if (tableCells.name)
			cells.push({
				key: 'name',
				align: tableCells.name[0],
				content: (
					<StyledRowLink h6 onClick={() => clickDetailHandler(row.id)}>
						{row.name}
					</StyledRowLink>
				),
				scope: 'row',
				element: 'th',
				padding: 'none',
				width: tableCells.name[1],
			});

		if (tableCells.active)
			cells.push({
				key: 'active',
				align: tableCells.active[0],
				content: (
					<Switch
						inputProps={{ 'aria-label': 'Item active' }}
						size="small"
						checked={row.active}
						onClick={() => onRowToggleHandler(row.id)}
					/>
				),
				padding: 'none',
				width: tableCells.active[1],
			});

		return cells;
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

	useEffect(() => onSelect(selected), [selected]);

	return (
		<Box sx={{ width: '100%' }} {...getElTestAttr(dataAppId)}>
			<TableContainer>
				<MuiTable
					sx={{ minWidth: 750 }}
					aria-labelledby="tableTitle"
					size={'medium'}
				>
					<TableHeader
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={selectAllHandler}
						onRequestSort={sortRequestHandler}
						rowCount={tableData.length}
						tableCells={tableCells}
					/>
					<TableBody>
						{stableSort(tableData, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								const isItemSelected = isRowSelected(row.id);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										onDoubleClick={(event) => rowSelectHandler(event, row.id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												checked={isItemSelected}
												onClick={(event) => rowSelectHandler(event, row.id)}
												inputProps={{
													'aria-labelledby': labelId,
												}}
											/>
										</TableCell>
										{getBodyCells(row).map((cell) => (
											<TableCell
												key={cell.key}
												component={cell.element ? cell.element : 'td'}
												id={cell.key}
												scope={cell.scope && cell.scope}
												padding={cell.padding ? cell.padding : 'normal'}
												children={cell.content}
												align={cell.align}
												width={cell.width}
											/>
										))}
										<TableCell align="right" style={{ width: '125px' }}>
											<Stack
												direction="row"
												spacing={2}
												justifyContent="flex-end"
											>
												<IconButton
													aria-label="Delete"
													color="secondary"
													onClick={() => onRowDeleteHandler(row.id)}
													size="small"
												>
													<DeleteOutlineIcon />
												</IconButton>
											</Stack>
										</TableCell>
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: tableRowHeight * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</MuiTable>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={DATA_TABLE.rowsPerPage}
				component="div"
				count={tableData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={changePageHandler}
				onRowsPerPageChange={changeRowsPerPageHandler}
			/>
		</Box>
	);
};

export default Table;
