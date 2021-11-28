import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ROUTES, TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { useProfile, useToasts } from '../../hooks/common';
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

	const authorizeAccess = () => {
		const currentUser = Profile;

		if (profile_error) {
			createToasts({
				title: t('messages:error.profileLoadError'),
				context: 'error',
				timeout: TOASTS_TIMEOUT_DEFAULT,
			});

			return;
		} else if (!currentUser && !profile_loading) {
			setRedirect(ROUTES.app.login.path);
			createToasts({
				title: t('messages:error.noAccess'),
				context: 'error',
			});

			return;
		} else if (currentUser && !profile_loading) {
			if (auth > currentUser.user_level) {
				setRedirect(ROUTES.app.dashboard.path);
				createToasts({
					title: t('messages:error.unauthorizedAccess'),
					context: 'error',
				});
			}
		}

		setUserReady(true);
	};

	useEffect(authorizeAccess, [Profile, auth]);

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
