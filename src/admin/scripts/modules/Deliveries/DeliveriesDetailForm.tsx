import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { DeliveriesItemProps } from '../../types/model';
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
import DetailFormActions from '../../components/DetailFormActions';
import inputErrorHandler from '../../utils/inputErrorHandler';
import checkInputDuplicates from '../../utils/checkInputDuplicates';
import Picker from '../../components/Picker';

interface DeliveriesDetailFormProps {
	allItems: DeliveriesItemProps[];
	detailData: DeliveriesItemProps;
	onSubmit: (data: DeliveriesItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
	languageList: string[];
	languageDefault: string;
	onCreateCallback: () => void;
	isProcessing?: boolean;
}

const DeliveriesDetailForm = ({
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
}: DeliveriesDetailFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);
	const defaultUnits = config.project.units;
	const formOptions: formLayoutObjectProps = {
		model: 'Deliveries',
		id: 'DeliveriesDetailForm',
		route: ROUTES.market.deliveries,
		...detailOptions,
	};
	const {
		control,
		handleSubmit,
		reset,
		register,
		watch,
		formState: { isDirty, isValid, errors },
	} = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const submitHandler = (data: DeliveriesItemProps, e: any) =>
		onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);
	const renderTitle = () => {
		let title = t('new.Deliveries');
		if (detailData.id !== 'new') title = detailData.name;

		return title;
	};
	const renderFooter = () => (
		<DetailFormActions
			id={detailData.id}
			formId={formOptions.id}
			isValid={isValid && !name_duplicates}
			onDelete={deleteHandler}
			onCancel={cancelHandler}
			isProcessing={isProcessing}
		/>
	);

	// Model options list
	const getTypeOptions = useCallback(
		() => getOptionsList(config.options.model.Deliveries.type, t),
		[detailData],
	);

	const name_duplicates = checkInputDuplicates(
		allItems,
		detailData.id,
		'name',
		watch('name'),
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
						dataTestId={`button.create.new.Deliveries`}
					>
						{t(`new.Deliveries`)}
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
							<Form.Row
								errors={inputErrorHandler(
									{
										duplicate: name_duplicates,
										required: errors?.name?.type == 'required',
									},
									t,
								)}
								responsiveMessages={'75%'}
							>
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
					<Controller
						name={`store_id`}
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Stores
									onChange={onChange}
									value={value}
									name={name}
									id={`${formOptions.id}__store_id`}
									label={`${t('form:input.store')}`}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.store_id`}
									disabled={!(watchType == 'store')}
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
									rules={{}}
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
											/>
										</Form.Row>
									)}
								/>
							</Section>
						);
					})}
					{/*  ============ \\ Language part section ============ */}
				</Section>
				<Section title={t('form:section.title.details')}>
					<Controller
						name="item_price"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									type="number"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__item_price`}
									label={t('form:input.price')}
									responsiveWidth={'35%'}
									dataTestId={`${formOptions.id}.input.item_price`}
									required
									InputProps={{
										inputProps: { min: 0, step: 0.01 },
										startAdornment: (
											<InputAdornment position="start">
												{t(`units.${defaultUnits.price}`)}
											</InputAdornment>
										),
									}}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="item_limit_weight"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									type="number"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__item_limit_weight`}
									label={t('form:input.weight_limit')}
									responsiveWidth={'35%'}
									dataTestId={`${formOptions.id}.input.item_limit_weight`}
									required
									InputProps={{
										inputProps: { min: 0, step: 0.01 },
										startAdornment: (
											<InputAdornment position="start">
												{t(`units.${defaultUnits.weight}`)}
											</InputAdornment>
										),
									}}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="item_limit_units"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									type="number"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__item_limit_units`}
									label={t('form:input.unit_limit')}
									responsiveWidth={'35%'}
									dataTestId={`${formOptions.id}.input.item_limit_units`}
									required
									InputProps={{
										inputProps: { min: 0 },
										startAdornment: (
											<InputAdornment position="start">
												{t(`units.${defaultUnits.units}`)}
											</InputAdornment>
										),
									}}
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

export default DeliveriesDetailForm;
