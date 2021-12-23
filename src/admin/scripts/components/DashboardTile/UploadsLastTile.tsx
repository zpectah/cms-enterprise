import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import config from '../../config';
import { file as fileUtils } from '../../../../../utils/utils';
import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import TileBase from './TileBase';
import { useUploads } from '../../hooks/model';
import { UploadsItemProps } from '../../types/model';
import { Preloader } from '../ui';

interface UploadsLastTileProps {
	itemsShow?: number;
}

const UploadsLastTile = ({ itemsShow = 4 }: UploadsLastTileProps) => {
	const { Uploads, uploads_loading } = useUploads();
	const { t } = useTranslation(['common']);
	const history = useHistory();
	const [listItems, setListItems] = useState<UploadsItemProps[]>([]);

	const setItemsListData = () => {
		let tmp = Uploads ? Uploads.slice(itemsShow * -1) : [];
		setListItems(tmp.reverse());
	};

	const clickHandler = (id: number | string) => {
		history.push(`${ROUTES.app.uploads.path}${ROUTE_SUFFIX.detail}/${id}`);
	};

	useEffect(() => setItemsListData(), [Uploads]);

	return (
		<TileBase width={'33%'} title={t('dashboard.title.LastUploads')}>
			{!uploads_loading ? (
				<nav aria-label="items list">
					<List>
						{listItems.map((item) => (
							<ListItem
								key={item.id}
								alignItems="flex-start"
								onClick={() => clickHandler(item.id)}
								disablePadding
							>
								<ListItemButton>
									<ListItemAvatar>
										<Avatar
											alt={item.file_extension}
											src={
												item.type == 'image'
													? `/${config.project.path.uploads}image/thumbnail/${item.file_name}`
													: ''
											}
											variant="rounded"
											sx={{ width: 30, height: 30 }}
										>
											{item.type !== 'image' && (
												<small>{item.file_extension}</small>
											)}
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={item.file_name}
										secondary={fileUtils.formatBytes(item.file_size)}
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

export default UploadsLastTile;
