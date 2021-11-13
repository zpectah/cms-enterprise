import React from 'react';
import { default as MuiAvatar } from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import styled from 'styled-components';

import { getElTestAttr } from '../../../utils/tests';

const StyledText = styled.span`
	font-size: 1.05rem;
	text-transform: uppercase;
`;

interface AvatarProps {
	size?: string;
	image?: string;
	firstName?: string;
	lastName?: string;
	nickName: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	dataAppId?: string;
	iconButtonProps?: IconButtonProps;
}

const Avatar = ({
	size = '32px',
	image,
	nickName,
	firstName,
	lastName,
	onClick,
	dataAppId = 'avatar.default',
	iconButtonProps,
}: AvatarProps) => {
	const clickHandler = (e) => {
		if (onClick) onClick(e);
	};

	return (
		<>
			<IconButton
				onClick={clickHandler}
				size="small"
				sx={{ ml: 2 }}
				aria-label="user dropdown"
				{...iconButtonProps}
				{...getElTestAttr(dataAppId)}
			>
				<MuiAvatar
					src={image}
					style={{ width: size, height: size }}
					alt={nickName}
				>
					{!image && (
						<StyledText>
							{firstName && lastName
								? firstName.charAt(0) + lastName.charAt(0)
								: nickName.charAt(0)}
						</StyledText>
					)}
				</MuiAvatar>
			</IconButton>
		</>
	);
};

export default Avatar;
