import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

import { ROUTES, EMAIL_REGEX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { Form, Button, Section, Input } from '../../components/ui';
import { useProfile } from '../../hooks/common';
import LogsService from '../../services/Logs.service';

interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
	const history = useHistory();
	const { t } = useTranslation(['common', 'form']);
	const { userLogin } = useProfile();
	const [errorMessage, setErrorMessage] = useState<string>(null);
	const [successMessage, setSuccessMessage] = useState<string>(null);
	const formOptions: formLayoutObjectProps = {
		model: 'Login',
		id: 'LoginForm',
	};
	const {
		control,
		handleSubmit,
		formState: { isValid },
		setValue,
	} = useForm({
		mode: 'all',
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const submitHandler = (
		data: {
			email: string;
			password: string;
		},
		e: any,
	) => {
		const master = _.cloneDeep(data);
		setErrorMessage(null);
		setSuccessMessage(null);
		userLogin(master).then((response) => {
			switch (response?.message) {
				case 'user_not_found':
					setErrorMessage(t('form:form.Login.msg.user_not_found'));
					LogsService.create({
						method: 'LoginForm',
						status: 'error',
						content: 'user_not_found',
					});
					break;

				case 'user_password_not_match':
					setErrorMessage(t('form:form.Login.msg.user_password_not_match'));
					break;

				case 'user_not_active':
					setErrorMessage(t('form:form.Login.msg.user_not_active'));
					LogsService.create({
						method: 'LoginForm',
						status: 'error',
						content: 'user_not_active',
					});
					break;

				case 'user_is_deleted':
					setErrorMessage(t('form:form.Login.msg.user_is_deleted'));
					LogsService.create({
						method: 'LoginForm',
						status: 'error',
						content: 'user_is_deleted',
					});
					break;

				case 'user_login_success':
					setSuccessMessage(t('form:form.Login.msg.user_login_success'));
					setValue('email', '');
					setValue('password', '');
					setTimeout(
						() => (window.location.href = ROUTES.app.dashboard.path),
						1500,
					);
					break;
			}
		});
	};
	const errorSubmitHandler = (errors: any, e: any) => console.warn(errors, e);
	const lostPasswordHandler = () => history.push(ROUTES.app.lostPassword.path);

	return (
		<Form.Base
			name={formOptions.id}
			dataTestId={formOptions.id}
			onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
		>
			<Section style={{ width: '300px' }}>
				<Controller
					name="email"
					control={control}
					rules={{ required: true, pattern: EMAIL_REGEX }}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row errors={[]}>
							<Input.Text
								type="email"
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								name={name}
								id={`${formOptions.id}__email`}
								label={t('form:input.email')}
								dataTestId={`${formOptions.id}.input.email`}
								required
							/>
						</Form.Row>
					)}
				/>
				<Controller
					name="password"
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row errors={[]}>
							<Input.Text
								type="password"
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								name={name}
								id={`${formOptions.id}__password`}
								label={t('form:input.password')}
								dataTestId={`${formOptions.id}.input.password`}
								required
							/>
						</Form.Row>
					)}
				/>
				{errorMessage && <MuiAlert severity="error">{errorMessage}</MuiAlert>}
				{successMessage && (
					<MuiAlert severity="success">{successMessage}</MuiAlert>
				)}
				<Stack
					spacing={2}
					direction="row"
					justifyContent="center"
					style={{ paddingTop: '1rem' }}
				>
					<Button
						type="submit"
						variant="contained"
						disabled={!isValid}
						dataTestId={`${formOptions.id}.button.submit`}
					>
						{t('button.submit')}
					</Button>
					<Button
						color="secondary"
						onClick={lostPasswordHandler}
						dataTestId={`${formOptions.id}.button.lostPassword`}
					>
						{t('label.lostPassword')}
					</Button>
				</Stack>
			</Section>
		</Form.Base>
	);
};

export default LoginForm;
