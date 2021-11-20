import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

import config from '../../config';
import { ROUTE_SUFFIX } from '../../constants';
import { routeItemProps } from '../../types/pages';
import { appModelProps } from '../../types/app';
import { Section, Button, Typography } from '../ui';
import ModuleViewHeading from '../ModuleViewHeading';
import ContentTitle from '../../components/Layout/Content/ContentTitle';
import ModuleLanguageToggle from '../ModuleLanguageToggle';
import Table from './Table';
import { getElTestAttr } from '../../utils/tests';

interface DataTableProps {
	model: appModelProps;
	routeObject: routeItemProps;
	tableData: any[];
	tableCells: {}; // TODO
	tableSearchProps?: string[];
	onToggle: (id: (number | string)[]) => void;
	onDelete: (id: (number | string)[]) => void;
	onSelect: (selected: readonly string[]) => void;
	languageList: string[];
	languageDefault: string;
	dataAppId?: string;
}

const DataTable = ({
	model,
	routeObject,
	tableData,
	tableCells,
	tableSearchProps = [],
	onToggle,
	onDelete,
	onSelect,
	languageList = config.tmp.languageList,
	languageDefault = config.tmp.languageDefault,
	dataAppId = `dataTable.${model}`,
}: DataTableProps) => {
	const history = useHistory();
	const { t } = useTranslation(['common', 'page']);
	const [lang, setLang] = useState(languageDefault);
	const [selectedRows, setSelectedRows] = useState([]);

	const buttonCreateHandler = () =>
		history.push(`${routeObject.path}${ROUTE_SUFFIX.detail}/new`);

	const [age, setAge] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};

	const onRowSelectCallback = (selected) => {
		onSelect(selected);
		setSelectedRows(selected);
	};
	const onRowToggleCallback = (id) => {
		onToggle([id]);
	};
	const onRowDeleteCallback = (id) => {
		onDelete([id]);
	};

	const onSelectedToggleCallback = () => {
		onToggle([...selectedRows]);
	};
	const onSelectedDeleteCallback = () => {
		onDelete([...selectedRows]);
	};

	const resetFilterCallback = () => {
		console.log('resetFilterCallback');
	};

	return (
		<>
			<ContentTitle
				title={t(`page:${model}.page.title`)}
				listPath={routeObject.path}
			/>
			<ModuleViewHeading
				tertiaryChildren={
					<>
						<Button
							variant="contained"
							color="success"
							onClick={buttonCreateHandler}
							startIcon={<AddIcon />}
							dataAppId={`button.create.new.${model}`}
						>
							{t(`new.${model}`)}
						</Button>
					</>
				}
				additionalChildren={
					<>
						<Stack spacing={2} direction="row">
							<FormControl size="small">
								<TextField
									type="search"
									id="outlined-basic"
									variant="outlined"
									size="small"
									style={{ width: '250px' }}
									placeholder="Search in table"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchIcon />
											</InputAdornment>
										),
									}}
								/>
							</FormControl>
							<FormControl size="small">
								<InputLabel id="demo-simple-select-label">Type</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={age}
									label="Age"
									onChange={handleChange}
									size="small"
									style={{ width: '150px' }}
									placeholder="Filter by type"
								>
									<MenuItem value={10}>All</MenuItem>
									<MenuItem value={20}>Default</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>
							<Button size="small" onClick={resetFilterCallback}>
								Reset
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
									aria-label={`toggle ${selectedRows.length}`}
									size="small"
									disabled={selectedRows.length == 0}
									onClick={onSelectedToggleCallback}
								>
									Toggle&nbsp;&nbsp;<b>{selectedRows.length}</b>
								</Button>
								<Button
									aria-label={`delete ${selectedRows.length}`}
									size="small"
									color="error"
									disabled={selectedRows.length == 0}
									onClick={onSelectedDeleteCallback}
								>
									Delete&nbsp;&nbsp;<b>{selectedRows.length}</b>
								</Button>
							</ButtonGroup>
						</Stack>
					</>
				}
			>
				<>
					<ModuleLanguageToggle
						language={lang}
						languageList={languageList}
						onChange={(lng) => setLang(lng)}
						style={{ marginRight: '.75rem' }}
					/>
				</>
			</ModuleViewHeading>
			<Section>
				<Table
					tableData={tableData}
					tableCells={tableCells}
					rowPathPrefix={routeObject.path + ROUTE_SUFFIX.detail}
					selectedRows={selectedRows}
					onSelect={onRowSelectCallback}
					onToggle={onRowToggleCallback}
					onDelete={onRowDeleteCallback}
					dataAppId={dataAppId}
				/>
			</Section>
		</>
	);
};

export default DataTable;
