import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import config from '../../config';
import { ROUTES } from '../../constants';
import { formLayoutObjectProps } from '../../types/app';
import { cmsSettingsObjectProps } from '../../types/modules';
import { Button, Form, Input, Section } from '../../components/ui';
import getOptionsList from '../../utils/getOptionsList';
import Picker from '../../components/Picker';

interface SettingsFormProps {
	formData: cmsSettingsObjectProps;
	onSubmit: (data: any, e: any) => void;
	onSubmitError: (error: any, e: any) => void;
	languageList: string[];
	languageDefault: string;
}

const SettingsForm = ({
	formData,
	onSubmit,
	onSubmitError,
	languageList = config.tmp.languageList,
	languageDefault = config.tmp.languageDefault,
}: SettingsFormProps) => {
	const params: any = useParams();
	const history = useHistory();
	const { t } = useTranslation(['common', 'page', 'form']);
	const [lang, setLang] = useState(languageDefault);
	const [panel, setPanel] = useState('global');

	const panels_list = ['global', 'web', 'language', 'modules'];
	const getPanels = () => {
		const tmp = {};
		panels_list.map((panel) => {
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
	const { control, handleSubmit, reset, register, formState } = useForm({
		mode: 'all',
		defaultValues: {
			...formData,
		},
	});
	const { isDirty, isValid } = formState;

	const submitHandler = (data: any, e: any) => onSubmit(data, e);
	const errorSubmitHandler = (errors: any, e: any) => onSubmitError(errors, e);
	const panelChangeHandler = (event: React.SyntheticEvent, panel: string) => {
		setPanel(panel);
		history.push(`${ROUTES.app.settings.path}/${panel}`);
	};

	const renderFooter = () => {
		return (
			<>
				<Button type="submit" variant="contained" disabled={!isValid}>
					{t('button.update')}
				</Button>
			</>
		);
	};

	// Model options list
	const getIndexOptions = useCallback(
		() => getOptionsList(config.options.common.meta_robots, t),
		[formData],
	);

	useEffect(() => {
		if (params.panel) setPanel(params.panel);
	}, [params.panel]);

	return (
		<>
			<Form.Layout
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
								{panels_list.map((panel) => (
									<Tab
										label={panels[panel].label}
										value={panels[panel].key}
										key={panel}
									/>
								))}
							</TabList>
						</Box>
						{/*  ============ Main form panels ============ */}
						{/*  ===== global ============== */}
						<TabPanel
							value={panels.global.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section>
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
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__project_name`}
												// label={t('form:input.project_name')}
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
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_name`}
												// label={t('form:input.project_name')}
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
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_description')}
											id={`${formOptions.id}__company_description`}
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_description`}
												// label={t('form:input.project_name')}
												placeholder={t(
													'form:form.Settings.input.company_description',
												)}
												// responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.company_description`}
												required
												multiline
												rows={3}
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_id"
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_id')}
											id={`${formOptions.id}__company_id`}
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_id`}
												// label={t('form:input.project_name')}
												placeholder={t('form:form.Settings.input.company_id')}
												responsiveWidth={'50%'}
												dataTestId={`${formOptions.id}.input.company_id`}
												required
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_address"
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_address')}
											id={`${formOptions.id}__company_address`}
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_address`}
												// label={t('form:input.project_name')}
												placeholder={t(
													'form:form.Settings.input.company_address',
												)}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.company_address`}
												required
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_city"
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_city')}
											id={`${formOptions.id}__company_city`}
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_city`}
												// label={t('form:input.project_name')}
												placeholder={t('form:form.Settings.input.company_city')}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.company_city`}
												required
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_country"
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_country')}
											id={`${formOptions.id}__company_country`}
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_country`}
												// label={t('form:input.project_name')}
												placeholder={t(
													'form:form.Settings.input.company_country',
												)}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.company_country`}
												required
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_zip"
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_zip')}
											id={`${formOptions.id}__company_zip`}
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_zip`}
												// label={t('form:input.project_name')}
												placeholder={t('form:form.Settings.input.company_zip')}
												responsiveWidth={'35%'}
												dataTestId={`${formOptions.id}.input.company_zip`}
												required
											/>
										</Form.Row>
									)}
								/>
								<Controller
									name="company_location"
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_location')}
											id={`${formOptions.id}__company_location`}
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_location`}
												// label={t('form:input.project_name')}
												placeholder={t(
													'form:form.Settings.input.company_location',
												)}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.company_location`}
												required
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
											errors={[]}
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
											errors={[]}
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
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.company_bank')}
											id={`${formOptions.id}__company_bank`}
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__company_bank`}
												placeholder={t('form:form.Settings.input.company_bank')}
												dataTestId={`${formOptions.id}.input.company_bank`}
												required
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
							<Section>
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
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__web_meta_title`}
												// label={t('form:input.project_name')}
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
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__web_meta_description`}
												// label={t('form:input.project_name')}
												placeholder={t(
													'form:form.Settings.input.web_meta_description',
												)}
												// responsiveWidth={'75%'}
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
											errors={[]}
										>
											<Input.Select
												id={`${formOptions.id}__web_meta_robots`}
												// labelId={`${formOptions.id}__type.web_meta_robots`}
												// label={t('form:input.robots')}
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
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value, ref, name },
									}) => (
										<Form.Row
											label={t('form:form.Settings.input.web_meta_keywords')}
											id={`${formOptions.id}__web_meta_keywords`}
											errors={[]}
										>
											<Input.Text
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												name={name}
												id={`${formOptions.id}__web_meta_keywords`}
												// label={t('form:input.project_name')}
												placeholder={t(
													'form:form.Settings.input.web_meta_keywords',
												)}
												responsiveWidth={'75%'}
												dataTestId={`${formOptions.id}.input.web_meta_keywords`}
												required
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
											errors={[]}
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
											errors={[]}
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
								<div>form email sender (picker:one)</div>
								<div>form email recipients (picker)</div>
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
											errors={[]}
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
											errors={[]}
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
											errors={[]}
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
							<Section>
								<div>language installed</div>
								<div>language active</div>
								<div>language default</div>
							</Section>
							<Section>
								<div>install new language</div>
							</Section>
						</TabPanel>
						{/*  ===== modules ============== */}
						<TabPanel
							value={panels.modules.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section>
								<div>module crm installed</div>
								<div>module crm active</div>
								<div>module market installed</div>
								<div>module market active</div>
								<div>members register active</div>
								<div>members login active</div>
								<div>members lost password active</div>
								<div>members profile active</div>
							</Section>
						</TabPanel>
						{/*  ============ \\ Main form panels ============ */}
					</TabContext>
				</Box>
			</Form.Layout>
		</>
	);
};
export default SettingsForm;
