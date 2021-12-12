import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { ROUTES, ROUTE_SUFFIX, ORDER_STATUS_NUMS } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { OrdersItemProps } from '../../types/model';
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
import OrderItemsManager from './OrderItemsManager';
import DetailFormActions from '../../components/DetailFormActions';

interface OrdersDetailFormProps {
	detailData: OrdersItemProps;
	onSubmit: (data: OrdersItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
	languageList: string[];
	languageDefault: string;
	onCreateCallback: () => void;
	isProcessing?: boolean;
}

const OrdersDetailForm = ({
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
}: OrdersDetailFormProps) => {
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);
	const is_closed = detailData.status !== 1;
	const formOptions: formLayoutObjectProps = {
		model: 'Orders',
		id: 'OrdersDetailForm',
		route: ROUTES.market.orders,
		...detailOptions,
	};
	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { isDirty, isValid },
		setValue,
	} = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const submitHandler = (data: OrdersItemProps, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);
	const renderTitle = () => {
		let title = t('new.Orders');
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
			isProcessing={isProcessing}
		/>
	);

	// Model options list
	const getStatusOptions = () => {
		let options = [];

		config.options.model.Orders.status?.map((item) => {
			options.push({
				label: t(`status.${ORDER_STATUS_NUMS[item]}`),
				value: item as unknown,
				disabled:
					(item == 0 || item == 2 || item == 3) && detailData.id == 'new',
			});
		});

		return options;
	};
	const getTypeOptions = useCallback(
		() => getOptionsList(config.options.model.Orders.type, t),
		[detailData],
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
						dataTestId={`button.create.new.Orders`}
					>
						{t(`new.Orders`)}
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
											disabled={is_closed}
										/>
									</Form.Row>
								)}
							/>
						</Section>
						<Section>
							<Controller
								name="status"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.Select
											id={`${formOptions.id}__type.status`}
											labelId={`${formOptions.id}__type.status`}
											label={t('form:input.status')}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											options={getStatusOptions()}
											dataTestId={`${formOptions.id}.select.status`}
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
					<input type="hidden" {...register('name', {})} />
					<input type="hidden" {...register('price_total', {})} />
				</div>
				<Section>
					<Controller
						name="customer_name"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__customer_name`}
									label={t('form:input.customer_name')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.customer_name`}
									required
									disabled={is_closed}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="email"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__email`}
									label={t('form:input.email')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.email`}
									required
									disabled={is_closed}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name="phone"
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Input.Text
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__phone`}
									label={t('form:input.phone')}
									responsiveWidth={'75%'}
									dataTestId={`${formOptions.id}.input.phone`}
									disabled={is_closed}
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
									disabled={is_closed}
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
									disabled={is_closed}
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
									disabled={is_closed}
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
									disabled={is_closed}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section title={t('form:section.title.details')}>
					<Controller
						name={`delivery`}
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Deliveries
									onChange={onChange}
									value={value}
									name={name}
									id={`${formOptions.id}__delivery`}
									label={`${t('form:input.delivery')}`}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.delivery`}
									disabled={is_closed}
								/>
							</Form.Row>
						)}
					/>
					<Controller
						name={`payment`}
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<Picker.Payments
									onChange={onChange}
									value={value}
									name={name}
									id={`${formOptions.id}__payment`}
									label={`${t('form:input.payment')}`}
									responsiveWidth={'50%'}
									dataTestId={`${formOptions.id}.input.payment`}
									disabled={is_closed}
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
									label={t('form:input.order_description')}
									dataTestId={`${formOptions.id}.input.description`}
									multiline
									rows={4}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section title={t('form:section.title.products')}>
					<Controller
						name={`items`}
						control={control}
						rules={{}}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Form.Row errors={[]}>
								<OrderItemsManager
									onChange={onChange}
									value={value}
									updateDisabled={is_closed}
									onPriceChange={(price) =>
										detailData.status == 1 && setValue('price_total', price)
									}
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

export default OrdersDetailForm;
