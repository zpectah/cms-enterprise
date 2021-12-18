import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SendIcon from '@mui/icons-material/Send';

import config from '../../config';
import { ROUTES, EMAIL_REGEX } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { cmsSettingsObjectProps } from '../../types/modules';
import { Button, Form, Input, Section } from '../../components/ui';
import getOptionsList from '../../utils/getOptionsList';
import Picker from '../../components/Picker';
import LanguageInstaller from './LanguageInstaller';
import ModuleInstaller from './ModuleInstaller';

interface SettingsFormProps {
	formData: cmsSettingsObjectProps;
	onSubmit: (data: any, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	afterLanguageInstall: (installed: string[]) => void;
	afterModuleInstall: () => void;
	isProcessing?: boolean;
	isDeveloper: boolean;
}

const SettingsForm = ({
	formData,
	onSubmit,
	onSubmitError,
	afterLanguageInstall,
	afterModuleInstall,
	isProcessing,
	isDeveloper,
}: SettingsFormProps) => {
	const params: any = useParams();
	const history = useHistory();
	const { t } = useTranslation(['common', 'page', 'form']);
	const [panel, setPanel] = useState('global');
	const panels_list = ['global', 'web', 'language', 'modules'];
	const show_panel_modules = !(!isDeveloper && panel == 'modules');
	const getPanels = () => {
		const tmp = {};
		panels_list.map((panel) => {
			if (show_panel_modules)
				tmp[panel] = {
					key: panel,
					label: t(`panel.${panel}`),
				};
		});
		return tmp as any;
	};
	const panels = getPanels();
	const formOptions: formLayoutObjectProps = {
		model: 'Settings',
		id: 'SettingsForm',
	};
	const {
		control,
		handleSubmit,
		register,
		formState: { isDirty, isValid },
		setValue,
	} = useForm({
		mode: 'all',
		defaultValues: {
			...formData,
		},
	});
	const submitHandler = (data: cmsSettingsObjectProps, e: any) =>
		onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => onSubmitError(errors, e);
	const panelChangeHandler = (event: React.SyntheticEvent, panel: string) => {
		setPanel(panel);
		history.push(`${ROUTES.app.settings.path}/${panel}`);
	};
	const renderFooter = () => {
		return (
			<>
				<Button
					type="submit"
					variant="contained"
					disabled={!isValid}
					loading={isProcessing}
				>
					{t('button.update')}
				</Button>
			</>
		);
	};
	const afterLanguageInstallHandler = (installed: string[]) => {
		setValue('language_installed', installed);
		afterLanguageInstall(installed);
	};
	const afterModuleInstallHandler = (
		type: keyof cmsSettingsObjectProps,
		value: boolean,
	) => {
		setValue(type, value);
		afterModuleInstall();
	};
	const getIndexOptions = useCallback(
		() => getOptionsList(config.options.common.meta_robots, t),
		[formData],
	);
	const getLanguageInstalledOptions = useCallback(
		(onlyActive?: boolean) => {
			let tmp = [];
			formData.language_installed.map((lng) => {
				tmp.push({
					value: lng,
					label: config.locales[lng].label,
					disabled:
						onlyActive && !formData.language_active.find((l) => l == lng),
				});
			});

			return tmp;
		},
		[formData],
	);

	useEffect(() => {
		if (params.panel) setPanel(params.panel);
	}, [params.panel]);

	return (
		<>
			<Form.Layout
				key={`FormLayout_${formOptions.id}`}
				formName={formOptions.id}
				dataTestId={formOptions.id}
				onSubmit={handleSubmit(submitHandler, errorSubmitHandler)}
				footerChildren={renderFooter()}
			>
				<Box sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={panel}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<TabList
								onChange={panelChangeHandler}
								aria-label={`${formOptions.id} tabs-list`}
							>
								{panels_list.map(
									(panel) =>
										!(!isDeveloper && panel == 'modules') && (
											<Tab
												label={panels[panel].label}
												value={panels[panel].key}
												key={panel}
											/>
										),
								)}
							</TabList>
						</Box>
						{/*  ============ Main form panels ============ */}
						{/*  ===== global ============== */}
						<TabPanel
							value={panels.global.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section title={t('form:form.Settings.section.title.project')}>
								<Controller
									name="project_name"
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.project_name')}
											id={`${formOptions.id}__project_name`}
											required
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__project_name`}
												placeholder={t('form:form.Settings.input.project_name')}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.project_name`}
												required
											/>
										</Form.Row>
									)}
								/>
							</Section>
							<Section title={t('form:form.Settings.section.title.company')}>
								<Controller
									name="company_name"
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_name')}
											id={`${formOptions.id}__company_name`}
											required
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_name`}
												placeholder={t('form:form.Settings.input.company_name')}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.company_name`}
												required
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_description"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_description')}
											id={`${formOptions.id}__company_description`}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_description`}
												placeholder={t(
													'form:form.Settings.input.company_description',
												)}
												dataTestId={`${formOptions.id}.input.company_description`}
												multiline
												rows={3}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_id"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_id')}
											id={`${formOptions.id}__company_id`}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_id`}
												placeholder={t('form:form.Settings.input.company_id')}
												responsiveWidth={'50%'}
												dataTestId={`${formOptions.id}.input.company_id`}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_address"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_address')}
											id={`${formOptions.id}__company_address`}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_address`}
												placeholder={t(
													'form:form.Settings.input.company_address',
												)}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.company_address`}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_city"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_city')}
											id={`${formOptions.id}__company_city`}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_city`}
												placeholder={t('form:form.Settings.input.company_city')}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.company_city`}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_country"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_country')}
											id={`${formOptions.id}__company_country`}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_country`}
												placeholder={t(
													'form:form.Settings.input.company_country',
												)}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.company_country`}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_zip"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_zip')}
											id={`${formOptions.id}__company_zip`}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_zip`}
												placeholder={t('form:form.Settings.input.company_zip')}
												responsiveWidth={'35%'}
												dataTestId={`${formOptions.id}.input.company_zip`}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_location"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_location')}
											id={`${formOptions.id}__company_location`}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_location`}
												placeholder={t(
													'form:form.Settings.input.company_location',
												)}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.company_location`}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_email"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_email')}
											id={`${formOptions.id}__company_email`}
										>
											<Picker.Email
												value={value}
												onChange={onChange}
												multiple
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_phone"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_phone')}
											id={`${formOptions.id}__company_phone`}
										>
											<Picker.Phone
												value={value}
												onChange={onChange}
												multiple
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_bank"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_bank')}
											id={`${formOptions.id}__company_bank`}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_bank`}
												placeholder={t('form:form.Settings.input.company_bank')}
												dataTestId={`${formOptions.id}.input.company_bank`}
												multiline
												rows={3}
											/>
										</Form.Row>
									)}
								/>
							</Section>
						</TabPanel>
						{/*  ===== web ============== */}
						<TabPanel
							value={panels.web.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section title={t('form:form.Settings.section.title.webMeta')}>
								<Controller
									name="web_meta_title"
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.web_meta_title')}
											id={`${formOptions.id}__web_meta_title`}
											required
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__web_meta_title`}
												placeholder={t(
													'form:form.Settings.input.web_meta_title',
												)}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.web_meta_title`}
												required
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="web_meta_description"
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.web_meta_description')}
											id={`${formOptions.id}__project_name`}
											required
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__web_meta_description`}
												placeholder={t(
													'form:form.Settings.input.web_meta_description',
												)}
												dataTestId={`${formOptions.id}.input.web_meta_description`}
												required
												multiline
												rows={3}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="web_meta_robots"
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.web_meta_robots')}
											id={`${formOptions.id}__web_meta_robots`}
											required
										>
											<Input.Select
												id={`${formOptions.id}__web_meta_robots`}
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												options={getIndexOptions()}
												responsiveWidth={'50%'}
												dataTestId={`${formOptions.id}.select.web_meta_robots`}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="web_meta_keywords"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.web_meta_keywords')}
											id={`${formOptions.id}__web_meta_keywords`}
											required
										>
											<Picker.String
												value={value}
												onChange={onChange}
												inputLabel={t('form:label.setKeywords')}
												multiple
											/>
										</Form.Row>
									)}
								/>
							</Section>
							<Section title={t('form:form.Settings.section.title.modes')}>
								<Controller
									name="web_mode_maintenance"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											blankLabel
											id={`${formOptions.id}__web_mode_maintenance`}
										>
											<Input.SwitchControl
												onChange={onChange}
												onBlur={onBlur}
												checked={value}
												name={name}
												id={`${formOptions.id}__web_mode_maintenance`}
												dataTestId={`${formOptions.id}.switch.web_mode_maintenance`}
												label={t(
													'form:form.Settings.input.web_mode_maintenance',
												)}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="web_mode_debug"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											blankLabel
											id={`${formOptions.id}__web_mode_debug`}
										>
											<Input.SwitchControl
												onChange={onChange}
												onBlur={onBlur}
												checked={value}
												name={name}
												id={`${formOptions.id}__web_mode_debug`}
												dataTestId={`${formOptions.id}.switch.web_mode_debug`}
												label={t('form:form.Settings.input.web_mode_debug')}
											/>
										</Form.Row>
									)}
								/>
							</Section>
							<Section title={t('form:form.Settings.section.title.forms')}>
								<Controller
									name="form_email_sender"
									control={control}
									rules={{ required: true, pattern: EMAIL_REGEX }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.form_email_sender')}
											id={`${formOptions.id}__form_email_sender`}
											required
										>
											<Input.Text
												type="email"
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__form_email_sender`}
												placeholder={t(
													'form:form.Settings.input.form_email_sender',
												)}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.form_email_sender`}
												required
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="form_email_recipients"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t(
												'form:form.Settings.input.form_email_recipients',
											)}
											id={`${formOptions.id}__form_email_recipients`}
											required
										>
											<Picker.Email
												value={value}
												onChange={onChange}
												multiple
											/>
										</Form.Row>
									)}
								/>
							</Section>
							<Section title={t('form:form.Settings.section.title.content')}>
								<Controller
									name="content_redactor_approval"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											blankLabel
											id={`${formOptions.id}__content_redactor_approval`}
										>
											<Input.SwitchControl
												onChange={onChange}
												onBlur={onBlur}
												checked={value}
												name={name}
												id={`${formOptions.id}__content_redactor_approval`}
												dataTestId={`${formOptions.id}.switch.content_redactor_approval`}
												label={t(
													'form:form.Settings.input.content_redactor_approval',
												)}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="comments_global_active"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											blankLabel
											id={`${formOptions.id}__comments_global_active`}
										>
											<Input.SwitchControl
												onChange={onChange}
												onBlur={onBlur}
												checked={value}
												name={name}
												id={`${formOptions.id}__comments_global_active`}
												dataTestId={`${formOptions.id}.switch.comments_global_active`}
												label={t(
													'form:form.Settings.input.comments_global_active',
												)}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="comments_anonymous_active"
									control={control}
									rules={{}}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											blankLabel
											id={`${formOptions.id}__comments_anonymous_active`}
										>
											<Input.SwitchControl
												onChange={onChange}
												onBlur={onBlur}
												checked={value}
												name={name}
												id={`${formOptions.id}__comments_anonymous_active`}
												dataTestId={`${formOptions.id}.switch.comments_anonymous_active`}
												label={t(
													'form:form.Settings.input.comments_anonymous_active',
												)}
											/>
										</Form.Row>
									)}
								/>
							</Section>
						</TabPanel>
						{/*  ===== language ============== */}
						<TabPanel
							value={panels.language.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section
								title={t('form:form.Settings.section.title.manageLanguages')}
							>
								<div>
									<Controller
										name="language_active"
										control={control}
										rules={{ required: true }}
										render={({
											field: { onChange, onBlur, value, ref, name },
										}) => (
											<Form.Row
												label={t('form:form.Settings.input.language_active')}
												id={`${formOptions.id}_select_language_active`}
											>
												<Input.Select
													id={`${formOptions.id}__language_active`}
													onChange={onChange}
													onBlur={onBlur}
													value={value}
													name={name}
													options={getLanguageInstalledOptions()}
													dataTestId={`${formOptions.id}.select.language_active`}
													responsiveWidth={'50%'}
													multiple
												/>
											</Form.Row>
										)}
									/>
								</div>
								<div>
									<Controller
										name="language_default"
										control={control}
										rules={{ required: true }}
										render={({
											field: { onChange, onBlur, value, ref, name },
										}) => (
											<Form.Row
												label={t('form:form.Settings.input.language_default')}
												id={`${formOptions.id}_select_language_default`}
											>
												<Input.Select
													id={`${formOptions.id}__language_default`}
													onChange={onChange}
													onBlur={onBlur}
													value={value}
													name={name}
													options={getLanguageInstalledOptions(true)}
													dataTestId={`${formOptions.id}.select.language_default`}
													responsiveWidth={'50%'}
												/>
											</Form.Row>
										)}
									/>
								</div>
							</Section>
							<Section
								title={t('form:form.Settings.section.title.installNewLanguage')}
							>
								<Form.Row
									blankLabel
									id={`${formOptions.id}__language_installer`}
								>
									<LanguageInstaller
										installedLanguages={formData.language_installed}
										defaultLanguage={formData.language_default}
										afterInstall={afterLanguageInstallHandler}
									/>
								</Form.Row>
							</Section>
						</TabPanel>
						{/*  ===== modules ============== */}
						{show_panel_modules && (
							<TabPanel
								value={panels.modules.key}
								style={{ paddingLeft: 0, paddingRight: 0 }}
							>
								<Section
									title={t('form:form.Settings.section.title.module_crm')}
								>
									<input
										type="hidden"
										{...register('module_crm_installed', {})}
									/>
									{!formData.module_crm_installed && (
										<Form.Row
											blankLabel
											id={`${formOptions.id}__module_market_installer`}
										>
											<ModuleInstaller
												module={'crm'}
												afterInstall={() =>
													afterModuleInstallHandler(
														'module_crm_installed',
														true,
													)
												}
											/>
										</Form.Row>
									)}
									<Controller
										name="module_crm_active"
										control={control}
										rules={{}}
										render={({
											field: { onChange, onBlur, value, ref, name },
										}) => (
											<Form.Row
												blankLabel
												id={`${formOptions.id}__module_crm_active`}
											>
												<Input.SwitchControl
													onChange={onChange}
													onBlur={onBlur}
													checked={value}
													name={name}
													id={`${formOptions.id}__module_crm_active`}
													dataTestId={`${formOptions.id}.switch.module_crm_active`}
													label={t(
														'form:form.Settings.input.module_crm_active',
													)}
													disabled={!formData.module_crm_installed}
												/>
											</Form.Row>
										)}
									/>
									<Controller
										name="members_login_active"
										control={control}
										rules={{}}
										render={({
											field: { onChange, onBlur, value, ref, name },
										}) => (
											<Form.Row
												blankLabel
												id={`${formOptions.id}__members_login_active`}
											>
												<Input.SwitchControl
													onChange={onChange}
													onBlur={onBlur}
													checked={value}
													name={name}
													id={`${formOptions.id}__members_login_active`}
													dataTestId={`${formOptions.id}.switch.members_login_active`}
													label={t(
														'form:form.Settings.input.members_login_active',
													)}
													disabled={!formData.module_crm_active}
												/>
											</Form.Row>
										)}
									/>
									<Controller
										name="members_lostPassword_active"
										control={control}
										rules={{}}
										render={({
											field: { onChange, onBlur, value, ref, name },
										}) => (
											<Form.Row
												blankLabel
												id={`${formOptions.id}__members_lostPassword_active`}
											>
												<Input.SwitchControl
													onChange={onChange}
													onBlur={onBlur}
													checked={value}
													name={name}
													id={`${formOptions.id}__members_lostPassword_active`}
													dataTestId={`${formOptions.id}.switch.members_lostPassword_active`}
													label={t(
														'form:form.Settings.input.members_lostPassword_active',
													)}
													disabled={!formData.module_crm_active}
												/>
											</Form.Row>
										)}
									/>
									<Controller
										name="members_profile_active"
										control={control}
										rules={{}}
										render={({
											field: { onChange, onBlur, value, ref, name },
										}) => (
											<Form.Row
												blankLabel
												id={`${formOptions.id}__members_profile_active`}
											>
												<Input.SwitchControl
													onChange={onChange}
													onBlur={onBlur}
													checked={value}
													name={name}
													id={`${formOptions.id}__members_profile_active`}
													dataTestId={`${formOptions.id}.switch.members_profile_active`}
													label={t(
														'form:form.Settings.input.members_profile_active',
													)}
													disabled={!formData.module_crm_active}
												/>
											</Form.Row>
										)}
									/>
									<Controller
										name="members_register_active"
										control={control}
										rules={{}}
										render={({
											field: { onChange, onBlur, value, ref, name },
										}) => (
											<Form.Row
												blankLabel
												id={`${formOptions.id}__members_register_active`}
											>
												<Input.SwitchControl
													onChange={onChange}
													onBlur={onBlur}
													checked={value}
													name={name}
													id={`${formOptions.id}__members_register_active`}
													dataTestId={`${formOptions.id}.switch.members_register_active`}
													label={t(
														'form:form.Settings.input.members_register_active',
													)}
													disabled={!formData.module_crm_active}
												/>
											</Form.Row>
										)}
									/>
								</Section>
								<Section
									title={t('form:form.Settings.section.title.module_market')}
								>
									<input
										type="hidden"
										{...register('module_market_installed', {})}
									/>
									{!formData.module_market_installed && (
										<Form.Row
											blankLabel
											id={`${formOptions.id}__module_market_installer`}
										>
											<ModuleInstaller
												module={'market'}
												afterInstall={() =>
													afterModuleInstallHandler(
														'module_market_installed',
														true,
													)
												}
											/>
										</Form.Row>
									)}
									<Controller
										name="module_market_active"
										control={control}
										rules={{}}
										render={({
											field: { onChange, onBlur, value, ref, name },
										}) => (
											<Form.Row
												blankLabel
												id={`${formOptions.id}__module_market_active`}
											>
												<Input.SwitchControl
													onChange={onChange}
													onBlur={onBlur}
													checked={value}
													name={name}
													id={`${formOptions.id}__module_market_active`}
													dataTestId={`${formOptions.id}.switch.module_market_active`}
													label={t(
														'form:form.Settings.input.module_market_active',
													)}
													disabled={!formData.module_market_installed}
												/>
											</Form.Row>
										)}
									/>
								</Section>
							</TabPanel>
						)}
						{/*  ============ \\ Main form panels ============ */}
					</TabContext>
				</Box>
			</Form.Layout>
		</>
	);
};
export default SettingsForm;
