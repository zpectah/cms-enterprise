import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';

import config from '../../../config';
import { MenuItemItemProps } from '../../../types/model';
import { selectedArrayProps } from '../../../types/table';
import { formLayoutObjectProps } from '../../../types/app';
import { ROUTES } from '../../../constants';
import { Button, Form, Input, Section } from '../../../components/ui';
import Picker from '../../../components/Picker';
import getOptionsList from '../../../utils/getOptionsList';

interface MenuItemsDetailFormProps {
	menuId: string | number;
	detailData: MenuItemItemProps;
	onSubmit: (data: MenuItemItemProps) => void;
	onSubmitError?: (error: any, e: any) => void;
	onToggle: (ids: selectedArrayProps) => void;
	onDelete: (ids: selectedArrayProps) => void;
	onCancel: () => void;
	languageList: string[];
	language: string;
}

const MenuItemsDetailForm = ({
	menuId,
	detailData,
	onSubmit,
	onSubmitError,
	onToggle,
	onDelete,
	onCancel,
	languageList,
	language,
}: MenuItemsDetailFormProps) => {
	const { t } = useTranslation(['common', 'form', 'messages']);

	const formOptions: formLayoutObjectProps = {
		model: 'MenuItems',
		id: 'MenuItemsDetailForm',
		route: ROUTES.app.menu,
	};
	const { control, handleSubmit, reset, register, formState, watch } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
			menu: menuId,
		},
	});
	const { isDirty, isValid } = formState;

	const submitHandler = (data: MenuItemItemProps) => onSubmit(data);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const toggleHandler = (ids: selectedArrayProps) => onToggle(ids);
	const deleteHandler = () => onDelete([detailData.id]);

	// Model options list
	const getTypeOptions = useCallback(
		() => getOptionsList(config.options.model.MenuItems.type, t),
		[detailData],
	);

	const watchType = watch('type');

	return (
		<Form.Base
			name={formOptions.id}
			dataTestId={formOptions.id}
			onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
		>
			{/*  ============ Main form body ============ */}
			<div>
				<input type="hidden" {...register('id', { required: true })} />
				<input type="hidden" {...register('menu', { required: true })} />
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
								dataTestId={`${formOptions.id}.input.name`}
								required
							/>
						</Form.Row>
					)}
				/>
				<Controller
					name="type"
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row errors={[]}>
							<Input.Select
								id={`${formOptions.id}__type.type`}
								labelId={`${formOptions.id}__type.type`}
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
				{watchType == 'page' ? (
					<>
						<Controller
							name="page"
							control={control}
							rules={{ required: watchType == 'page' }}
							render={({ field: { onChange, onBlur, value, ref, name } }) => (
								<Form.Row errors={[]}>
									<Picker.Pages
										onChange={onChange}
										value={value}
										name={name}
										id={`${formOptions.id}__page`}
										label={`${t('form:input.page')}`}
										dataTestId={`${formOptions.id}.input.page`}
										required
									/>
								</Form.Row>
							)}
						/>
						<input type="hidden" {...register('path_url', {})} />
					</>
				) : (
					<>
						<Controller
							name="path_url"
							control={control}
							rules={{ required: watchType == 'external' }}
							render={({ field: { onChange, onBlur, value, ref, name } }) => (
								<Form.Row errors={[]}>
									<Input.Text
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										name={name}
										id={`${formOptions.id}__path_url`}
										label={t('form:input.path_url')}
										dataTestId={`${formOptions.id}.input.path_url`}
										required
									/>
								</Form.Row>
							)}
						/>
						<input type="hidden" {...register('page', {})} />
					</>
				)}
			</Section>
			<Section>
				<Controller
					name="parent"
					control={control}
					rules={{}}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Form.Row errors={[]}>
							<Picker.MenuItems
								onChange={onChange}
								value={value}
								name={name}
								id={`${formOptions.id}__parent`}
								label={`${t('form:input.parent')}`}
								dataTestId={`${formOptions.id}.input.parent`}
								ignored={[detailData.id]}
							/>
						</Form.Row>
					)}
				/>
				<Controller
					name="item_order"
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
								id={`${formOptions.id}__order`}
								label={t('form:input.order')}
								responsiveWidth={'50%'}
								dataTestId={`${formOptions.id}.input.order`}
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
						<Section key={lng} visible={language == lng}>
							<Controller
								name={`lang.${lng}.label`}
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<Input.Text
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											name={name}
											id={`${formOptions.id}__${lng}__label`}
											label={`${t('form:input.label')} (${lng})`}
											dataTestId={`${formOptions.id}.input.${lng}.label`}
											required
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
			<Stack
				spacing={2}
				direction="row"
				justifyContent="center"
				style={{ paddingTop: '1rem' }}
			>
				<Button type="submit" variant="contained" disabled={!isValid}>
					{detailData.id == 'new' ? t('button.create') : t('button.update')}
				</Button>
				{detailData.id !== 'new' && (
					<Button variant="outlined" color="error" onClick={deleteHandler}>
						{t('button.delete')}
					</Button>
				)}
				<Button color="secondary" onClick={onCancel}>
					{t('button.cancel')}
				</Button>
			</Stack>
			{/*  ============ \\ Main form body ============ */}
		</Form.Base>
	);
};

export default MenuItemsDetailForm;
