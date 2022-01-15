import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import config from '../../config';
import { useProducts } from '../../hooks/model';
import { Form, Input, IconButton } from '../../components/ui';
import Picker from '../../components/Picker';
import { getElTestAttr } from '../../utils/tests';
import InputAdornment from '@mui/material/InputAdornment';

const StyledTotalPrice = styled.div`
	font-size: 2rem;
	font-weight: 700;
	display: flex;
	flex-direction: row;
	align-items: baseline;
	line-height: 1;

	& > span {
		margin-left: 0.5rem;
		font-size: 1.25rem;
	}
`;

interface OrderItemsManagerProps {
	value: string[]; // model: [1:1,2:1] -> [id:amount]
	onChange: (value: string[]) => void;
	updateDisabled?: boolean;
	onPriceChange: (price: number) => void;
}

interface newProductItemProps {
	id: string | number;
	product_id: number;
	name: string;
	price: number;
	price_total: number;
	amount: number;
}

const newProductModel: newProductItemProps = {
	id: 'new',
	product_id: 0,
	name: '',
	price: 0,
	price_total: 0,
	amount: 1,
};

const OrderItemsManager = ({
	value = [],
	onChange,
	updateDisabled,
	onPriceChange,
}: OrderItemsManagerProps) => {
	const { t } = useTranslation(['common', 'form', 'components']);
	const { Products } = useProducts();
	const [tmpSelected, setTmpSelected] = useState<typeof newProductModel[]>([]);
	const [newProduct, setNewProduct] = useState(newProductModel);
	const [totalItems, setTotalItems] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const defaultUnits = config.project.units;

	const findProductDetail = (id: number | string) => {
		return Products?.find((item) => item.id == id);
	};
	const sendResponse = (selected) => {
		let tmp_response = [];
		selected.map((item) => {
			tmp_response.push(`${item.id}:${item.amount}`);
		});
		onChange(tmp_response);
	};
	const countDataPrice = (selected) => {
		let items = 0;
		let price = 0;
		selected.map((item) => {
			items = items + item.amount;
			price = price + item.price_total;
		});
		setTotalItems(items);
		setTotalPrice(price);
		onPriceChange(price);
	};
	const setSelectedList = () => {
		let tmp = [];
		Products?.map((product) => {
			value?.map((item, index) => {
				let parsed = item.split(':');
				if (product.id == parsed[0])
					tmp.push({
						id: index + 1,
						product_id: Number(parsed[0]),
						name: product.name,
						price: product.item_price,
						price_total: product.item_price * Number(parsed[1]),
						amount: Number(parsed[1]),
					});
			});
		});
		setTmpSelected(tmp);
	};
	const rowAddHandler = (data: any) => {
		let tmp = [...tmpSelected];
		let ni = _.cloneDeep(data);
		ni.id = String(tmpSelected.length + 1);
		tmp.push(ni);
		setTmpSelected(tmp);
		setNewProduct(_.cloneDeep(newProductModel));
		sendResponse(tmp);
	};
	const rowRemoveHandler = (index: number) => {
		let tmp = [...tmpSelected];
		tmp.splice(index, 1);
		setTmpSelected(tmp);
		sendResponse(tmp);
	};
	const renderRow = (
		item,
		index,
		onAmountChange,
		onProductChange,
		onRowCallback,
	) => {
		const callbackHandler = () => {
			if (item.id == 'new') {
				onRowCallback(item);
			} else {
				onRowCallback(index);
			}
		};

		return (
			<div key={item.id} style={{ marginBottom: '.75rem' }}>
				<Stack spacing={2} direction="row" justifyContent="flex-start">
					<Picker.Products
						onChange={onProductChange}
						value={item.product_id}
						disabled={item.id !== 'new' || updateDisabled}
						style={{ width: '100%' }}
						disabledPlaceholder
					/>
					<Input.Text
						type="number"
						id={`item_${item.id}_${index}_amount`}
						onChange={onAmountChange}
						value={item.amount}
						disabled={item.product_id == 0 || updateDisabled}
						style={{ width: '80px', flex: 'none' }}
						InputProps={{
							inputProps: { min: 0 },
							endAdornment: <InputAdornment position="end">⨯</InputAdornment>,
						}}
						dataTestId={`OrderItemsManager.row.${item.id}.input.amount`}
					/>
					<Input.Text
						type="number"
						id={`item_${item.id}_${index}_price`}
						value={item.price}
						style={{ width: '125px', flex: 'none' }}
						readOnly
						disabled
					/>
					<Input.Text
						type="number"
						id={`item_${item.id}_${index}_price_total`}
						value={item.price_total}
						style={{ width: '175px', flex: 'none' }}
						readOnly
						disabled
						InputProps={{
							inputProps: { min: 0 },
							startAdornment: (
								<InputAdornment position="start">
									{t(`units.${defaultUnits.price}`)}
								</InputAdornment>
							),
						}}
					/>
					<IconButton
						color={item.id == 'new' ? 'success' : 'error'}
						aria-label={item.id == 'new' ? 'add product' : 'remove product'}
						component="span"
						onClick={callbackHandler}
						disabled={item.product_id == 0 || updateDisabled}
						dataTestId={`OrderItemsManager.button.row.${
							item.id == 'new' ? 'add' : 'remove'
						}`}
					>
						{item.id == 'new' ? <AddCircleIcon /> : <CancelIcon />}
					</IconButton>
				</Stack>
			</div>
		);
	};

	useEffect(() => {
		if (tmpSelected) {
			countDataPrice(tmpSelected);
		}
	}, [tmpSelected]);

	useEffect(() => {
		if (Products) setSelectedList();

		return () => {};
	}, [value, Products]);

	return (
		<>
			{!updateDisabled &&
				renderRow(
					newProduct,
					0,
					(e) => {
						let np = _.cloneDeep(newProduct);
						np.amount = Number(e.target.value);
						np.price_total = newProduct.price * Number(e.target.value);
						setNewProduct(np);
					},
					(e) => {
						let itemData = findProductDetail(Number(e.target.value));
						let np = _.cloneDeep(newProduct);
						np.product_id = Number(e.target.value);
						np.name = itemData.name;
						np.price = itemData.item_price;
						np.price_total = itemData.item_price * Number(newProduct.amount);
						setNewProduct(np);
					},
					rowAddHandler,
				)}
			{!updateDisabled && <Divider />}
			<div style={{ marginBottom: '.75rem' }} />
			{tmpSelected.length > 0 ? (
				tmpSelected.map((item, index) =>
					renderRow(
						item,
						index,
						(e) => {
							let items = [...tmpSelected];
							items[index].amount = Number(e.target.value);
							items[index].price_total = item.price * Number(e.target.value);
							setTmpSelected(items);
							sendResponse(items);
						},
						(e) => {
							let items = [...tmpSelected],
								itemData;
							items[index].product_id = Number(e.target.value);
							itemData = findProductDetail(Number(e.target.value));
							items[index].name = itemData.name;
							items[index].price = itemData.item_price;
							items[index].price_total = item.price * item.amount;
							setTmpSelected(items);
							sendResponse(items);
						},
						rowRemoveHandler,
					),
				)
			) : (
				<div style={{ padding: '1rem 1rem 2rem 1rem', textAlign: 'center' }}>
					<small>
						{t('components:OrderItemsManager.title.no_items_created')}
					</small>
				</div>
			)}
			<div style={{ marginBottom: '.75rem' }} />
			<Divider />
			<div style={{ marginTop: '.75rem' }}>
				<Stack spacing={2} direction="row" justifyContent="space-between">
					<div>
						{t('components:OrderItemsManager.label.rows')}:{' '}
						<b>{tmpSelected.length}</b> |{' '}
						{t('components:OrderItemsManager.label.items')}: <b>{totalItems}</b>
					</div>
					<Stack spacing={2} direction="row" alignItems="top">
						<span>{t('components:OrderItemsManager.label.price')}</span>
						<StyledTotalPrice>
							{totalPrice} <span>{t(`units.${defaultUnits.price}`)}</span>
						</StyledTotalPrice>
					</Stack>
				</Stack>
			</div>
		</>
	);
};

export default OrderItemsManager;
