import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';

import config from '../../config';
import { ROUTES, ROUTE_SUFFIX, DEFAULT_UNITS } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { ProductsItemProps } from '../../types/model';
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
import ProductsOptionsManager from './ProductsOptionsManager';

interface ProductsDetailFormProps {
	detailData: ProductsItemProps;
	onSubmit: (data: ProductsItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
	languageList: string[];
	languageDefault: string;
	onCreateCallback: () => void;
}

const ProductsDetailForm = ({
	detailData,
	onSubmit,
	onSubmitError,
	detailOptions,
	onCancel,
	onDelete,
	languageList = config.tmp.languageList,
	languageDefault = config.tmp.languageDefault,
	onCreateCallback,
}: ProductsDetailFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);

	const formOptions: formLayoutObjectProps = {
		model: 'Products',
		id: 'ProductsDetailForm',
		route: ROUTES.market.products,
		...detailOptions,
	};
	const { control, handleSubmit, reset, register, formState, watch } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const { isDirty, isValid } = formState;

	const submitHandler = (data: ProductsItemProps, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);

	const renderTitle = () => {
		let title = t('new.Products');
		if (detailData.id !== 'new') title = detailData.name;

		return title;
	};
	const renderFooter = () => {
		return (
			<>
				<Button
					type="submit"
					variant="contained"
					disabled={!isValid}
					dataTestId={`${formOptions.id}.button.submit`}
				>
					{detailData.id == 'new' ? t('button.create') : t('button.update')}
				</Button>
				{detailData.id !== 'new' && (
					<Button
						variant="outlined"
						color="error"
						onClick={deleteHandler}
						dataTestId={`${formOptions.id}.button.delete`}
					>
						{t('button.delete')}
					</Button>
				)}
				<Button
					variant="outlined"
					color="secondary"
					onClick={cancelHandler}
					dataTestId={`${formOptions.id}.button.return`}
				>
					{t('button.return')}
				</Button>
			</>
		);
	};

