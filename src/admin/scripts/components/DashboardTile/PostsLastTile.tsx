import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import TileBase from './TileBase';
import { usePosts } from '../../hooks/model';
import { PostsItemProps } from '../../types/model';
import { Preloader } from '../ui';

interface PostsLastTileProps {
	itemsShow?: number;
}

const PostsLastTile = ({ itemsShow = 4 }: PostsLastTileProps) => {
	const { Posts, posts_loading } = usePosts();
	const { t } = useTranslation(['common', 'types']);
	const history = useHistory();
	const [listItems, setListItems] = useState<PostsItemProps[]>([]);

	const setItemsListData = () => {
		let tmp = Posts ? Posts.slice(itemsShow * -1) : [];
		setListItems(tmp.reverse());
	};

	const clickHandler = (id: number | string) => {
		history.push(`${ROUTES.app.posts.path}${ROUTE_SUFFIX.detail}/${id}`);
	};

	useEffect(() => setItemsListData(), [Posts]);

	return (
		<TileBase width={'33%'} title={t('dashboard.title.LastPosts')}>
			{!posts_loading ? (
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

export default PostsLastTile;
