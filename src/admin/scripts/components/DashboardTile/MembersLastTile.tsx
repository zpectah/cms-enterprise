import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import TileBase from './TileBase';
import { useMembers } from '../../hooks/model';
import { MembersItemProps } from '../../types/model';
import { Preloader } from '../ui';

interface MembersLastTileProps {
	itemsShow?: number;
}

const MembersLastTile = ({ itemsShow = 4 }: MembersLastTileProps) => {
	const { Members, members_loading } = useMembers();
	const { t } = useTranslation(['common', 'types']);
	const history = useHistory();
	const [listItems, setListItems] = useState<MembersItemProps[]>([]);

	const setItemsListData = () => {
		let tmp = Members ? Members.slice(itemsShow * -1) : [];
		setListItems(tmp.reverse());
	};

	const clickHandler = (id: number | string) => {
		history.push(`${ROUTES.crm.members.path}${ROUTE_SUFFIX.detail}/${id}`);
	};

	useEffect(() => setItemsListData(), [Members]);

	return (
		<TileBase width={'33%'} title={t('dashboard.title.LastMembers')}>
			{!members_loading ? (
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
										primary={item.email}
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

export default MembersLastTile;
