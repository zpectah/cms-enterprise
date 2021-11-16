import React, { useEffect, useState } from 'react';
import { default as MuiDrawer } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import { RESPONSIVE_BREAKPOINTS, UI_VIEW_TOLERANCE } from '../../../constants';
import media from '../../../styles/responsive';
import { Scrollable, Typography } from '../../ui';

const DrawerElement = styled.div`
	width: 100vw;
	height: 100%;
`;
const DrawerSizeMd = styled(DrawerElement)`
	${media.min.sm} {
		width: ${RESPONSIVE_BREAKPOINTS.sm - UI_VIEW_TOLERANCE}px;
	}
`;
const DrawerSizeLg = styled(DrawerElement)`
	${media.min.md} {
		width: ${RESPONSIVE_BREAKPOINTS.md - UI_VIEW_TOLERANCE}px;
	}
`;
const DrawerSizeXl = styled(DrawerElement)`
	${media.min.lg} {
		width: ${RESPONSIVE_BREAKPOINTS.lg - UI_VIEW_TOLERANCE}px;
	}
`;

const DrawerHeading = styled.div`
	width: 100%;
	height: ${(props) => props.theme.drawer.header.height};
`;
const HeadingBlock = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;
const DrawerContent = styled.div`
	width: 100%;
	height: calc(100% - ${(props) => props.theme.drawer.header.height});
	position: relative;
`;
const DrawerContentInner = styled.div`
	padding: 1rem ${(props) => props.theme.spacer} 1.5rem
		${(props) => props.theme.spacer};
`;
const DrawerTitle = styled.div``;

interface DrawerBaseProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	size?: 'md' | 'lg' | 'xl';
}

const Drawer: React.FC<DrawerBaseProps> = ({
	children,
	isOpen,
	onClose,
	title,
	size = 'md',
}) => {
	const [open, setOpen] = useState<boolean>(isOpen);
	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose();
	};
	const component = {
		md: DrawerSizeMd,
		lg: DrawerSizeLg,
		xl: DrawerSizeXl,
	};
	const InnerComponent = component[size];
	const minWidth = {
		md: 'sm',
		lg: 'md',
		xl: 'lg',
	};

	useEffect(() => setOpen(isOpen), [isOpen]);

	return (
		<>
			<MuiDrawer anchor={'right'} onClose={handleClose} open={open}>
				<InnerComponent>
					<DrawerHeading>
						<HeadingBlock>
							<IconButton
								aria-label="close"
								onClick={onClose}
								sx={{
									width: '50px',
									height: '50px',
									color: (theme) => theme.palette.grey[500],
								}}
							>
								<MediaQuery minWidth={RESPONSIVE_BREAKPOINTS[minWidth[size]]}>
									{(matches) => (matches ? <ArrowBackIcon /> : <CloseIcon />)}
								</MediaQuery>
							</IconButton>
							<DrawerTitle>
								<Typography.Title h3>{title}</Typography.Title>
							</DrawerTitle>
						</HeadingBlock>
					</DrawerHeading>
					<DrawerContent>
						<Scrollable>
							<DrawerContentInner>{children}</DrawerContentInner>
						</Scrollable>
					</DrawerContent>
				</InnerComponent>
			</MuiDrawer>
		</>
	);
};

export default Drawer;
