import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { PostsItemProps } from '../../types/model';
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

interface PostsDetailFormProps {
	detailData: PostsItemProps;
	onSubmit: (data: PostsItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
	languageList: string[];
	languageDefault: string;
	onCreateCallback: () => void;
	shouldApprove?: boolean;
}

const PostsDetailForm = ({
	detailData,
	onSubmit,
	onSubmitError,
	detailOptions,
	onCancel,
	onDelete,
	languageList = config.tmp.languageList,
	languageDefault = config.tmp.languageDefault,
	onCreateCallback,
	shouldApprove,
}: PostsDetailFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);

	const formOptions: formLayoutObjectProps = {
		model: 'Posts',
		id: 'PostsDetailForm',
		route: ROUTES.app.posts,
		...detailOptions,
	};
	const { control, handleSubmit, reset, register, formState, watch } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const { isDirty, isValid } = formState;

	const submitHandler = (data: PostsItemProps, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);

	const renderTitle = () => {
		let title = t('new.Posts');
		if (detailData.id !== 'new') title = detailData.name;

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

	// Model options list
	const getTypeOptions = useCallback(
		() => getOptionsList(config.options.model.Posts.type, t),
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
						dataTestId={`button.create.new.Posts`}
					>
						{t(`new.Posts`)}
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
							<Controller
								name="approved"
								control={control}
								rules={{}}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.SwitchControl
											onChange={onChange}
											onBlur={onBlur}
											checked={value}
											name={name}
											id={`${formOptions.id}__approved`}
											dataTestId={`${formOptions.id}.switch.approved`}
											label={t('form:input.approved')}
											disabled={shouldApprove}
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
												label={`${t('form:input.title')} (${lng})`}
												// responsiveWidth={'75%'}
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
												label={`${t('form:input.description')} (${lng})`}
												// responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.${lng}.description`}
												required
												multiline
												rows={5}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name={`lang.${lng}.content`}
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
												id={`${formOptions.id}__${lng}__content`}
												label={`${t('form:input.content')} (${lng})`}
												// responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.${lng}.content`}
												multiline
												rows={8}
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
				{watchType == 'event' ? (
					<Section>
						<Controller
							name={`event_start`}
							control={control}
							rules={{}}
							render={({ field: { onChange, onBlur, value, ref, name } }) => (
								<Form.Row errors={[]}>
									<Input.DateTime
										onChange={onChange}
										value={value}
										label={`${t('form:input.event_start')}`}
										renderInput={(props) => (
											<Input.Text
												name={name}
												id={`${formOptions.id}__event_start`}
												responsiveWidth={'50%'}
												dataTestId={`${formOptions.id}.input.event_start`}
												{...props}
											/>
										)}
									/>
								</Form.Row>
							)}
						/>
						<Controller
							name={`event_end`}
							control={control}
							rules={{}}
							render={({ field: { onChange, onBlur, value, ref, name } }) => (
								<Form.Row errors={[]}>
									<Input.DateTime
										onChange={onChange}
										value={value}
										label={`${t('form:input.event_end')}`}
										renderInput={(props) => (
											<Input.Text
												name={name}
												id={`${formOptions.id}__event_end`}
												responsiveWidth={'50%'}
												dataTestId={`${formOptions.id}.input.event_end`}
												{...props}
											/>
										)}
									/>
								</Form.Row>
							)}
						/>
						<Controller
							name="event_location"
							control={control}
							rules={{ required: true }}
							render={({ field: { onChange, onBlur, value, ref, name } }) => (
								<Form.Row errors={[]}>
									<Input.Text
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										name={name}
										id={`${formOptions.id}__event_location`}
										label={t('form:input.event_location')}
										responsiveWidth={'75%'}
										dataTestId={`${formOptions.id}.input.event_location`}
										required
									/>
								</Form.Row>
							)}
						/>
						<Controller
							name="event_address"
							control={control}
							rules={{ required: true }}
							render={({ field: { onChange, onBlur, value, ref, name } }) => (
								<Form.Row errors={[]}>
									<Input.Text
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										name={name}
										id={`${formOptions.id}__event_address`}
										label={t('form:input.event_address')}
										responsiveWidth={'75%'}
										dataTestId={`${formOptions.id}.input.event_address`}
										required
									/>
								</Form.Row>
							)}
						/>
						<Controller
							name="event_country"
							control={control}
							rules={{ required: true }}
							render={({ field: { onChange, onBlur, value, ref, name } }) => (
								<Form.Row errors={[]}>
									<Input.Text
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										name={name}
										id={`${formOptions.id}__event_country`}
										label={t('form:input.event_country')}
										responsiveWidth={'75%'}
										dataTestId={`${formOptions.id}.input.event_country`}
										required
									/>
								</Form.Row>
							)}
						/>
						<Controller
							name="event_city"
							control={control}
							rules={{ required: true }}
							render={({ field: { onChange, onBlur, value, ref, name } }) => (
								<Form.Row errors={[]}>
									<Input.Text
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										name={name}
										id={`${formOptions.id}__event_city`}
										label={t('form:input.event_city')}
										responsiveWidth={'75%'}
										dataTestId={`${formOptions.id}.input.event_city`}
										required
									/>
								</Form.Row>
							)}
						/>
						<Controller
							name="event_zip"
							control={control}
							rules={{ required: true }}
							render={({ field: { onChange, onBlur, value, ref, name } }) => (
								<Form.Row errors={[]}>
									<Input.Text
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										name={name}
										id={`${formOptions.id}__event_zip`}
										label={t('form:input.event_zip')}
										responsiveWidth={'75%'}
										dataTestId={`${formOptions.id}.input.event_zip`}
										required
									/>
								</Form.Row>
							)}
						/>
					</Section>
				) : (
					<>
						<input type="hidden" {...register('event_start', {})} />
						<input type="hidden" {...register('event_end', {})} />
						<input type="hidden" {...register('event_location', {})} />
						<input type="hidden" {...register('event_address', {})} />
						<input type="hidden" {...register('event_country', {})} />
						<input type="hidden" {...register('event_city', {})} />
						<input type="hidden" {...register('event_zip', {})} />
					</>
				)}
				{watchType == 'media' ? (
					<>...media...</>
				) : (
					<input type="hidden" {...register('media', {})} />
				)}
				<Section>
					<Picker.Uploads value={''} onChange={() => {}} />
					<input type="text" {...register('attachments', {})} />
					<Picker.Uploads value={''} onChange={() => {}} />
					<input type="text" {...register('img_thumbnail', {})} />
					<Picker.Uploads value={''} onChange={() => {}} />
					<input type="text" {...register('img_main', {})} />
				</Section>
				<Section>
					<Controller
						name={`published`}
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.DateTime
									onChange={onChange}
									value={value}
									label={`${t('form:input.published')}`}
									renderInput={(props) => (
										<Input.Text
											name={name}
											id={`${formOptions.id}__published`}
											responsiveWidth={'50%'}
											dataTestId={`${formOptions.id}.input.published`}
											required
											{...props}
										/>
									)}
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

export default PostsDetailForm;
