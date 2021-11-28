import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

import { ROUTES, EMAIL_REGEX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { Form, Button, Section, Input } from '../../components/ui';
import { useProfile } from '../../hooks/common';

interface LostPasswordFormProps {}

const LostPasswordForm = ({}: LostPasswordFormProps) => {
	const params: any = useParams();
	const history = useHistory();
	const { t } = useTranslation(['common', 'form']);
	const { userLostPassword, userLostPasswordReset } = useProfile();
	const [errorMessage, setErrorMessage] = useState<string>(null);
	const [successMessage, setSuccessMessage] = useState<string>(null);

	const formOptions: formLayoutObjectProps = {
		model: 'LostPassword',
		id: 'LostPasswordForm',
	};
	const { control, handleSubmit, reset, register, formState, setValue } =
		useForm({
			mode: 'all',
			defaultValues: {
				email: '',
			},
		});
	const { isDirty, isValid } = formState;

	const submitHandler = (data: any, e: any) => {
		const master = _.cloneDeep(data);

		setErrorMessage(null);
		setSuccessMessage(null);

		userLostPassword(master).then((response) => {
			switch (response?.message) {
				case 'user_not_found':
					setErrorMessage(t('form:form.Login.msg.user_not_found'));
					break;

				case 'user_not_active':
					setErrorMessage(t('form:form.Login.msg.user_not_active'));
					break;

				case 'user_is_deleted':
					setErrorMessage(t('form:form.Login.msg.user_is_deleted'));
					break;

				case 'request_was_send':
					setSuccessMessage(t('form:form.LostPassword.msg.request_was_send'));
					setValue('email', '');
					break;
			}
		});
	};
	const errorSubmitHandler = (errors: any, e: any) =>
		console.warn(`${formOptions.id}__${errors}`, e);

	const backToLoginHandler = () => history.push(ROUTES.app.login.path);

	const requestTokenHandler = (token: string) => {
		return userLostPasswordReset({ token: token }).then((response) => {
			switch (response?.message) {
				case 'user_password_reset_error':
					setErrorMessage(
						t('form:form.LostPassword.msg.user_password_reset_error'),
					);
					break;

				case 'user_password_already_reset':
					setErrorMessage(
						t('form:form.LostPassword.msg.user_password_already_reset'),
					);
					break;

				case 'request_not_found':
					setErrorMessage(t('form:form.LostPassword.msg.request_not_found'));
					break;

				case 'token_not_found':
					setErrorMessage(t('form:form.LostPassword.msg.token_not_found'));
					break;

				case 'user_password_reset_success':
					setSuccessMessage(
						t('form:form.LostPassword.msg.user_password_reset_success'),
					);
					setValue('email', '');
					setTimeout(() => {
						history.push(ROUTES.app.login.path);
					}, 1500);
					break;
			}
		});
	};

	useEffect(() => {
		if (params.token) requestTokenHandler(params.token);
	}, [params.token]);

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
					<Button type="submit" variant="contained" disabled={!isValid}>
						{t('button.submit')}
					</Button>
					<Button color="secondary" onClick={backToLoginHandler}>
						{t('label.backToLogin')}
					</Button>
				</Stack>
			</Section>
		</Form.Base>
	);
};

export default LostPasswordForm;
