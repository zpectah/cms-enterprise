import React from 'react';
import Stack from '@mui/material/Stack';
import { isDesktop } from 'react-device-detect';
import styled from 'styled-components';

import Tile from '../../components/DashboardTile';

const StyledStack = styled(Stack)`
	margin-bottom: 1rem;
`;

interface CrmDashboardModuleProps {}

const CrmDashboardModule = ({}: CrmDashboardModuleProps) => {
	return (
		<>
			<StyledStack spacing={2} direction={isDesktop ? 'row' : 'column'}>
				<Tile.MembersLast />
			</StyledStack>
		</>
	);
};

export default CrmDashboardModule;
