import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

import { UsersItemProps } from '../../types/model';
import { formLayoutObjectProps } from '../../types/app';
import { Form, Button, Section, Input } from '../../components/ui';

import Picker from '../../components/Picker';

interface ProfileFormProps {
	formData: any;
	onSubmit: (data: UsersItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
}

const ProfileForm = ({
	formData,
	onSubmit,
	onSubmitError,
}: ProfileFormProps) => {
	const { t } = useTranslation(['common', 'form', 'messages']);
	const [tmpAvatar, setTmpAvatar] = useState<any>(null);
	const formOptions: formLayoutObjectProps = {
		model: 'Profile',
		id: 'ProfileForm',
	};
	const {
		control,
		handleSubmit,
		register,
		formState: { isDirty, isValid },
	} = useForm({
		mode: 'all',
		defaultValues: {
			...formData,
		},
	});
	const submitHandler = (data: any, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (error: any, e: any) => onSubmitError(error, e);
	const renderFooter = () => {
		return (
			<>
				<Button
					type="submit"
					variant="contained"
					disabled={!isValid}
					endIcon={<SendIcon style={{ fontSize: '1rem' }} />}
				>
					{t('button.update')}
				</Button>
			</>
		);
	};

	return (
		<>
			<Form.Layout
				formName={formOptions.id}
				dataTestId={formOptions.id}
				onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
				footerChildren={renderFooter()}
			>
				{/*  ============ Main form body ============ */}
				<div>
					<input type="hidden" {...register('id', { required: true })} />
					<input type="hidden" {...register('type', { required: true })} />
					<input
						type="hidden"
						{...register('user_level', { required: true })}
					/>
					<input
						type="hidden"
						{...register('user_group', { required: true })}
					/>
					<input type="hidden" {...register('email', { required: true })} />
					<input type="hidden" {...register('active', { required: true })} />
				</div>
				<Section>
					<Controller
						name="img_avatar"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Avatar
									value={value}
									onChange={(blob) => {
										setTmpAvatar(blob);
										onChange(blob);
									}}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<div>{formData.email}</div>
				</Section>
				<Section>
					<Controller
						name="password"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									type="password"
									onChange={onChange}
									onBlur={onBlur}
									value={value || ''}
									name={name}
									id={`${formOptions.id}__password`}
									label={t('form:input.password_new')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.password`}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<Controller
						name="nick_name"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__nick_name`}
									label={t('form:input.nick_name')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.nick_name`}
									required
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="first_name"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__first_name`}
									label={t('form:input.first_name')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.first_name`}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="middle_name"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__middle_name`}
									label={t('form:input.middle_name')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.middle_name`}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="last_name"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__last_name`}
									label={t('form:input.last_name')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.last_name`}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<Controller
						name="description"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__description`}
									label={t('form:input.description')}
									// responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.description`}
									multiline
									rows={5}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				{/*  ============ \\ Main form body ============ */}
			</Form.Layout>
		</>
	);
};

export default ProfileForm;
