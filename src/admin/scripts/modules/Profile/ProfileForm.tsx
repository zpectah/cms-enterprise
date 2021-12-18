import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

import { USER_NUMS_LEVEL } from '../../constants';
import { UsersItemProps } from '../../types/model';
import { formLayoutObjectProps } from '../../types/app';
import {
	Form,
	Button,
	Section,
	Input,
	Typography,
	Chip,
} from '../../components/ui';

import Picker from '../../components/Picker';

const AvatarHeadingWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
`;
const HeadingDetail = styled.div`
	width: 100%;
	margin-left: 2rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

interface ProfileFormProps {
	formData: any;
	onSubmit: (data: UsersItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	isProcessing?: boolean;
}

const ProfileForm = ({
	formData,
	onSubmit,
	onSubmitError,
	isProcessing,
}: ProfileFormProps) => {
	const { t } = useTranslation(['common', 'form', 'messages', 'types']);
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
					loading={isProcessing}
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
							<Form.Row
								blankLabel
								id={`${formOptions.id}__img_avatar`}
								errors={[]}
							>
								<AvatarHeadingWrapper>
									<Picker.Avatar
										value={value}
										onChange={(blob) => {
											setTmpAvatar(blob);
											onChange(blob);
										}}
									/>
									<HeadingDetail>
										<Typography.Title h4>
											{formData.first_name}
											{formData.middle_name ? ` ${formData.middle_name} ` : ' '}
											{formData.last_name}
										</Typography.Title>
										<Typography.Paragraph small>
											{formData.email}
										</Typography.Paragraph>
										<Stack
											spacing={2}
											direction="row"
											style={{ marginTop: '1rem' }}
										>
											<Chip
												label={t(
													`types:${USER_NUMS_LEVEL[formData.user_level]}`,
												)}
												size="small"
												color="info"
											/>
											<Chip label={formData.user_group} size="small" />
										</Stack>
									</HeadingDetail>
								</AvatarHeadingWrapper>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<Controller
						name="password"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row
								id={`${formOptions.id}__password`}
								label={t('form:input.password_new')}
								errors={[]}
							>
								<Input.Password
									onChange={onChange}
									onBlur={onBlur}
									value={value || ''}
									name={name}
									id={`${formOptions.id}__password`}
									placeholder={t('form:input.password_new')}
									responsiveWidth={'50%'}
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
							<Form.Row
								id={`${formOptions.id}__nick_name`}
								label={t('form:input.nick_name')}
							>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__nick_name`}
									placeholder={t('form:input.nick_name')}
									responsiveWidth={'50%'}
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
							<Form.Row
								label={t('form:input.first_name')}
								id={`${formOptions.id}__password`}
							>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__first_name`}
									placeholder={t('form:input.first_name')}
									responsiveWidth={'50%'}
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
							<Form.Row
								id={`${formOptions.id}__middle_name`}
								label={t('form:input.middle_name')}
							>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__middle_name`}
									placeholder={t('form:input.middle_name')}
									responsiveWidth={'50%'}
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
							<Form.Row
								id={`${formOptions.id}__last_name`}
								label={t('form:input.last_name')}
							>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__last_name`}
									placeholder={t('form:input.last_name')}
									responsiveWidth={'50%'}
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
							<Form.Row
								label={t('form:input.description')}
								id={`${formOptions.id}__description`}
							>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__description`}
									placeholder={t('form:input.description')}
									responsiveWidth={'75%'}
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
