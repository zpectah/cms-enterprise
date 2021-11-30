import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ROUTES, TOASTS_TIMEOUT_ERROR } from '../../constants';
import { useProfile, useToasts } from '../../hooks/common';
import { ProfileItemProps } from '../../types/modules';
import { Preloader } from '../ui';

interface AuthRouteProps {
	exact?: true | false;
	path: string | string[];
	component: any;
	auth: number;
}

const AuthRoute = ({ exact, path, component, auth }: AuthRouteProps) => {
	const { t } = useTranslation(['messages']);
	const { Profile, profile_loading, profile_error } = useProfile();
	const dispatch = useDispatch();
	const { createToasts } = useToasts(dispatch);
	const [redirect, setRedirect] = useState<string | null>(null);
	const [userReady, setUserReady] = useState<boolean>(true);

	const user = Profile as ProfileItemProps;

	const authorizeAccess = () => {
		if (profile_error) {
			createToasts({
				title: t('messages:error.profileLoadError'),
				context: 'error',
				timeout: TOASTS_TIMEOUT_ERROR,
			});
		}

		if ((!user || user == 'anonymous') && !profile_loading) {
			setRedirect(ROUTES.app.login.path);
			createToasts({
				title: t('messages:error.noAccess'),
				context: 'error',
				timeout: TOASTS_TIMEOUT_ERROR,
			});

			return;
		} else if (user && user !== 'anonymous' && !profile_loading) {
			if (Profile?.user_level < auth) {
				setRedirect(ROUTES.app.dashboard.path);
				createToasts({
					title: t('messages:error.unauthorizedAccess'),
					context: 'error',
					timeout: TOASTS_TIMEOUT_ERROR,
				});
			}
		}

		setUserReady(true);
	};

	useEffect(authorizeAccess, [user, auth]);

	if (profile_loading) return <Preloader.Page />;

	if (redirect) {
		return <Redirect to={redirect} />;
	} else if (userReady) {
		return <Route exact={exact} path={path} component={component} />;
	} else {
		return <Preloader.Page />;
	}
};

export default AuthRoute;
