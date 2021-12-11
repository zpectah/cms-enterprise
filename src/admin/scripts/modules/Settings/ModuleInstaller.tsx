import React, { useState } from 'react';
import Stack from '@mui/material/Stack';

import config from '../../config';
import { useSystem, useSettings } from '../../hooks/common';
import { Button, Preloader } from '../../components/ui';

interface ModuleInstallerProps {
	module: 'crm' | 'market';
	afterInstall: () => void;
	crmInstalled: boolean;
	marketInstalled: boolean;
}

const ModuleInstaller = ({ afterInstall, module }: ModuleInstallerProps) => {
	const { installModule } = useSystem();
	const { updateSettings } = useSettings();
	const [processing, setProcessing] = useState(false);
	const installHandler = () => {
		setProcessing(true);
		installModule({ module: module }).then((response) => {
			const request =
				module == 'crm'
					? { module_crm_active: true, module_crm_installed: true }
					: { module_market_active: true, module_market_installed: true };
			updateSettings(request).then((response) => {
				setProcessing(false);
				afterInstall();
			});
		});
	};

	return (
		<Stack spacing={2} direction="row">
			<Button
				onClick={installHandler}
				color="success"
				variant="contained"
				loading={processing}
			>
				Install
			</Button>
			{processing && <Preloader.Block />}
		</Stack>
	);
};

export default ModuleInstaller;
