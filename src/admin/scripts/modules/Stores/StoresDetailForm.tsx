import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { StoresItemProps } from '../../types/model';
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

interface StoresDetailFormProps {
	detailData: StoresItemProps;
	onSubmit: (data: StoresItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
	languageList: string[];
	languageDefault: string;
	onCreateCallback: () => void;
}

const StoresDetailForm = ({
	detailData,
	onSubmit,
	onSubmitError,
	detailOptions,
	onCancel,
	onDelete,
	languageList = config.tmp.languageList,
	languageDefault = config.tmp.languageDefault,
	onCreateCallback,
}: StoresDetailFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);
	const formOptions: formLayoutObjectProps = {
		model: 'Stores',
		id: 'StoresDetailForm',
		route: ROUTES.market.stores,
		...detailOptions,
	};
	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { isDirty, isValid },
		watch,
	} = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const submitHandler = (data: StoresItemProps, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);
	const renderTitle = () => {
		let title = t('new.Stores');
		if (detailData.id !== 'new') title = detailData.name;

		return title;
	};
	const renderFooter = () => (
		<DetailFormActions
			id={detailData.id}
			formId={formOptions.id}
			isValid={isValid}
			onDelete={deleteHandler}
			onCancel={cancelHandler}
		/>
	);

	// Model options list
	const getTypeOptions = useCallback(
		() => getOptionsList(config.options.model.Stores.type, t),
		[detailData],
	);

	const watchType = watch('type');

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
						dataTestId={`button.create.new.Stores`}
					>
						{t(`new.Stores`)}
					</ButtonCreate>
				}
			>
				<ModuleLanguageToggle
					language={lang}
					languageList={languageList}
					onChange={(lng) => setLang(lng)}
					style={{ marginRight: '.75rem' }}
				/>
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
						name="name"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__name`}
									label={t('form:input.name')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.name`}
									required
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section noSpacing>
					{/*  ============ Language part section ============ */}
					{languageList.map((lng) => {
						return (
							<Section key={lng} visible={lang == lng}>
								<Controller
									name={`lang.${lng}.title`}
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row errors={[]}>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__${lng}__title`}
												label={`${lng.toUpperCase()} ${t('form:input.title')}`}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.${lng}.title`}
												required
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name={`lang.${lng}.description`}
									control={control}
									rules={{
										required: watchType == 'branch' || watchType == 'virtual',
									}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row errors={[]}>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__${lng}__description`}
												label={`${lng.toUpperCase()} ${t(
													'form:input.description',
												)}`}
												dataTestId={`${formOptions.id}.input.${lng}.description`}
												multiline
												rows={5}
												required={
													watchType == 'branch' || watchType == 'virtual'
												}
											/>
										</Form.Row>
									)}
								/>
							</Section>
						);
					})}
					{/*  ============ \\ Language part section ============ */}
				</Section>
				<Section>
					<Controller
						name="country"
						control={control}
						rules={{ required: watchType == 'branch' }}
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
									required={watchType == 'branch'}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="city"
						control={control}
						rules={{ required: watchType == 'branch' }}
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
									required={watchType == 'branch'}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="address"
						control={control}
						rules={{ required: watchType == 'branch' }}
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
									required={watchType == 'branch'}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="zip"
						control={control}
						rules={{ required: watchType == 'branch' }}
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
									required={watchType == 'branch'}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<Controller
						name="phone"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Phone value={value} onChange={onChange} multiple />
							</Form.Row>
						)}
					/>
					<Controller
						name="email"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Email value={value} onChange={onChange} multiple />
							</Form.Row>
						)}
					/>
				</Section>
				<Section title={t('form:section.title.mediaAndAttachments')}>
					<Controller
						name="attachments"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Uploads
									value={value}
									onChange={onChange}
									multiple
									dataTestId={`${formOptions.id}.input.attachments`}
									label={t('form:input.attachments')}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="img_main"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Uploads
									value={value}
									onChange={onChange}
									filenameAsValue
									onlyImages
									dataTestId={`${formOptions.id}.input.img_main`}
									label={t('form:input.img_main')}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="img_thumbnail"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Uploads
									value={value}
									onChange={onChange}
									filenameAsValue
									onlyImages
									dataTestId={`${formOptions.id}.input.img_thumbnail`}
									label={t('form:input.img_thumbnail')}
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

export default StoresDetailForm;
