import React from 'react';
import ReactDOM from 'react-dom';

const DemoComponent = ({ input }) => {
	return <div>DemoComponent {input}</div>;
};

if (document.getElementById('DemoComponent'))
	ReactDOM.render(
		<DemoComponent input={'some value XXL'} />,
		document.getElementById('DemoComponent'),
	);
