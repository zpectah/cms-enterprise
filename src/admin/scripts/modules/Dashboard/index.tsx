import React from 'react';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

import Tile from '../../components/DashboardTile';

interface DashboardModuleProps {}

const DashboardModule = ({}: DashboardModuleProps) => {
	const { t } = useTranslation(['common']);

	return (
		<>
			<Stack spacing={2} direction="row">
				<Tile.Welcome />
				<Tile.PostsToApprove />
			</Stack>
			<Stack spacing={2} direction="row">
				<Tile.PostsLast />
				<Tile.PostsCalendar />
				<Tile.UploadsLast />
			</Stack>
		</>
	);
};

export default DashboardModule;
