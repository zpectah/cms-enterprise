import { createTheme } from '@mui/material/styles';

import palette from './palette';

export default createTheme({
	palette: {
		primary: {
			main: palette.veryPeri,
			contrastText: palette.white,
		},
		secondary: {
			main: palette.deepTaupe,
			contrastText: palette.white,
		},
		info: {
			main: palette.cyan,
			contrastText: palette.white,
		},
		error: {
			main: palette.red,
			contrastText: palette.white,
		},
		warning: {
			main: palette.amber,
			contrastText: palette.white,
		},
		action: {
			// selectedOpacity: 0.75,
		},
	},
});
