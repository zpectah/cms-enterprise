'use strict';

process.env.NODE_ENV = window.APPENV;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import './i18n';
import store from './store';
import { fetcher } from './utils/api';
import App from './App';

ReactDOM.render(
	<Provider store={store}>
		<SWRConfig
			value={{
				fetcher,
			}}
			children={<App />}
		/>
	</Provider>,
	document.getElementById('App'),
);
