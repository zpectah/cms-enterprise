import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';

import { IconButton } from '../ui';
import media from '../../styles/responsive';

const Wrapper = styled(Card)<{ width: string }>`
	width: 100%;

	${media.min.md} {
		width: ${(props) => (props.width ? props.width : '100%')};
	}
`;

interface headingOptionsItemProps {
	key: string;
	label: string;
	callback: () => void;
}
interface TileBaseProps {
	width?: string;
	title: string;
	subheader?: string;
	headingOptions?: headingOptionsItemProps[];
	footerActions?: React.ReactChildren;
}

const TileBase: React.FC<TileBaseProps> = ({
	children,
	width,
	title,
	subheader,
	headingOptions = [],
	footerActions,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Wrapper width={width}>
			<CardHeader
				action={
					headingOptions.length > 0 && (
						<>
							<IconButton
								id="basic-button"
								aria-controls="basic-menu"
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								aria-label="settings"
								onClick={handleClick}
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
							>
								{headingOptions.map((item) => (
									<MenuItem
										key={item.key}
										onClick={() => {
											item.callback();
											handleClose();
										}}
									>
										{item.label}
									</MenuItem>
								))}
							</Menu>
						</>
					)
				}
				title={title}
				subheader={subheader}
			/>
			<>{children}</>
			{footerActions && <CardActions>{footerActions}</CardActions>}
		</Wrapper>
	);
};

export default TileBase;
