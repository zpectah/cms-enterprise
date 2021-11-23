import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import config from '../../config';
import { array, file } from '../../../../../utils/utils';
import { getSearchAttrs, getTypesFromData } from '../../utils/table';
import { ROUTE_SUFFIX } from '../../constants';
import { routeItemProps } from '../../types/pages';
import { appModelProps } from '../../types/app';
import { cellsTypesProps } from '../../types/table';
import { oneOfModelItemProps } from '../../types/model';
import { Section, Button, ButtonCreate, Input } from '../ui';
import ModuleViewHeading from '../ModuleViewHeading';
import ContentTitle from '../../components/Layout/Content/ContentTitle';
import ModuleLanguageToggle from '../ModuleLanguageToggle';
import Table from './Table';

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
}: DataTableProps) => {
	const { t } = useTranslation(['common', 'components', 'types']);
	const [lang, setLang] = useState(languageDefault);
	const [selectedRows, setSelectedRows] = useState(selectedItems);
	const [searchInput, setSearchInput] = useState('');
	const [filterType, setFilterType] = useState('all');

	const onRowSelectCallback = (selected) => {
		onSelect(selected);
		setSelectedRows(selected);
	};
	const onRowToggleCallback = (id: number | string) => onToggle([id]);
	const onRowDeleteCallback = (id: number | string) => onDelete([id]);
	const onSelectedToggleCallback = () => onToggle([...selectedRows]);
	const onSelectedDeleteCallback = () => onDelete([...selectedRows]);
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
		let items = tableData;

		if (searchInput.length > 3)
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
	}, [searchInput, filterType]);

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
									onChange={(e) => setSearchInput(e.target.value)}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchIcon />
											</InputAdornment>
										),
									}}
									dataTestId={`${dataTestId}.options.search`}
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
							<ButtonGroup
								variant="outlined"
								color="secondary"
								aria-label="outlined button group"
								size="small"
							>
								<Button
									aria-label={`toggle selected`}
									size="small"
									disabled={selectedRows.length == 0}
									onClick={onSelectedToggleCallback}
									dataTestId={`${dataTestId}.options.button.toggleSelected`}
								>
									{t(`button.toggle`)}&nbsp;&nbsp;<b>{selectedRows.length}</b>
								</Button>
								<Button
									aria-label={`delete selected`}
									size="small"
									color="error"
									disabled={selectedRows.length == 0}
									onClick={onSelectedDeleteCallback}
									dataTestId={`${dataTestId}.options.button.deleteSelected`}
								>
									{t(`button.delete`)}&nbsp;&nbsp;<b>{selectedRows.length}</b>
								</Button>
							</ButtonGroup>
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
				/>
			</Section>
		</>
	);
};

export default DataTable;
