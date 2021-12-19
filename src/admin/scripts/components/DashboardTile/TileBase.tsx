import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from 'styled-components';

import { IconButton } from '../ui';

const Wrapper = styled(Card)``;

interface TileBaseProps {
	width?: string;
	title: string;
	subheader?: string;
}

const TileBase: React.FC<TileBaseProps> = ({
	children,
	width,
	title,
	subheader,
}) => {
	return (
		<Wrapper style={{ width: width }}>
			<CardHeader
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={title}
				subheader={subheader}
			/>
			<CardContent>{children}</CardContent>
			<CardActions>actions on bottom</CardActions>
		</Wrapper>
	);
};

export default TileBase;
