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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';

import {
	DATA_TABLE,
	FORM_INPUT_MIN_LENGTH,
	ORDER_STATUS_NUMS,
} from '../../../constants';
import { getComparator, stableSort } from '../../../utils/table';
import {
	cellsTypesProps,
	sortType,
	tableBodyCellItemProps,
	customActionCellItemProps,
} from '../../../types/table';
import { appModelProps } from '../../../types/app';
import { oneOfModelItemProps } from '../../../types/model';
import { Typography, Input, IconButton } from '../../ui';
import TableHeader from './TableHeader';
import { getElTestAttr } from '../../../utils/tests';
import config from '../../../config';

const StyledRowLink = styled(Typography.Title)`
	display: inline-flex;
	cursor: pointer;
	border-bottom: 1px solid transparent;
	align-items: center;
	justify-content: flex-start;

	&:hover {
		color: ${(props) => props.theme.palette.primary};
	}
`;

export interface TableProps {
	model: appModelProps;
	tableData: oneOfModelItemProps[];
	tableCells: cellsTypesProps;
	rowPathPrefix: string;
	selectedRows: readonly (number | string)[];
	onSelect: (selected: readonly (number | string)[]) => void;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	dataTestId?: string;
	minWidth?: number;
	customActionTriggers?: customActionCellItemProps[];
	searchLength?: number;
	shouldDelete: boolean;
}

interface TableRowActionsButtonsProps {
	row: any;
	onDelete: TableProps['onDelete'];
	rowIdPrefix: string;
	customActionTriggers?: customActionCellItemProps[];
	shouldDelete: boolean;
}

const TableRowActionButtons = ({
	row,
	onDelete,
	rowIdPrefix,
	customActionTriggers = [],
	shouldDelete,
}: TableRowActionsButtonsProps) => {
	const { t } = useTranslation(['common']);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const menuOpenHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const menuCloseHandler = () => {
		setAnchorEl(null);
	};

	const deleteClickHandler = () => {
		onDelete(row.id);
		menuCloseHandler();
	};

	return (
		<Stack direction="row" spacing={2} justifyContent="flex-end">
			<div>
				<IconButton
					id={`${rowIdPrefix}_button`}
					aria-controls={`${rowIdPrefix}_menu`}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					size="small"
					onClick={menuOpenHandler}
				>
					<MoreHorizIcon />
				</IconButton>
				<Menu
					id={`${rowIdPrefix}_menu`}
					anchorEl={anchorEl}
					open={open}
					onClose={menuCloseHandler}
					MenuListProps={{
						'aria-labelledby': `${rowIdPrefix}_button`,
					}}
				>
					<MenuItem onClick={deleteClickHandler} disabled={!shouldDelete}>
						{t('button.delete')}
					</MenuItem>
					{customActionTriggers.length > 0 &&
						customActionTriggers.map((trigger) => (
							<MenuItem
								key={trigger.label}
								onClick={() => {
									trigger.callback(row.id);
									menuCloseHandler();
								}}
								disabled={trigger.disabled}
							>
								{trigger.label}
							</MenuItem>
						))}
				</Menu>
			</div>
		</Stack>
	);
};

