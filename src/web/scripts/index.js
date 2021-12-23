// 'use strict';

process.env.NODE_ENV = window.APPENV;

import React from 'react';
import ReactDOM from 'react-dom';

import DemoComponent from './components/DemoComponent';

if (document.getElementById('DemoComponent'))
	ReactDOM.render(
		<DemoComponent input={'some value'} />,
		document.getElementById('DemoComponent'),
	);
