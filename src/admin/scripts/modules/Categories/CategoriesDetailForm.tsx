import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { CategoriesItemProps } from '../../types/model';
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
import Picker from '../../components/Picker';
import { getElTestAttr } from '../../utils/tests';
import getOptionsList from '../../utils/getOptionsList';
import DetailFormActions from '../../components/DetailFormActions';
import CommentsManager from '../../components/CommentsManager';
import inputErrorHandler from '../../utils/inputErrorHandler';
import checkInputDuplicates from '../../utils/checkInputDuplicates';

interface CategoriesDetailFormProps {
	allItems: CategoriesItemProps[];
	detailData: CategoriesItemProps;
	onSubmit: (data: CategoriesItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
	languageList: string[];
	languageDefault: string;
	onCreateCallback: () => void;
	isProcessing?: boolean;
}

const CategoriesDetailForm = ({
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
}: CategoriesDetailFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);
	const formOptions: formLayoutObjectProps = {
		model: 'Categories',
		id: 'CategoriesDetailForm',
		route: ROUTES.app.categories,
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
	const submitHandler = (data: CategoriesItemProps, e: any) =>
		onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);
	const renderTitle = () => {
		let title = t('new.Categories');
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
		() => getOptionsList(config.options.model.Categories.type, t),
		[detailData],
	);

	const name_duplicates = checkInputDuplicates(
		allItems,
		detailData.id,
		'name',
		watch('name'),
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
						dataTestId={`button.create.new.Categories`}
					>
						{t(`new.Categories`)}
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
				outerChildren={
					<CommentsManager assigned="category" assignedId={detailData.id} />
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
				</Section>
				<Section>
					<Controller
						name="parent"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Categories
									onChange={onChange}
									value={value}
									name={name}
									id={`${formOptions.id}__parent`}
									label={t('form:input.parent')}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.parent`}
									ignored={[detailData.id]}
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
				<Section title={t('form:section.title.mediaAndAttachments')}>
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

export default CategoriesDetailForm;
