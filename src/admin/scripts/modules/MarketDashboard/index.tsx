import React from 'react';
import Stack from '@mui/material/Stack';
import { isDesktop } from 'react-device-detect';
import styled from 'styled-components';

import Tile from '../../components/DashboardTile';

const StyledStack = styled(Stack)`
	margin-bottom: 1rem;
`;

interface MarketDashboardModuleProps {}

const MarketDashboardModule = ({}: MarketDashboardModuleProps) => {
	return (
		<>
			<StyledStack spacing={2} direction={isDesktop ? 'row' : 'column'}>
				<Tile.Base title="Tile one" width={'100%'}>
					Dashboard Tile
				</Tile.Base>
			</StyledStack>
		</>
	);
};

export default MarketDashboardModule;
