import React from 'react';

import { useUsers } from '../../hooks/model';
import { USER_LEVEL } from '../../constants';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface UsersPickerProps {
	ignored?: any[];
	ignoreRedactor?: boolean;
}

const UsersPicker = (props: UsersPickerProps & PickerBaseInitialProps) => {
	const {
		responsiveWidth,
		dataTestId,
		ignored = [],
		ignoreRedactor,
		...rest
	} = props;
	const { Users } = useUsers();

	const getOptionsList = () => {
		let options = [];
		Users?.map((item) => {
			options.push({
				label: item.nick_name,
				value: item.id as string,
				disabled:
					ignored.includes(item.id) ||
					(ignoreRedactor && item.user_level < USER_LEVEL.chief_redactor.id),
			});
		});

		return options;
	};

	return (
		<PickerBase
			items={getOptionsList()}
			dataTestId={`UsersPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			{...rest}
		/>
	);
};

export default UsersPicker;
