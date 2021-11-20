import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { UsersItemProps } from '../../types/model';
import { Form, Button, Section, Input } from '../../components/ui';
import ModuleViewHeading from '../../components/ModuleViewHeading';
import ContentTitle from '../../components/Layout/Content/ContentTitle';
import ModuleLanguageToggle from '../../components/ModuleLanguageToggle';
import { getElTestAttr } from '../../utils/tests';

interface UsersDetailFormProps {
	detailData: UsersItemProps;
	onSubmit: (data: UsersItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
	languageList: string[];
	languageDefault: string;
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
}: UsersDetailFormProps) => {
	const history = useHistory();
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);

	const formOptions: formLayoutObjectProps = {
		model: 'Users',
		id: 'UsersDetailForm',
		route: ROUTES.app.users,
		...detailOptions,
	};
	const { control, handleSubmit, reset, register, formState } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const { isDirty, isValid } = formState;

	const submitHandler = (data: UsersItemProps, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);
	const buttonCreateCallback = () =>
		history.push(`${formOptions.route.path}${ROUTE_SUFFIX.detail}/new`);

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

	useEffect(() => reset(detailData), [detailData, reset]); // Important useEffect, must be for reloading form model !!!

	return (
		<>
			<ContentTitle
				title={renderTitle()}
				listPath={formOptions.route.path}
				clickCallback={cancelHandler}
			/>
			<ModuleViewHeading
				tertiaryChildren={
					<>
						<Button
							variant="outlined"
							color="success"
							onClick={buttonCreateCallback}
							startIcon={<AddIcon />}
							dataAppId={`button.create.new.Users`}
						>
							{t(`new.Users`)}
						</Button>
					</>
				}
			>
				<>
					<ModuleLanguageToggle
						language={lang}
						languageList={languageList}
						onChange={(lng) => setLang(lng)}
						style={{ marginRight: '.75rem' }}
					/>
				</>
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
											style={{ width: '100%' }}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											options={[
												{
													label: 'Default',
													value: 'default',
												},
												{
													label: 'Other',
													value: 'other',
												},
											]}
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
											style={{ width: '100%' }}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											options={[
												{
													label: 'Default',
													value: '0',
												},
												{
													label: 'Other',
													value: '2',
												},
											]}
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
											style={{ width: '100%' }}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											options={[
												{
													label: 'Default',
													value: 'default',
												},
												{
													label: 'Other',
													value: 'other',
												},
											]}
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
						rules={{ required: true }}
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
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__password`}
									label={t('form:input.password')}
									responsiveWidth={'50%'}
									dataAppId={`${formOptions.id}.input.password`}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="password_confirm"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__password_confirm`}
									label={t('form:input.password_confirm')}
									responsiveWidth={'50%'}
									dataAppId={`${formOptions.id}.input.password_confirm`}
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
									dataAppId={`${formOptions.id}.input.nick_name`}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="first_name"
						control={control}
						rules={{ required: true }}
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
						rules={{ required: true }}
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
						rules={{ required: true }}
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
				{/*  ============ \\ Main form body ============ */}
			</Form.Layout>
		</>
	);
};

export default UsersDetailForm;
