import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

import { Form, Button, Section, Input } from '../../components/ui';
import { formLayoutObjectProps } from '../../types/app';
import { ROUTES } from '../../constants';

interface NewPasswordFormProps {
	token: string;
	onSubmit: (data: { password: string; token: string }) => void;
	onSubmitError: (errors: any, e: any) => void;
	onGenerateTemporary: ({ token: string }) => void;
	errorMessage?: string;
	successMessage?: string;
	formProcessing: boolean;
}

const NewPasswordForm = ({
	token,
	onSubmit,
	onSubmitError,
	onGenerateTemporary,
	errorMessage,
	successMessage,
	formProcessing,
}: NewPasswordFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const history = useHistory();

	const formOptions: formLayoutObjectProps = {
		model: 'NewPassword',
		id: 'NewPasswordForm',
	};
	const { control, handleSubmit, reset, register, formState, setValue } =
		useForm({
			mode: 'all',
			defaultValues: {
				password: '',
				token: token,
			},
		});
	const { isDirty, isValid } = formState;

	const submitHandler = (data: { password: string; token: string }, e: any) => {
		setValue('password', '');
		onSubmit(data);
	};
	const errorSubmitHandler = (errors: any, e: any) => onSubmitError(errors, e);

	const backToLoginHandler = () => history.push(ROUTES.app.login.path);

	return (
		<Form.Base
			name={formOptions.id}
			dataTestId={formOptions.id}
			onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
		>
			<div>
				<input type="hidden" {...register('token', { required: true })} />
			</div>
			<Section style={{ width: '300px' }}>
				<Controller
					name="password"
					control={control}
					rules={{ required: true, minLength: 5 }}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row errors={[]}>
							<Input.Text
								type="password"
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								name={name}
								id={`${formOptions.id}__password`}
								label={t('form:input.password_new')}
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
					<Button type="submit" variant="contained" disabled={!isValid}>
						{t('button.submit')}
					</Button>
					<Button color="secondary" onClick={backToLoginHandler}>
						{t('label.backToLogin')}
					</Button>
				</Stack>
				<Stack
					spacing={2}
					direction="row"
					justifyContent="center"
					style={{ paddingTop: '1rem' }}
				>
					<Button onClick={() => onGenerateTemporary({ token: token })}>
						{t('form:form.LostPassword.btn.generateTemporaryPassword')}
					</Button>
				</Stack>
			</Section>
		</Form.Base>
	);
};

export default NewPasswordForm;
