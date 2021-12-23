import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import TileBase from './TileBase';
import { useProducts } from '../../hooks/model';
import { ProductsItemProps } from '../../types/model';
import { Preloader } from '../ui';

interface ProductsLastTileProps {
	itemsShow?: number;
}

const ProductsLastTile = ({ itemsShow = 4 }: ProductsLastTileProps) => {
	const { Products, products_loading } = useProducts();
	const { t } = useTranslation(['common', 'types']);
	const history = useHistory();
	const [listItems, setListItems] = useState<ProductsItemProps[]>([]);

	const setItemsListData = () => {
		let tmp = Products ? Products.slice(itemsShow * -1) : [];
		setListItems(tmp.reverse());
	};

	const clickHandler = (id: number | string) => {
		history.push(`${ROUTES.market.products.path}${ROUTE_SUFFIX.detail}/${id}`);
	};

	useEffect(() => setItemsListData(), [Products]);

	return (
		<TileBase width={'33%'} title={t('dashboard.title.LastProducts')}>
			{!products_loading ? (
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
										secondary={t(`types:${item.type}`)}
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

export default ProductsLastTile;
