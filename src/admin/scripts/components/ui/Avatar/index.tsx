import React from 'react';
import { default as MuiAvatar } from '@mui/material/Avatar';
import { IconButtonProps } from '@mui/material/IconButton';
import styled from 'styled-components';

import IconButton from '../Button/IconButton';
import { getElTestAttr } from '../../../utils/tests';

const StyledText = styled.span`
	font-size: 1rem;
	text-transform: uppercase;
`;

interface AvatarProps {
	size?: string;
	image?: string;
	firstName?: string;
	lastName?: string;
	nickName: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	dataTestId?: string;
	iconButtonProps?: IconButtonProps;
	buttonStyle?: React.CSSProperties;
}

const Avatar = ({
	size = '32px',
	image,
	nickName,
	firstName,
	lastName,
	onClick,
	dataTestId = 'avatar.default',
	iconButtonProps,
	buttonStyle,
}: AvatarProps) => {
	const clickHandler = (e) => {
		if (onClick) onClick(e);
	};

	return (
		<>
			<IconButton
				onClick={clickHandler}
				size="small"
				aria-label="user dropdown"
				dataTestId={dataTestId}
				style={buttonStyle}
				{...iconButtonProps}
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
