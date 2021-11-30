import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

import { ROUTES, EMAIL_REGEX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { Form, Button, Section, Input } from '../../components/ui';

interface LostPasswordFormProps {
	onSubmit: (data: { email: string }) => void;
	onSubmitError: (errors: any, e: any) => void;
	errorMessage?: string;
	successMessage?: string;
	formProcessing: boolean;
}

const LostPasswordForm = ({
	onSubmit,
	onSubmitError,
	errorMessage,
	successMessage,
	formProcessing,
}: LostPasswordFormProps) => {
	const history = useHistory();
	const { t } = useTranslation(['common', 'form']);

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
		setValue('email', '');
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