	// Model options list
	const getTypeOptions = useCallback(
		() => getOptionsList(config.options.model.Products.type, t),
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
						dataTestId={`button.create.new.Products`}
					>
						{t(`new.Products`)}
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
								name="rating"
								control={control}
								rules={{}}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.Rating
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											id={`${formOptions.id}__rating`}
											label={t('form:input.rating')}
											dataTestId={`${formOptions.id}.input.rating`}
											readOnly
											disabled={detailData.id == 'new'}
										/>
									</Form.Row>
								)}
							/>
						</Section>
						<Section>
							<Controller
								name="is_new"
								control={control}
								rules={{}}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.SwitchControl
											onChange={onChange}
											onBlur={onBlur}
											checked={value}
											name={name}
											id={`${formOptions.id}__is_new`}
											dataTestId={`${formOptions.id}.switch.is_new`}
											label={t('form:input.is_new')}
										/>
									</Form.Row>
								)}
							/>
							<Controller
								name="is_used"
								control={control}
								rules={{}}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.SwitchControl
											onChange={onChange}
											onBlur={onBlur}
											checked={value}
											name={name}
											id={`${formOptions.id}__is_used`}
											dataTestId={`${formOptions.id}.switch.is_used`}
											label={t('form:input.is_used')}
										/>
									</Form.Row>
								)}
							/>
							<Controller
								name="is_unboxed"
								control={control}
								rules={{}}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.SwitchControl
											onChange={onChange}
											onBlur={onBlur}
											checked={value}
											name={name}
											id={`${formOptions.id}__is_unboxed`}
											dataTestId={`${formOptions.id}.switch.is_unboxed`}
											label={t('form:input.is_unboxed')}
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
					<input type="hidden" {...register('options', {})} />
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
									defaultValue={detailData.lang[lng].title}
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
												id={`${formOptions.id}__${lng}__description`}
												label={`${lng.toUpperCase()} ${t(
													'form:input.description',
												)}`}
												dataTestId={`${formOptions.id}.input.${lng}.description`}
												required
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
				<Section>
					<Controller
						name={`categories`}
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Categories
									onChange={onChange}
									value={value}
									name={name}
									id={`${formOptions.id}__categories`}
									label={`${t('form:input.categories')}`}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.categories`}
									multiple
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name={`tags`}
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Tags
									onChange={onChange}
									value={value}
									name={name}
									id={`${formOptions.id}__tags`}
									label={`${t('form:input.tags')}`}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.tags`}
									multiple
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>
					<Controller
						name={`related`}
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Products
									onChange={onChange}
									value={value}
									name={name}
									id={`${formOptions.id}__related`}
									label={`${t('form:input.related_products')}`}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.related`}
									multiple
									ignored={[detailData.id]}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name={`producers`}
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Producers
									onChange={onChange}
									value={value}
									name={name}
									id={`${formOptions.id}__producers`}
									label={`${t('form:input.producers')}`}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.producers`}
									multiple
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name={`distributors`}
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Distributors
									onChange={onChange}
									value={value}
									name={name}
									id={`${formOptions.id}__distributors`}
									label={`${t('form:input.distributors')}`}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.distributors`}
									multiple
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name={`manager`}
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Users
									onChange={onChange}
									value={value}
									name={name}
									id={`${formOptions.id}__manager`}
									label={`${t('form:input.product_manager')}`}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.manager`}
									ignoreRedactor
								/>
							</Form.Row>
						)}
					/>
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
										inputProps: { min: 0 },
										startAdornment: (
											<InputAdornment position="start">
												{t(`units.${DEFAULT_UNITS.price}`)}
											</InputAdornment>
										),
									}}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="item_discount"
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
									id={`${formOptions.id}__item_discount`}
									label={t('form:input.discount')}
									responsiveWidth={'35%'}
									dataTestId={`${formOptions.id}.input.item_discount`}
									required
									InputProps={{
										inputProps: { min: 0 },
										startAdornment: (
											<InputAdornment position="start">%</InputAdornment>
										),
									}}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="item_weight"
						control={control}
						rules={{ required: watchType == 'default' }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									type="number"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__item_weight`}
									label={t('form:input.weight')}
									responsiveWidth={'35%'}
									dataTestId={`${formOptions.id}.input.item_weight`}
									required={watchType == 'default'}
									InputProps={{
										inputProps: { min: 0 },
										startAdornment: (
											<InputAdornment position="start">
												{t(`units.${DEFAULT_UNITS.weight}`)}
											</InputAdornment>
										),
									}}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="item_depth"
						control={control}
						rules={{ required: watchType == 'default' }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									type="number"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__item_depth`}
									label={t('form:input.depth')}
									responsiveWidth={'35%'}
									dataTestId={`${formOptions.id}.input.item_depth`}
									required={watchType == 'default'}
									InputProps={{
										inputProps: { min: 0 },
										startAdornment: (
											<InputAdornment position="start">
												{t(`units.${DEFAULT_UNITS.length}`)}
											</InputAdornment>
										),
									}}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="item_height"
						control={control}
						rules={{ required: watchType == 'default' }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									type="number"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__item_height`}
									label={t('form:input.height')}
									responsiveWidth={'35%'}
									dataTestId={`${formOptions.id}.input.item_height`}
									required={watchType == 'default'}
									InputProps={{
										inputProps: { min: 0 },
										startAdornment: (
											<InputAdornment position="start">
												{t(`units.${DEFAULT_UNITS.length}`)}
											</InputAdornment>
										),
									}}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="item_width"
						control={control}
						rules={{ required: watchType == 'default' }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									type="number"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__item_width`}
									label={t('form:input.width')}
									responsiveWidth={'35%'}
									dataTestId={`${formOptions.id}.input.item_width`}
									required={watchType == 'default'}
									InputProps={{
										inputProps: { min: 0 },
										startAdornment: (
											<InputAdornment position="start">
												{t(`units.${DEFAULT_UNITS.length}`)}
											</InputAdornment>
										),
									}}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				{/*
				<Section title={'Products options'}>
					<Controller
						name="options"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<ProductsOptionsManager value={value} onChange={onChange} />
							</Form.Row>
						)}
					/>
				</Section>
				*/}
				<Section title={t('form:section.title.mediaAndAttachments')}>
					<Controller
						name="gallery"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Uploads
									value={value}
									onChange={onChange}
									multiple
									dataTestId={`${formOptions.id}.input.gallery`}
									label={t('form:input.gallery')}
									onlyImages
								/>
							</Form.Row>
						)}
					/>
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

export default ProductsDetailForm;
