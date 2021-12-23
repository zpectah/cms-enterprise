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

interface PostsToApproveTileProps {
	itemsShow?: number;
}

const PostsToApproveTile = ({ itemsShow = 4 }: PostsToApproveTileProps) => {
	const { Posts, posts_loading } = usePosts();
	const { t } = useTranslation(['common', 'types']);
	const history = useHistory();
	const [listItems, setListItems] = useState<PostsItemProps[]>([]);

	const setItemsListData = () => {
		let tmp = [];
		if (Posts)
			Posts.map((item) => {
				if (!item.approved) tmp.push(item);
			});
		tmp.slice(itemsShow * -1);
		tmp.reverse();
		setListItems(tmp);
	};

	const clickHandler = (id: number | string) => {
		history.push(`${ROUTES.app.posts.path}${ROUTE_SUFFIX.detail}/${id}`);
	};

	useEffect(() => setItemsListData(), [Posts]);

	return (
		<TileBase width={'33%'} title={t('dashboard.title.PostsToApprove')}>
			{!posts_loading ? (
				<nav aria-label="items list">
					<List>
						{listItems.length > 0 ? (
							listItems.map((item) => (
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
							))
						) : (
							<ListItem>
								<ListItemText>
									{t('dashboard.label.noPostsToApprove')}
								</ListItemText>
							</ListItem>
						)}
					</List>
				</nav>
			) : (
				<Preloader.Block />
			)}
		</TileBase>
	);
};

export default PostsToApproveTile;
