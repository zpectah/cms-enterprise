import React from 'react';

import TileBase from './TileBase';

interface WelcomeTileProps {}

const WelcomeTile = ({}: WelcomeTileProps) => {
	return (
		<TileBase width={'75%'} title="Welcome">
			...
		</TileBase>
	);
};

export default WelcomeTile;
