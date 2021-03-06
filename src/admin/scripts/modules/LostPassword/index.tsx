import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { ROUTES } from '../../constants';
import { useProfile } from '../../hooks/common';
import LostPasswordForm from './LostPasswordForm';
import NewPasswordForm from './NewPasswordForm';
import { Button } from '../../components/ui';
import LogsService from '../../services/Logs.service';

interface LostPasswordModuleProps {}

const LostPasswordModule = ({}: LostPasswordModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const { t } = useTranslation(['common', 'form']);
	const { userLostPassword, userCreateNewPassword, userLostPasswordReset } =
		useProfile();
	const [formView, setFormView] = useState<
		'lost-password' | 'new-password' | 'none'
	>('lost-password');
	const [errorMessage, setErrorMessage] = useState<string>(null);
	const [successMessage, setSuccessMessage] = useState<string>(null);
	const [formProcessing, setFormProcessing] = useState<boolean>(false);

	const setMessageHandler = (type: string, token?: string) => {
		setErrorMessage(null);
		setSuccessMessage(null);

		switch (type) {
			case 'user_not_found':
				setErrorMessage(t('form:form.Login.msg.user_not_found'));
				LogsService.create({
					method: 'LostPassword',
					status: 'user_not_found',
					content: token,
				});
				break;

			case 'user_not_active':
				setErrorMessage(t('form:form.Login.msg.user_not_active'));
				LogsService.create({
					method: 'LostPassword',
					status: 'user_not_active',
					content: token,
				});
				break;

			case 'user_is_deleted':
				setErrorMessage(t('form:form.Login.msg.user_is_deleted'));
				LogsService.create({
					method: 'LostPassword',
					status: 'user_is_deleted',
					content: token,
				});
				break;

			case 'request_was_send':
				setSuccessMessage(t('form:form.LostPassword.msg.request_was_send'));
				setFormView('none');
				break;

			case 'user_password_reset_error':
				setErrorMessage(
					t('form:form.LostPassword.msg.user_password_reset_error'),
				);
				LogsService.create({
					method: 'LostPassword',
					status: 'user_password_reset_error',
					content: token,
				});
				break;

			case 'user_password_already_reset':
				setErrorMessage(
					t('form:form.LostPassword.msg.user_password_already_reset'),
				);
				break;

			case 'request_not_found':
				setErrorMessage(t('form:form.LostPassword.msg.request_not_found'));
				LogsService.create({
					method: 'LostPassword',
					status: 'request_not_found',
					content: token,
				});
				break;

			case 'token_not_found':
				setErrorMessage(t('form:form.LostPassword.msg.token_not_found'));
				LogsService.create({
					method: 'LostPassword',
					status: 'token_not_found',
					content: token,
				});
				break;

			case 'user_password_reset_success':
				setSuccessMessage(
					t('form:form.LostPassword.msg.user_password_reset_success'),
				);
				setFormView('none');
				history.replace(ROUTES.app.lostPassword.path);
				break;
		}
	};

	const formLostPasswordSubmitHandler = (data: { email: string }) => {
		const master = _.cloneDeep(data);

		setFormProcessing(true);
		userLostPassword(master).then((response) => {
			setMessageHandler(response?.message, master.email);
			setFormProcessing(false);
		});
	};
	const formLostPasswordSubmitErrorHandler = (error: any, e: any) =>
		console.warn(error, e);

	const formNewPasswordSubmitHandler = (data: {
		password: string;
		token: string;
	}) => {
		const master = _.cloneDeep(data);

		setFormProcessing(true);
		userCreateNewPassword(master).then((response) => {
			setMessageHandler(response?.message, master.token);
			setFormProcessing(false);
		});
	};
	const formNewPasswordSubmitErrorHandler = (error: any, e: any) =>
		console.warn(error, e);

	const generatePasswordHandler = (data: { token: string }) => {
		const master = _.cloneDeep(data);

		setFormProcessing(true);
		userLostPasswordReset(master).then((response) => {
			setMessageHandler(response?.message, master.token);
			setFormProcessing(false);
		});
	};

	const formViewHandler = () => {
		if (params.token) setFormView('new-password');
	};

	const backToLoginHandler = () => history.push(ROUTES.app.login.path);

	useEffect(() => formViewHandler(), [params.token]);

	return (
		<>
			{
				{
					'lost-password': (
						<LostPasswordForm
							onSubmit={formLostPasswordSubmitHandler}
							onSubmitError={formLostPasswordSubmitErrorHandler}
							errorMessage={errorMessage}
							successMessage={successMessage}
							formProcessing={formProcessing}
						/>
					),
					'new-password': (
						<NewPasswordForm
							token={params.token || ''}
							onSubmit={formNewPasswordSubmitHandler}
							onSubmitError={formNewPasswordSubmitErrorHandler}
							onGenerateTemporary={generatePasswordHandler}
							errorMessage={errorMessage}
							successMessage={successMessage}
							formProcessing={formProcessing}
						/>
					),
					none: (
						<>
							{errorMessage && (
								<MuiAlert severity="error">{errorMessage}</MuiAlert>
							)}
							{successMessage && (
								<MuiAlert severity="success">{successMessage}</MuiAlert>
							)}
							<Stack
								spacing={2}
								direction="row"
								justifyContent="center"
								style={{ paddingTop: '1rem' }}
							>
								<Button color="secondary" onClick={backToLoginHandler}>
									{t('label.backToLogin')}
								</Button>
							</Stack>
						</>
					),
				}[formView]
			}
		</>
	);
};

export default LostPasswordModule;
