import React from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { UsersItemProps } from '../../types/model';
import { useProfile, useToasts } from '../../hooks/common';
import { Preloader } from '../../components/ui';
import { TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import ProfileForm from './ProfileForm';

interface ProfileModuleProps {}

const ProfileModule = ({}: ProfileModuleProps) => {
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'messages']);
	const { Profile, updateProfile } = useProfile();
	const { createToasts } = useToasts(dispatch);

	const formSubmitHandler = (data: UsersItemProps, e: any) => {
		const master: UsersItemProps = _.cloneDeep(data);

		updateProfile(master).then((response) => {
			if (response.rows == 1) {
				createToasts({
					title: t('messages:success.profileUpdated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
			} else if (response.rows == -1) {
				createToasts({
					title: t('messages:error.profileUpdateError'),
					context: 'error',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
			}
		});
	};

	// When error returns from submit
	const formSubmitErrorHandler = (error: string) =>
		createToasts({
			title: error,
			context: 'error',
			timeout: TOASTS_TIMEOUT_DEFAULT,
		});

	return (
		<>
			{Profile ? (
				<ProfileForm
					formData={Profile}
					onSubmit={formSubmitHandler}
					onSubmitError={formSubmitErrorHandler}
				/>
			) : (
				<Preloader.Block />
			)}
		</>
	);
};

export default ProfileModule;
