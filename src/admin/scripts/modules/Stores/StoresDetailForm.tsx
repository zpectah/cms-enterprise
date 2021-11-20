import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { StoresItemProps } from '../../types/model';
import { Form, Button, Section } from '../../components/ui';
import ModuleViewHeading from '../../components/ModuleViewHeading';
import ContentTitle from '../../components/Layout/Content/ContentTitle';
import ModuleLanguageToggle from '../../components/ModuleLanguageToggle';
import { getElTestAttr } from '../../utils/tests';

interface StoresDetailFormProps {
	detailData: StoresItemProps;
	onSubmit: (data: StoresItemProps, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	detailOptions: {};
	onCancel: (dirty: boolean) => void;
	onDelete: (id: number | string) => void;
	languageList: string[];
	languageDefault: string;
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
}: StoresDetailFormProps) => {
	const history = useHistory();
	const { t } = useTranslation(['common', 'form']);
	const [lang, setLang] = useState(languageDefault);

	const formOptions: formLayoutObjectProps = {
		model: 'Stores',
		id: 'StoresDetailForm',
		route: ROUTES.market.stores,
		...detailOptions,
	};
	const { control, handleSubmit, reset, register, formState } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});
	const { isDirty, isValid } = formState;

	const submitHandler = (data: StoresItemProps, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => {
		if (onSubmitError) onSubmitError(errors, e);
	};
	const deleteHandler = () => onDelete(detailData.id);
	const cancelHandler = () => onCancel(isDirty);
	const buttonCreateCallback = () =>
		history.push(`${formOptions.route.path}${ROUTE_SUFFIX.detail}/new`);

	const renderTitle = () => {
		let title = t('new.Stores');
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
							dataAppId={`button.create.new.Stores`}
						>
							{t(`new.Stores`)}
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
								name="active"
								control={control}
								rules={{}}
								render={({ field: { onChange, onBlur, value, ref, name } }) => (
									<Form.Row errors={[]}>
										<FormControlLabel
											control={
												<Switch
													onChange={onChange}
													onBlur={onBlur}
													checked={value}
													name={name}
													id={`${formOptions.id}__active`}
													size="small"
													{...getElTestAttr(`${formOptions.id}.switch.active`)}
												/>
											}
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
								<TextField
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									name={name}
									id={`${formOptions.id}__name`}
									label={t('form:input.name')}
									variant="outlined"
									size="small"
									style={{ width: '100%' }}
									{...getElTestAttr(`${formOptions.id}.input.name`)}
								/>
							</Form.Row>
						)}
					/>
				</Section>
				<Section>...form...{JSON.stringify(detailData)}...</Section>
				{/*  ============ \\ Main form body ============ */}
			</Form.Layout>
		</>
	);
};

export default StoresDetailForm;
