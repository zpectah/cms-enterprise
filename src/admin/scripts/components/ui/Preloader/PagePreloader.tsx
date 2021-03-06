import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import palette from '../../../styles/palette';

interface PagePreloaderProps {}

const PagePreloader = ({}: PagePreloaderProps) => {
	return (
		<>
			<Backdrop
				sx={{
					color: palette.dark,
					backgroundColor: 'rgba(250,250,250, .85)',
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	);
};

export default PagePreloader;
