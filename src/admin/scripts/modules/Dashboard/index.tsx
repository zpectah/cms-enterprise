import React from 'react';
import Stack from '@mui/material/Stack';
import { isDesktop } from 'react-device-detect';
import styled from 'styled-components';

import { USER_LEVEL_NUMS } from '../../constants';
import Tile from '../../components/DashboardTile';
import { useSettings, useProfile } from '../../hooks/common';

const StyledStack = styled(Stack)`
	margin-bottom: 1rem;
`;

interface DashboardModuleProps {}

const DashboardModule = ({}: DashboardModuleProps) => {
	const { Settings } = useSettings();
	const { Profile } = useProfile();
	const show_postsToApprove =
		Settings?.content_redactor_approval &&
		Profile?.user_level > USER_LEVEL_NUMS.redactor;
	return (
		<>
			<StyledStack spacing={2} direction={isDesktop ? 'row' : 'column'}>
				{show_postsToApprove && <Tile.PostsToApprove />}
				<Tile.PostsLast />
				<Tile.UploadsLast />
			</StyledStack>
			<StyledStack spacing={2} direction={isDesktop ? 'row' : 'column'}>
				<Tile.PostsCalendar />
			</StyledStack>
		</>
	);
};

export default DashboardModule;
