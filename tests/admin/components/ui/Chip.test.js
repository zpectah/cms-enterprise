import React from 'react';
import renderer from 'react-test-renderer';

import Chip from '../../../../src/admin/scripts/components/ui/Chip';

test('Button interaction', () => {
	const component = renderer.create(<Chip variant="contained">Chip</Chip>);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
