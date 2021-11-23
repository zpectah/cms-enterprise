import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { ROUTES, EMAIL_REGEX, USER_LEVEL } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { UsersItemProps } from '../../types/model';
import {
	Form,
	Button,
	ButtonCreate,
	Section,
	Input,
} from '../../components/ui';
import ModuleViewHeading from '../../components/ModuleViewHeading';
import ContentTitle from '../../components/Layout/Content/ContentTitle';
import ModuleLanguageToggle from '../../components/ModuleLanguageToggle';
import getOptionsList from '../../utils/getOptionsList';
import AvatarPicker from '../../components/AvatarPicker';

interface UsersDetailFormProps {
	detailData: UsersItemProps;
	onSubmit: (data: UsersItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
	languageList: string[];
	languageDefault: string;
	onCreateCallback: () => void;
}

const UsersDetailForm = ({
	detailData,
	onSubmit,
	onSubmitError,
	detailOptions,
	onCancel,
	onDelete,
	languageList = config.tmp.languageList,
	languageDefault = config.tmp.languageDefault,
	onCreateCallback,
}: UsersDetailFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);

	const formOptions: formLayoutObjectProps = {
		model: 'Users',
		id: 'UsersDetailForm',
		route: ROUTES.app.users,
		...detailOptions,
	};
	const { control, handleSubmit, reset, register, formState, watch } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const { isDirty, isValid } = formState;
	const passwordMinLength = 5;

	const submitHandler = (data: UsersItemProps, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);

	const renderTitle = () => {
		let title = t('new.Users');
		if (detailData.id !== 'new') title = detailData.email;

		return title;
	};
	const renderFooter = () => {
		return (
			<>
				<Button type="submit" variant="contained" disabled={!isValid}>
					{detailData.id == 'new' ? t('button.create') : t('button.update')}
				</Button>
				{detailData.id !== 'new' && (
					<Button variant="outlined" color="error" onClick={deleteHandler}>
						{t('button.delete')}
					</Button>
				)}
				<Button variant="outlined" color="secondary" onClick={cancelHandler}>
					{t('button.return')}
				</Button>
			</>
		);
	};

	const getTypeOptions = useCallback(
		() => getOptionsList(config.options.model.Users.type, t),
		[detailData],
	);
	const getGroupOptions = useCallback(
		() => getOptionsList(config.options.model.Users.group, t),
		[detailData],
	);
	const getLevelOptions = useCallback(() => {
		let options = [];

		config.options.model.Users.level.map((type) => {
			options.push({
				label: t(`types:${type}`),
				value: USER_LEVEL[type].id,
			});
		});

		return options;
	}, [detailData]);

	useEffect(() => reset(detailData), [detailData, reset]); // Important useEffect, must be for reloading form model !!!

	// Passwords match state & messages
	const watchPasswordMatch = watch(['password', 'password_confirm']);
	const isPasswordsMatching = useMemo(() => {
		if (detailData.id == 'new') {
			const p1 = watchPasswordMatch[0];
			const p2 = watchPasswordMatch[1];

			if (p1 == p2) {
				return {
					match: true,
					p1: p1,
					p2: p2,
				};
			} else {
				return {
					match: false,
					p1: p1,
					p2: p2,
				};
			}
		} else {
			return {
				match: true,
				p1: null,
				p2: null,
			};
		}
	}, [watchPasswordMatch]);

	return (
		<>
			<ContentTitle
				title={renderTitle()}
				listPath={formOptions.route.path}
				clickCallback={cancelHandler}
			/>
			<ModuleViewHeading
				tertiaryChildren={
					<ButtonCreate
						variant="outlined"
						onClick={onCreateCallback}
						dataAppId={`button.create.new.Users`}
					>
						{t(`new.Users`)}
					</ButtonCreate>
				}
			>
				<></>
			</ModuleViewHeading>
			<Form.Layout
				formName={formOptions.id}
				dataAppId={formOptions.id}
				onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
				footerChildren={renderFooter()}
				sidebarChildren={
					<>
						{/*  ============ Form sidebar ============ */}
						<Section>
							<Controller
								name="type"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.Select
											id={`${formOptions.id}__type.label`}
											labelId={`${formOptions.id}__type.label`}
											label={t('form:input.type')}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											options={getTypeOptions()}
											dataAppId={`${formOptions.id}.select.type`}
										/>
									</Form.Row>
								)}
							/>
							<Controller
								name="user_level"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.Select
											id={`${formOptions.id}__level.label`}
											labelId={`${formOptions.id}__level.label`}
											label={t('form:input.level')}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											options={getLevelOptions()}
											dataAppId={`${formOptions.id}.select.level`}
										/>
									</Form.Row>
								)}
							/>
							<Controller
								name="user_group"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.Select
											id={`${formOptions.id}__group.label`}
											labelId={`${formOptions.id}__group.label`}
											label={t('form:input.group')}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											options={getGroupOptions()}
											dataAppId={`${formOptions.id}.select.group`}
										/>
									</Form.Row>
								)}
							/>
							<Controller
								name="active"
								control={control}
								rules={{}}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.Switch
											onChange={onChange}
											onBlur={onBlur}
											checked={value}
											name={name}
											id={`${formOptions.id}__active`}
											dataAppId={`${formOptions.id}.switch.active`}
											label={t('form:input.active')}
										/>
									</Form.Row>
								)}
							/>
						</Section>
						{/*  ============ \\ Form sidebar ============ */}
					</>
				}
			>
				{/*  ============ Main form body ============ */}
				<div>
					<input type="hidden" {...register('id', { required: true })} />
				</div>
				<Section>
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
									responsiveWidth={'75%'}
									dataAppId={`${formOptions.id}.input.email`}
									disabled={detailData.id !== 'new'}
									required
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<Controller
						name="password"
						control={control}
						rules={{ required: detailData.id == 'new' }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__password`}
									label={
										detailData.id == 'new'
											? t('form:input.password')
											: t('form:input.password_new')
									}
									responsiveWidth={'75%'}
									dataAppId={`${formOptions.id}.input.password`}
									required={detailData.id == 'new'}
								/>
							</Form.Row>
						)}
					/>
					{detailData.id == 'new' && (
						<Controller
							name="password_confirm"
							control={control}
							rules={{ required: detailData.id == 'new' }}
							render={({ field: { onChange, onBlur, value, ref, name } }) => (
								<Form.Row
									errors={
										!isPasswordsMatching.match &&
										isPasswordsMatching.p1.length >= passwordMinLength &&
										isPasswordsMatching.p2.length >= passwordMinLength
											? ['Password wont match!']
											: []
									}
									success={
										isPasswordsMatching.match &&
										isPasswordsMatching.p1.length >= passwordMinLength &&
										isPasswordsMatching.p2.length >= passwordMinLength
											? ['Password match']
											: []
									}
									responsiveMessages={'75%'}
								>
									<Input.Text
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										name={name}
										id={`${formOptions.id}__password_confirm`}
										label={t('form:input.password_confirm')}
										responsiveWidth={'75%'}
										dataAppId={`${formOptions.id}.input.password_confirm`}
										required={detailData.id == 'new'}
									/>
								</Form.Row>
							)}
						/>
					)}
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
									dataAppId={`${formOptions.id}.input.nick_name`}
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
									dataAppId={`${formOptions.id}.input.first_name`}
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
									dataAppId={`${formOptions.id}.input.middle_name`}
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
									dataAppId={`${formOptions.id}.input.last_name`}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<AvatarPicker />
				</Section>
				{/*  ============ \\ Main form body ============ */}
			</Form.Layout>
		</>
	);
};

export default UsersDetailForm;
