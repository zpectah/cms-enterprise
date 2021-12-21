import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import config from '../../config';
import { array, file } from '../../../../../utils/utils';
import { getSearchAttrs, getTypesFromData } from '../../utils/table';
import {
	ROUTE_SUFFIX,
	FORM_INPUT_MIN_LENGTH,
	USER_LEVEL_NUMS,
} from '../../constants';
import { useProfile } from '../../hooks/common';
import { routeItemProps } from '../../types/pages';
import { appModelProps } from '../../types/app';
import { cellsTypesProps, customActionCellItemProps } from '../../types/table';
import { oneOfModelItemProps } from '../../types/model';
import { Section, Button, ButtonCreate, Input } from '../ui';
import ModuleViewHeading from '../ModuleViewHeading';
import ContentTitle from '../../components/Layout/Content/ContentTitle';
import ModuleLanguageToggle from '../ModuleLanguageToggle';
import Table from './Table';
import { getElTestAttr } from '../../utils/tests';

interface DataTableProps {
	model: appModelProps;
	routeObject: routeItemProps;
	tableData: oneOfModelItemProps[];
	tableCells: cellsTypesProps;
	tableSearchProps?: string[];
	selectedItems: readonly (number | string)[];
	onToggle: (id: (number | string)[]) => void;
	onDelete: (id: (number | string)[]) => void;
	onSelect: (selected: readonly string[]) => void;
	languageList: string[];
	languageDefault: string;
	dataTestId?: string;
	withoutLanguageToggle?: boolean;
	onCreateCallback: () => void;
	customActionTriggers?: customActionCellItemProps[];
	widthRowToggle?: boolean;
	widthRowDelete?: boolean;
}

