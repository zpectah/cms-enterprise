import React, { forwardRef, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { ROUTE_SUFFIX } from '../../../constants';
import { default as ButtonBase, ButtonBaseProps } from './index';
import { getElTestAttr } from '../../../utils/tests';

interface ButtonCreateProps extends ButtonBaseProps {
	dataAppId?: string;
	pathPrefix: string;
}

const ButtonCreate = forwardRef((props: ButtonCreateProps, ref) => {
	const { dataAppId = 'button.create', pathPrefix, to, ...rest } = props;

	return (
		<ButtonBase
			to={pathPrefix + ROUTE_SUFFIX.detail + '/new'}
			startIcon={<AddIcon fontSize="inherit" />}
			variant="contained"
			color="success"
			{...rest}
			{...getElTestAttr(dataAppId)}
		/>
	);
});

export default ButtonCreate;
