import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Preloader } from '../ui';

interface AuthRouteProps {
	exact?: true | false;
	path: string | string[];
	component: any;
	auth: number;
}

const AuthRoute: React.FC<AuthRouteProps> = ({
	children,
	exact,
	path,
	component,
	auth,
}) => {
	const [redirect, setRedirect] = useState<string | null>(null);
	const [userReady, setUserReady] = useState<boolean>(true);

	const isProfileLoading = false; // TODO

	const authorizeAccess = () => {};

	// useEffect(authorizeAccess, [Profile, auth]);

	if (isProfileLoading)
		return (
			<div>
				<Preloader.Page />
			</div>
		);

	if (redirect) {
		return <Redirect to={redirect} />;
	} else if (userReady) {
		return <Route exact={exact} path={path} component={component} />;
	} else {
		return (
			<div>
				<Preloader.Page />
			</div>
		);
	}
};

export default AuthRoute;
