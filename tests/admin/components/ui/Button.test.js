import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../../../../src/admin/scripts/components/ui/Button';

test('Button interaction', () => {
	const component = renderer.create(
		<Button variant="contained">Button</Button>,
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
