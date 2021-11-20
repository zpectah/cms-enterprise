import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
	display: inline-flex;
	cursor: pointer;
	border-bottom: 1px solid transparent;

	&:hover {
		border-bottom-color: ${(props) => props.theme.ui.borderBase};
	}
`;

export interface TableProps {
	tableData: any[];
	tableCells: cellsTypesProps;
	rowPathPrefix: string;
	selectedRows: readonly (number | string)[];
	onSelect: (selected: readonly (number | string)[]) => void;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	dataAppId?: string;
	minWidth?: number;
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
	minWidth = 750,
}: TableProps) => {
	const history = useHistory();
	const { t } = useTranslation(['common', 'components', 'types']);
	const [order, setOrder] = useState<sortType>('desc');
	const [orderBy, setOrderBy] = useState<keyof any>('id'); // TODO
	const [selected, setSelected] =
		useState<readonly (number | string)[]>(selectedRows);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(DATA_TABLE.rowsDefault);

	const tableRowHeight = DATA_TABLE.rowHeightDefault;
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

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

	const clickDetailHandler = (id: number | string) => {
		history.push(`${rowPathPrefix}/${id}`);
	};

	const onRowToggleHandler = (id: number) => onToggle(id);

	const onRowDeleteHandler = (id: number) => onDelete(id);

	const getBodyCells = (row: any) => {
		const cells = [] as tableBodyCellItemProps[];

		if (tableCells.name)
			cells.push({
				key: 'name',
				padding: 'none',
				scope: 'row',
				element: 'th',
				align: tableCells.name[0],
				width: tableCells.name[1],
				content: (
					<StyledRowLink
						h6
						onClick={() => clickDetailHandler(row.id)}
						dataAppId={`${dataAppId}.cell.name.link.${row.id}`}
					>
						{row.name}
					</StyledRowLink>
				),
			});

		// --

		if (tableCells.type)
			cells.push({
				key: 'type',
				padding: 'none',
				align: tableCells.type[0],
				width: tableCells.type[1],
				content: <div>{t(`types:${row.type}`)}</div>,
			});

		// --

		if (tableCells.active)
			cells.push({
				key: 'active',
				padding: 'none',
				align: tableCells.active[0],
				width: tableCells.active[1],
				content: (
					<Switch
						inputProps={{ 'aria-label': 'Item toggle' }}
						size="small"
						checked={row.active}
						onClick={() => onRowToggleHandler(row.id)}
						{...getElTestAttr(`${dataAppId}.cell.active.switch.${row.id}`)}
					/>
				),
			});

		// TODO: new cells

		return cells;
	};

	const getCellsInRow = useCallback(() => {
		const cells = [] as string[];

		if (tableCells.name) cells.push('name');
		if (tableCells.active) cells.push('active');
		// TODO: new cells

		return cells;
	}, [tableCells]);

	useEffect(() => onSelect(selected), [selected]);

	useEffect(() => setSelected(selectedRows), [selectedRows]);

	return (
		<Box sx={{ width: '100%' }} {...getElTestAttr(dataAppId)}>
			<TableContainer>
				<MuiTable
					sx={{ minWidth: minWidth }}
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
												{...getElTestAttr(
													`${dataAppId}.cell.checkbox.${row.id}`,
												)}
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
													{...getElTestAttr(
														`${dataAppId}.cell.delete.button.${row.id}`,
													)}
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
								<TableCell colSpan={getCellsInRow().length + 2} />
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
