import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UndoIcon from '@mui/icons-material/Undo';
import styled from 'styled-components';

import Uploader from '../Uploader';

const ImageWrapper = styled.div`
	display: inline-flex;
	position: relative;
	color: ${(props) => props.theme.palette.light};
	border-radius: 100%;
	overflow: hidden;
	flex: none;
`;
const UndoButton = styled.div`
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	cursor: pointer;
	color: inherit;
`;
const ChangeTrigger = styled.div`
	width: 30px;
	height: 30px;
	margin-bottom: -30px;
	position: relative;
	top: 0;
	right: 30px;
	cursor: pointer;
`;

interface AvatarPickerProps {
	value?: string;
	onChange: (blob: string) => void;
}

const AvatarPicker = ({ value, onChange }: AvatarPickerProps) => {
	const [avatar, setAvatar] = useState<string>(value);
	const [tmpAvatar, setTmpAvatar] = useState<string>(value);

	useEffect(() => onChange(tmpAvatar), [tmpAvatar]);

	return (
		<>
			<ImageWrapper>
				{tmpAvatar && <img src={tmpAvatar} alt={'avatar'} />}
				{avatar !== tmpAvatar && (
					<UndoButton
						onClick={() => {
							setTmpAvatar(avatar);
						}}
					>
						<UndoIcon fontSize="medium" />
					</UndoButton>
				)}
			</ImageWrapper>
			<Uploader
				onChange={(sources) => {
					if (sources[0]) setTmpAvatar(sources[0].fileBase64_cropped);
				}}
				widthHeading={false}
				multiple={false}
				avatarOnly
			>
				<ChangeTrigger>
					<AddCircleOutlineIcon fontSize="large" />
				</ChangeTrigger>
			</Uploader>
		</>
	);
};

export default AvatarPicker;
