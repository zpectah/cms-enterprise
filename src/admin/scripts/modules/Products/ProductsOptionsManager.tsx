import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';

import { useProductsOptions } from '../../hooks/model';
import { Input, IconButton } from '../../components/ui';
import Picker from '../../components/Picker';

interface ProductsOptionsManagerProps {
	value: string[];
	onChange: (value: string[]) => void;
}
interface newProductsOptionsItemsProps {
	id: string | number;
	option: string | number;
	name: string;
	value: string;
}

const newProductsOptionsModel: newProductsOptionsItemsProps = {
	id: 'new',
	option: '0',
	name: '',
	value: '',
};

const ProductsOptionsManager = ({
	value = [],
	onChange,
}: ProductsOptionsManagerProps) => {
	const { t } = useTranslation(['common', 'form', 'components']);
	const { ProductsOptions } = useProductsOptions();
	const [tmpSelected, setTmpSelected] = useState<
		newProductsOptionsItemsProps[]
	>([]);
	const [newOptions, setNewOption] = useState<newProductsOptionsItemsProps>(
		newProductsOptionsModel,
	);

	const findProductDetail = (id: number | string) => {
		return ProductsOptions?.find((item) => item.id == id);
	};
	const handleNewItem = (key: string, value: string) => {
		let ni = _.cloneDeep(newOptions),
			itemData;
		ni[key] = value;
		if (key == 'option') {
			itemData = findProductDetail(value);
			if (itemData) {
				ni.name = itemData.name;
				ni.value = itemData.value;
			}
		}
		setNewOption(ni);
	};
	const submitNewItem = () => {
		let tmp = [...tmpSelected];
		let ni = _.cloneDeep(newOptions);
		ni.id = String(tmpSelected.length + 1);
		tmp.push(ni);
		setNewOption(_.cloneDeep(newProductsOptionsModel));
		setTmpSelected(tmp);
		sendResponse(tmp);
	};
	const handleRowItem = (key: string, value: string, index: number) => {
		let tmp = [...tmpSelected];
		let ni = _.cloneDeep(tmp[index]);
		const itemData = findProductDetail(ni.option);
		ni[key] = value;
		if (key == 'option') {
			ni.name = itemData.name;
			ni.value = itemData.value;
		}
		tmp[index] = ni;
		setTmpSelected(tmp);
		sendResponse(tmp);
	};
	const rowRemoveHandler = (index: number) => {
		let tmp = [...tmpSelected];
		tmp.splice(index, 1);
		setTmpSelected(tmp);
		sendResponse(tmp);
	};
	const sendResponse = (selected: newProductsOptionsItemsProps[]) => {
		let tmp_response = [];
		selected.map((item) => {
			tmp_response.push(`${item.option}:(${item.value})`);
		});
		onChange(tmp_response);
	};
	const setSelectedList = () => {
		let tmp = [];
		ProductsOptions?.map((product) => {
			value?.map((item, index) => {
				let parsed = item.split(':');
				let parsed_value = parsed[1].slice(1, -1);
				if (product.id == parsed[0])
					tmp.push({
						id: index + 1,
						option: Number(parsed[0]),
						name: product.name,
						value: parsed_value || product.value,
					});
			});
		});
		setTmpSelected(tmp);
	};
	const renderRow = (
		item: newProductsOptionsItemsProps,
		onOptionChange,
		onValueChange,
		onSubmit,
		index: number,
	) => {
		return (
			<div key={`${item.id}_${index}`} style={{ marginBottom: '.75rem' }}>
				<Stack spacing={2} direction="row">
					<Picker.ProductsOptions
						value={item.option}
						onChange={onOptionChange}
						disabled={item.id !== 'new'}
						disabledPlaceholder
					/>
					<Input.Text
						value={item.value}
						onChange={onValueChange}
						placeholder={t('form:input.value')}
					/>
					<IconButton
						color={item.id == 'new' ? 'success' : 'error'}
						onClick={onSubmit}
						disabled={item.option == '0' || item.value == ''}
					>
						{item.id == 'new' ? <AddCircleIcon /> : <CancelIcon />}
					</IconButton>
				</Stack>
			</div>
		);
	};

	useEffect(() => {
		if (ProductsOptions) setSelectedList();

		return () => {};
	}, [value, ProductsOptions]);

	return (
		<>
			<div>
				{renderRow(
					newOptions,
					(e) => handleNewItem('option', e.target.value),
					(e) => handleNewItem('value', e.target.value),
					submitNewItem,
					-1,
				)}
			</div>
			<Divider />
			<div style={{ marginBottom: '.75rem' }} />
			{tmpSelected.length > 0 ? (
				<>
					{tmpSelected.map((item, index) => {
						return renderRow(
							item,
							(e) => handleRowItem('option', e.target.value, index),
							(e) => handleRowItem('value', e.target.value, index),
							() => rowRemoveHandler(index),
							index,
						);
					})}
				</>
			) : (
				<div style={{ padding: '1rem 1rem 2rem 1rem', textAlign: 'center' }}>
					<small>
						{t('components:ProductsOptionsManager.title.no_items_created')}
					</small>
				</div>
			)}
			<Divider />
		</>
	);
};

export default ProductsOptionsManager;
