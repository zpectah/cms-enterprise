import React from 'react';
import { useHistory } from 'react-router-dom';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { getElTestAttr } from '../../../utils/tests';

import { ROUTES } from '../../../constants';

interface SettingsButtonProps {
	dataAppId?: string;
	iconButtonProps?: IconButtonProps;
}

const SettingsButton = ({
	dataAppId = 'button.settings',
	iconButtonProps,
}: SettingsButtonProps) => {
	const history = useHistory();

	const settingsClickHandler = () => history.push(ROUTES.app.settings.path);

	return (
		<>
			<IconButton
				onClick={settingsClickHandler}
				aria-label="settings"
				{...iconButtonProps}
				{...getElTestAttr(dataAppId)}
			>
				<SettingsIcon fontSize="inherit" />
			</IconButton>
		</>
	);
};

export default SettingsButton;
