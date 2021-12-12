import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ROUTES, TOASTS_TIMEOUT_ERROR } from '../../constants';
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
	const [userReady, setUserReady] = useState<boolean>(false);

	const authorizeAccess = () => {
		const user = Profile;

		if (!user && !profile_loading) {
			setRedirect(ROUTES.app.login.path);

			return;
		} else if (user && !profile_loading) {
			if (user?.user_level < auth) {
				setRedirect(ROUTES.app.dashboard.path + '/');
				createToasts({
					title: t('messages:error.unauthorizedAccess'),
					context: 'error',
					timeout: TOASTS_TIMEOUT_ERROR,
				});
			}
		}

		setUserReady(true);
	};

	useEffect(() => {
		authorizeAccess();
	}, [Profile, auth]);

	if (profile_loading || profile_error) return <Preloader.Page />;

	if (redirect) {
		window.location.href = redirect;
		return <></>;
	} else if (userReady) {
		return <Route exact={exact} path={path} component={component} />;
	} else {
		return <Preloader.Page />;
	}
};

export default AuthRoute;
