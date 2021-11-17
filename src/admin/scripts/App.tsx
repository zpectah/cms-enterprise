import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as ThemeProviderSC } from 'styled-components';

import { storeProps } from './types/store';
import themes from './styles/themes';
import muiTheme from './styles/mui.theme';
import { GlobalStyles } from './styles/global';
import ThemeService from './services/Theme.service';
import HelpService from './services/Help.service';
import LanguageService from './services/Language.service';
import AppModule from './modules/App';
import CrmModule from './modules/Crm';
import MarketModule from './modules/Market';
import ToastsModule from './modules/Toasts';

const App = () => {
	const { theme } = useSelector((store: storeProps) => store);

	useEffect(() => {
		ThemeService.init();
		HelpService.init();
		LanguageService.init();

		return () => {};
	}, []);

	return (
		<ThemeProviderSC theme={themes[theme]}>
			<CssBaseline />
			<GlobalStyles />
			<ThemeProvider theme={muiTheme}>
				<Router>
					<AppModule />
					<CrmModule />
					<MarketModule />
				</Router>
				<ToastsModule />
			</ThemeProvider>
		</ThemeProviderSC>
	);
};

export default App;
