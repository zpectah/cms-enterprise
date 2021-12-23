import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import {
	ROUTES,
	ROUTE_SUFFIX,
	DEFAULT_UNITS,
	ORDER_STATUS_NUMS,
} from '../../constants';
import TileBase from './TileBase';
import { useOrders } from '../../hooks/model';
import { OrdersItemProps } from '../../types/model';
import { Preloader } from '../ui';

interface OrdersLastTileProps {
	itemsShow?: number;
}

const OrdersLastTile = ({ itemsShow = 4 }: OrdersLastTileProps) => {
	const { Orders, orders_loading } = useOrders();
	const { t } = useTranslation(['common', 'types', 'units']);
	const history = useHistory();
	const [listItems, setListItems] = useState<OrdersItemProps[]>([]);

	const setItemsListData = () => {
		let tmp = Orders ? Orders.slice(itemsShow * -1) : [];
		setListItems(tmp.reverse());
	};

	const clickHandler = (id: number | string) => {
		history.push(`${ROUTES.market.orders.path}${ROUTE_SUFFIX.detail}/${id}`);
	};

	useEffect(() => setItemsListData(), [Orders]);

	return (
		<TileBase width={'33%'} title={t('dashboard.title.LastOrders')}>
			{!orders_loading ? (
				<nav aria-label="items list">
					<List>
						{listItems.map((item) => (
							<ListItem
								key={item.id}
								disablePadding
								onClick={() => clickHandler(item.id)}
							>
								<ListItemButton>
									<ListItemText
										primary={item.name}
										secondary={`${item.price_total} ${t(
											`units.${DEFAULT_UNITS.price}`,
										)} | ${t(`status.${ORDER_STATUS_NUMS[item.status]}`)}`}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</nav>
			) : (
				<Preloader.Block />
			)}
		</TileBase>
	);
};

export default OrdersLastTile;
