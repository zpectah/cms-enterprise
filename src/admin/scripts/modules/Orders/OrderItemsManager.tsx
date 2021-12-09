import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { useProducts } from '../../hooks/model';
import { Form, Input, Button } from '../../components/ui';
import Picker from '../../components/Picker';
import { getElTestAttr } from '../../utils/tests';

interface OrderItemsManagerProps {
	// Model of data should be like ... [1:1,2:1] ... [id:amount]
	value: any; // TODO
	onChange: (value: any) => void; // TODO
}

const OrderItemsManager = ({
	value = [],
	onChange,
}: OrderItemsManagerProps) => {
	const { Products } = useProducts();
	const [tmpSelected, setTmpSelected] = useState<any[]>([]);
	const [newProduct, setNewProduct] = useState({
		id: 'new',
		product_id: 0,
		name: '',
		price: 0,
		price_total: 0,
		amount: 1,
	});

	const findProductDetail = (id: number | string) => {
		return Products?.find((item) => item.id == id);
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
		setNewProduct({
			id: 'new',
			product_id: 0,
			name: '',
			price: 0,
			price_total: 0,
			amount: 1,
		});
	};
	const rowRemoveHandler = (index: number) => {
		let tmp = [...tmpSelected];
		tmp.splice(index, 1);
		setTmpSelected(tmp);
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
					<Input.Text
						type="number"
						id={`item_${item.id}_${index}_amount`}
						onChange={onAmountChange}
						value={item.amount}
						disabled={item.id == 'new'}
						style={{ width: '100px', flex: 'none' }}
					/>
					<Picker.Products onChange={onProductChange} value={item.product_id} />
					<Input.Text
						type="number"
						id={`item_${item.id}_${index}_price`}
						value={item.price}
						style={{ width: '150px', flex: 'none' }}
						readOnly
					/>
					<Input.Text
						type="number"
						id={`item_${item.id}_${index}_price_total`}
						value={item.price_total}
						style={{ width: '150px', flex: 'none' }}
						readOnly
					/>
					<IconButton
						color={item.id == 'new' ? 'success' : 'error'}
						aria-label={item.id == 'new' ? 'add product' : 'remove product'}
						component="span"
						onClick={callbackHandler}
						disabled={item.product_id == 0}
						{...getElTestAttr(
							`OrderItemsManager.button.new.${
								item.id == 'new' ? 'add' : 'remove'
							}`,
						)}
					>
						{item.id == 'new' ? <AddCircleIcon /> : <RemoveCircleIcon />}
					</IconButton>
				</Stack>
			</div>
		);
	};

	useEffect(() => {
		if (Products) setSelectedList();
	}, [value, Products]);

	return (
		<>
			{renderRow(
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
			<Divider />
			<div style={{ marginBottom: '.75rem' }} />
			{tmpSelected.map((item, index) =>
				renderRow(
					item,
					index,
					(e) => {
						let items = [...tmpSelected];
						items[index].amount = Number(e.target.value);
						items[index].price_total = item.price * Number(e.target.value);
						setTmpSelected(items);
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
					},
					rowRemoveHandler,
				),
			)}
			<div style={{ marginBottom: '.75rem' }} />
			<Divider />
			<div style={{ marginTop: '.75rem' }}>
				footer row (total items, total price ...)
			</div>
		</>
	);
};

export default OrderItemsManager;
