import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { ROUTES, ROUTE_SUFFIX, EMAIL_REGEX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { MembersItemProps } from '../../types/model';
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
import { getElTestAttr } from '../../utils/tests';
import getOptionsList from '../../utils/getOptionsList';
import Picker from '../../components/Picker';
import DetailFormActions from '../../components/DetailFormActions';
import inputErrorHandler from '../../utils/inputErrorHandler';
import checkInputDuplicates from '../../utils/checkInputDuplicates';

interface MembersDetailFormProps {
	allItems: MembersItemProps[];
	detailData: MembersItemProps;
	onSubmit: (data: MembersItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
	languageList: string[];
	languageDefault: string;
	onCreateCallback: () => void;
	isProcessing?: boolean;
}

const MembersDetailForm = ({
	allItems,
	detailData,
	onSubmit,
	onSubmitError,
	detailOptions,
	onCancel,
	onDelete,
	languageList = config.tmp.languageList,
	languageDefault = config.tmp.languageDefault,
	onCreateCallback,
	isProcessing,
}: MembersDetailFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);
	const formOptions: formLayoutObjectProps = {
		model: 'Members',
		id: 'MembersDetailForm',
		route: ROUTES.crm.members,
		...detailOptions,
	};
	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { isDirty, isValid, errors },
		watch,
	} = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const submitHandler = (data: MembersItemProps, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);
	const renderTitle = () => {
		let title = t('new.Members');
		if (detailData.id !== 'new') title = detailData.email;

		return title;
	};
	const renderFooter = () => (
		<DetailFormActions
			id={detailData.id}
			formId={formOptions.id}
			isValid={isValid && !email_duplicates}
			onDelete={deleteHandler}
			onCancel={cancelHandler}
			isProcessing={isProcessing}
		/>
	);

	// Model options list
	const getTypeOptions = useCallback(
		() => getOptionsList(config.options.model.Members.type, t),
		[detailData],
	);

	const watchType = watch('type');

	const email_duplicates = checkInputDuplicates(
		allItems,
		detailData.id,
		'email',
		watch('email'),
	);

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
					<ButtonCreate
						variant="outlined"
						onClick={onCreateCallback}
						dataTestId={`button.create.new.Members`}
					>
						{t(`new.Members`)}
					</ButtonCreate>
				}
			>
				<></>
			</ModuleViewHeading>
			<Form.Layout
				formName={formOptions.id}
				dataTestId={formOptions.id}
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
											dataTestId={`${formOptions.id}.select.type`}
										/>
									</Form.Row>
								)}
							/>
						</Section>
						<Section>
							<Controller
								name="active"
								control={control}
								rules={{}}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.SwitchControl
											onChange={onChange}
											onBlur={onBlur}
											checked={value}
											name={name}
											id={`${formOptions.id}__active`}
											dataTestId={`${formOptions.id}.switch.active`}
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
							<Form.Row
								errors={inputErrorHandler(
									{
										duplicate: email_duplicates,
										required: errors?.email?.type == 'required',
									},
									t,
								)}
								responsiveMessages={'75%'}
							>
								<Input.Text
									type="email"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__email`}
									label={t('form:input.email')}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.email`}
									required
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="phone"
						control={control}
						rules={{ required: watchType == 'customer' }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									type="tel"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__phone`}
									label={t('form:input.phone')}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.phone`}
									required={watchType == 'customer'}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<Controller
						name="password"
						control={control}
						rules={{ required: watchType == 'customer' }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									type="password"
									onChange={onChange}
									onBlur={onBlur}
									value={value || ''}
									name={name}
									id={`${formOptions.id}__password`}
									label={
										detailData.id == 'new'
											? t('form:input.password')
											: t('form:input.password_new')
									}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.password`}
									required={watchType == 'customer'}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<Controller
						name="nick_name"
						control={control}
						rules={{}}
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
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="first_name"
						control={control}
						rules={{ required: watchType == 'customer' }}
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
									required={watchType == 'customer'}
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
						rules={{ required: watchType == 'customer' }}
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
									required={watchType == 'customer'}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<Controller
						name="country"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__country`}
									label={t('form:input.country')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.country`}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="city"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__city`}
									label={t('form:input.city')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.city`}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="address"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__address`}
									label={t('form:input.address')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.address`}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="zip"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__zip`}
									label={t('form:input.zip')}
									responsiveWidth={'35%'}
									dataTestId={`${formOptions.id}.input.zip`}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<Controller
						name="phone_alt"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Phone value={value} onChange={onChange} multiple />
							</Form.Row>
						)}
					/>
					<Controller
						name="email_alt"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Email value={value} onChange={onChange} multiple />
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
									label={t('form:input.notes')}
									dataTestId={`${formOptions.id}.input.description`}
									multiline
									rows={3}
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

export default MembersDetailForm;