const DataTable = ({
	model,
	routeObject,
	tableData,
	tableCells,
	tableSearchProps = [],
	selectedItems,
	onToggle,
	onDelete,
	onSelect,
	languageList = config.tmp.languageList,
	languageDefault = config.tmp.languageDefault,
	dataTestId = `dataTable.${model}`,
	withoutLanguageToggle = false,
	onCreateCallback,
	customActionTriggers,
	widthRowToggle = true,
	widthRowDelete = true,
}: DataTableProps) => {
	const { t } = useTranslation(['common', 'components', 'types']);
	const { Profile } = useProfile();
	const [lang, setLang] = useState(languageDefault);
	const [selectedRows, setSelectedRows] = useState(selectedItems);
	const [searchInput, setSearchInput] = useState('');
	const [filterType, setFilterType] = useState('all');
	const [selectedAnchEl, setSelectedAnchEl] = useState<null | HTMLElement>(
		null,
	);
	const should_delete = Profile?.user_level > USER_LEVEL_NUMS.redactor;
	const selectedDropdownOpen = Boolean(selectedAnchEl);

	const selectedDropdownOpenHandler = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		setSelectedAnchEl(event.currentTarget);
	};
	const selectedDropdownCloseHandler = () => {
		setSelectedAnchEl(null);
	};
	const onRowSelectCallback = (selected) => {
		onSelect(selected);
		setSelectedRows(selected);
	};
	const onRowToggleCallback = (id: number | string) => onToggle([id]);
	const onRowDeleteCallback = (id: number | string) => onDelete([id]);
	const onSelectedToggleCallback = () => {
		onToggle([...selectedRows]);
		selectedDropdownCloseHandler();
	};
	const onSelectedDeleteCallback = () => {
		onDelete([...selectedRows]);
		selectedDropdownCloseHandler();
	};
	const resetFilterHandler = () => {
		setSearchInput('');
		setFilterType('all');
	};

	const getTypesOptions = useCallback(() => {
		const tmp = getTypesFromData(tableData);
		let options = [
			{
				label: t(`types:all`),
				value: 'all',
			},
		];

		tmp.map((type) => {
			options.push({
				label: t(`types:${type}`),
				value: type,
			});
		});

		return options;
	}, [tableData]);
	const getFilteredItems = useCallback(() => {
		let items = [...tableData];

		if (searchInput.length > FORM_INPUT_MIN_LENGTH)
			items = array.search(
				tableData,
				getSearchAttrs(tableSearchProps, lang),
				searchInput,
			);

		if (filterType !== 'all') {
			let tmp = [];

			items.map((item) => {
				if (item.type == filterType) tmp.push(item);
			});

			items = tmp;
		}

		return items;
	}, [tableData, searchInput, filterType, lang]);

	useEffect(() => setSelectedRows(selectedItems), [selectedItems]);

	return (
		<>
			<ContentTitle
				id={`dataTable_title_${model}`}
				title={t(`page:${model}.page.title`)}
				listPath={routeObject.path}
			/>
			<ModuleViewHeading
				tertiaryChildren={
					<>
						<ButtonCreate
							onClick={onCreateCallback}
							dataTestId={`button.create.new.${model}`}
						>
							{t(`new.${model}`)}
						</ButtonCreate>
					</>
				}
				additionalChildren={
					<>
						<Stack spacing={2} direction="row">
							<FormControl size="small">
								<Input.Text
									type="search"
									id="outlined-basic"
									style={{ width: '250px' }}
									placeholder={t('table:options.searchInTable')}
									value={searchInput}
									onChange={(e: any) => setSearchInput(e.target.value)}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchIcon />
											</InputAdornment>
										),
									}}
									dataTestId={`${dataTestId}.options.search`}
									disabled={
										tableData.length == 0 &&
										!(searchInput.length >= FORM_INPUT_MIN_LENGTH)
									}
								/>
							</FormControl>
							<FormControl size="small">
								<Input.Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									style={{ width: '125px' }}
									placeholder={t('table:options.filterByType')}
									value={filterType}
									onChange={(e: any) => setFilterType(e.target.value)}
									disabled={getTypesFromData(tableData).length == 0}
									dataTestId={`${dataTestId}.options.filter.type`}
									options={getTypesOptions()}
								/>
							</FormControl>
							<Button
								aria-label={`reset filter`}
								size="small"
								onClick={resetFilterHandler}
								disabled={searchInput == '' && filterType == 'all'}
								dataTestId={`${dataTestId}.options.button.reset`}
							>
								{t(`button.reset`)}
							</Button>
						</Stack>
						<Stack spacing={2} direction="row">
							<div>
								<Button
									id="dataTable_options_selected_trigger"
									aria-controls="dataTable_options_selected_menu"
									aria-haspopup="true"
									aria-expanded={selectedDropdownOpen ? 'true' : undefined}
									onClick={selectedDropdownOpenHandler}
									variant="outlined"
									color="secondary"
									disabled={selectedRows.length == 0 || !should_delete}
									dataTestId={`${dataTestId}.options.selected.dropdown.trigger`}
								>
									{t(`table:options.selectedItems`)}&nbsp;&nbsp;(
									{selectedRows.length})
								</Button>
								<Menu
									id="dataTable_options_selected_menu"
									anchorEl={selectedAnchEl}
									open={selectedDropdownOpen}
									onClose={selectedDropdownCloseHandler}
									MenuListProps={{
										'aria-labelledby': 'dataTable_options_selected_trigger',
									}}
								>
									{widthRowToggle && (
										<MenuItem
											onClick={onSelectedToggleCallback}
											{...getElTestAttr(
												`${dataTestId}.options.selected.dropdown.toggleSelected`,
											)}
											disabled={!should_delete}
										>
											{t(`button.toggle`)}
										</MenuItem>
									)}
									{widthRowDelete && (
										<MenuItem
											onClick={onSelectedDeleteCallback}
											{...getElTestAttr(
												`${dataTestId}.options.selected.dropdown.deleteSelected`,
											)}
											disabled={!should_delete}
										>
											{t(`button.delete`)}
										</MenuItem>
									)}
								</Menu>
							</div>
						</Stack>
					</>
				}
			>
				<>
					{!withoutLanguageToggle && (
						<ModuleLanguageToggle
							language={lang}
							languageList={languageList}
							onChange={(lng) => setLang(lng)}
							style={{ marginRight: '.75rem' }}
						/>
					)}
				</>
			</ModuleViewHeading>
			<Section>
				<Table
					model={model}
					tableData={getFilteredItems()}
					tableCells={tableCells}
					rowPathPrefix={routeObject.path + ROUTE_SUFFIX.detail}
					selectedRows={selectedRows}
					onSelect={onRowSelectCallback}
					onToggle={onRowToggleCallback}
					onDelete={onRowDeleteCallback}
					dataTestId={dataTestId}
					customActionTriggers={customActionTriggers}
					searchLength={searchInput.length}
					shouldDelete={should_delete}
					widthRowToggle={widthRowToggle}
					widthRowDelete={widthRowDelete}
				/>
			</Section>
		</>
	);
};

export default DataTable;
