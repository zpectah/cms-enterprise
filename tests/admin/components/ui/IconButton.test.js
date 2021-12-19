import React from 'react';
import renderer from 'react-test-renderer';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import IconButton from '../../../../src/admin/scripts/components/ui/Button/IconButton';

test('IconButton interaction', () => {
	const component = renderer.create(
		<IconButton>
			<AddCircleIcon />
		</IconButton>,
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