const Table = ({
	model,
	tableData,
	tableCells,
	rowPathPrefix,
	selectedRows,
	onSelect,
	onToggle,
	onDelete,
	dataTestId,
	minWidth = 750,
	customActionTriggers,
	searchLength = 0,
	shouldDelete,
}: TableProps) => {
	const history = useHistory();
	const { t } = useTranslation(['common', 'components', 'types']);
	const [order, setOrder] = useState<sortType>('desc');
	const [orderBy, setOrderBy] = useState<keyof oneOfModelItemProps>('id');
	const [selected, setSelected] =
		useState<readonly (number | string)[]>(selectedRows);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(DATA_TABLE.rowsDefault);

	const tableRowHeight = DATA_TABLE.rowHeightDefault;
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;
	const tableRowIdPrefix = `${dataTestId}.row`;

	const sortRequestHandler = (
		event: React.MouseEvent<unknown>,
		property: keyof oneOfModelItemProps,
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

	const rowSelectHandler = (
		event: React.MouseEvent<unknown>,
		id: number | string,
	) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: (number | string)[] = [];

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
				children: (
					<StyledRowLink
						h6
						onClick={() => clickDetailHandler(row.id)}
						dataTestId={`${tableRowIdPrefix}.cell.name.link.${row.id}`}
					>
						{row.name}
					</StyledRowLink>
				),
			});

		if (tableCells.email)
			cells.push({
				key: 'email',
				padding: 'none',
				scope: 'row',
				element: 'th',
				align: tableCells.email[0],
				width: tableCells.email[1],
				children: (
					<StyledRowLink
						h6
						onClick={() => clickDetailHandler(row.id)}
						dataTestId={`${tableRowIdPrefix}.cell.email.link.${row.id}`}
					>
						(avatar) {row.email}
					</StyledRowLink>
				),
			});

		if (tableCells.file_name)
			cells.push({
				key: 'file_name',
				padding: 'none',
				scope: 'row',
				element: 'th',
				align: tableCells.file_name[0],
				width: tableCells.file_name[1],
				children: (
					<>
						<StyledRowLink
							h6
							onClick={() => clickDetailHandler(row.id)}
							dataTestId={`${tableRowIdPrefix}.cell.file_name.link.${row.id}`}
						>
							{row.type == 'image' && (
								<img
									src={`/${config.project.path.uploads}image/thumbnail/${row.file_name}`}
									alt={row.name}
									style={{
										maxWidth: '36px',
										height: 'auto',
										marginRight: '1rem',
									}}
								/>
							)}
							{row.file_name}
						</StyledRowLink>
					</>
				),
			});

		// --

		if (tableCells.type)
			cells.push({
				key: 'type',
				padding: 'none',
				align: tableCells.type[0],
				width: tableCells.type[1],
				children: (
					<Stack direction="row" spacing={2}>
						<Chip
							label={t(`types:${row.type}`)}
							variant="outlined"
							size="small"
						/>
					</Stack>
				),
			});

		// --

		if (tableCells.order_status)
			cells.push({
				key: 'status',
				padding: 'none',
				align: tableCells.order_status[0],
				width: tableCells.order_status[1],
				numeric: true,
				children: (
					<div>
						<Chip
							label={t(`status.${ORDER_STATUS_NUMS[row.status]}`)}
							color={
								row.status == 2 ? 'success' : row.status == 0 ? 'error' : 'info'
							}
							variant="outlined"
							size="small"
						/>
					</div>
				),
			});

		if (tableCells.active)
			cells.push({
				key: 'active',
				padding: 'none',
				align: tableCells.active[0],
				width: tableCells.active[1],
				children: (
					<Input.Switch
						aria-label="Item toggle"
						size="small"
						checked={row.active}
						onClick={() => onRowToggleHandler(row.id)}
						dataTestId={`${tableRowIdPrefix}.cell.active.switch.${row.id}`}
						disabled={!shouldDelete}
					/>
				),
			});

		// ****
		// TODO: new cells
		// ***

		return cells;
	};

	const cellTypes: string[] = [
		'name',
		'email',
		'file_name',
		'type',
		'order_status',
		'active',

		// ****
		// TODO: new cells
		// ***
	];

	const getCellsInRow = useCallback(() => {
		const cells = [] as string[];

		if (tableCells.name) cells.push('name');
		if (tableCells.email) cells.push('email');
		if (tableCells.file_name) cells.push('file_name');
		if (tableCells.type) cells.push('type');
		if (tableCells.order_status) cells.push('order_status');
		if (tableCells.active) cells.push('active');

		// ****
		// TODO: new cells
		// ***

		return cells;
	}, [tableCells]);

	useEffect(() => onSelect(selected), [selected]);

	useEffect(() => setSelected(selectedRows), [selectedRows]);

	return (
		<Box sx={{ width: '100%' }} {...getElTestAttr(dataTestId)}>
			<TableContainer>
				<MuiTable
					sx={{ minWidth: minWidth }}
					aria-labelledby={`dataTable_title_${model}`}
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
						cellTypes={cellTypes}
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
											<Input.Checkbox
												color="primary"
												checked={isItemSelected}
												onClick={(event) => rowSelectHandler(event, row.id)}
												inputProps={{
													'aria-labelledby': labelId,
												}}
												dataTestId={`${tableRowIdPrefix}.cell.checkbox.${row.id}`}
											/>
										</TableCell>
										{getBodyCells(row).map((cell) => (
											<TableCell
												key={cell.key}
												component={cell.element ? cell.element : 'td'}
												id={cell.key}
												scope={cell.scope && cell.scope}
												padding={cell.padding ? cell.padding : 'normal'}
												children={cell.children}
												align={cell.align}
												width={cell.width}
												style={{ verticalAlign: 'middle' }}
											/>
										))}
										<TableCell align="right" style={{ width: '125px' }}>
											<TableRowActionButtons
												row={row}
												rowIdPrefix={`${tableRowIdPrefix}_${index}`}
												onDelete={onRowDeleteHandler}
												customActionTriggers={customActionTriggers}
												shouldDelete={shouldDelete}
											/>
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
						{tableData.length == 0 && (
							<TableRow
								style={{
									height: tableRowHeight * emptyRows,
								}}
							>
								<TableCell colSpan={getCellsInRow().length + 2}>
									{searchLength > FORM_INPUT_MIN_LENGTH
										? t('table:message.itemsNotFound')
										: t('table:message.noItemsCreated')}
								</TableCell>
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
				labelRowsPerPage={t('table:options.rowsPerPage')}
				labelDisplayedRows={({ from, to, count }) => {
					return `${from}–${to} ${t('table:options.of')} ${
						count !== -1 ? count : `${t('table:options.of')} ${to}`
					}`;
				}}
			/>
		</Box>
	);
};

export default Table;
