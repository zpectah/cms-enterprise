import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

import { ROUTES, EMAIL_REGEX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { Form, Button, Section } from '../../components/ui';
import { useProfile } from '../../hooks/common';
import { getElTestAttr } from '../../utils/tests';

interface LostPasswordFormProps {}

const LostPasswordForm = ({}: LostPasswordFormProps) => {
	const params: any = useParams();
	const history = useHistory();
	const { t } = useTranslation(['common', 'form']);
	const { userLostPassword } = useProfile();
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

		console.log('submitHandler', master);

		userLostPassword(master); // TODO

		setValue('email', '');

		setErrorMessage('Example error message ...');
		setSuccessMessage('Example success message ...');
	};
	const errorSubmitHandler = (errors: any, e: any) =>
		console.warn(`${formOptions.id}__${errors}`, e);

	const backToLoginHandler = () => history.push(ROUTES.app.login.path);

	// TODO: handle params
	useEffect(() => {
		if (params.token) console.log('lost password request token', params.token);
	}, [params.token]);

	return (
		<Form.Base
			name={formOptions.id}
			dataAppId={formOptions.id}
			onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
		>
			<Section style={{ width: '300px' }}>
				<Controller
					name="email"
					control={control}
					rules={{ required: true, pattern: EMAIL_REGEX }}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row errors={[]}>
							<TextField
								type="email"
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								name={name}
								id={`${formOptions.id}__email`}
								label={t('form:input.email')}
								variant="outlined"
								size="small"
								style={{ width: '100%' }}
								{...getElTestAttr(`${formOptions.id}.input.email`)}
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
