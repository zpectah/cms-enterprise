import React from 'react';

import { useProfile } from '../../hooks/common';
import ProfileForm from './ProfileForm';

interface ProfileModuleProps {}

const ProfileModule = ({}: ProfileModuleProps) => {
	const { Profile } = useProfile();

	const formSubmitHandler = (data: any, e: any) => {
		console.log('formSubmitHandler', data);
	};

	const formSubmitErrorHandler = (error: any, e: any) => {
		console.log('formSubmitErrorHandler', error);
	};

	return (
		<>
			<ProfileForm
				formData={Profile}
				onSubmit={formSubmitHandler}
				onSubmitError={formSubmitErrorHandler}
			/>
		</>
	);
};

export default ProfileModule;
