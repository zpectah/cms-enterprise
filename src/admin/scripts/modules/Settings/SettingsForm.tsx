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
import { cmsSettingsObjectProps } from '../../types/cms_settings';
import { Button, Form, Section } from '../../components/ui';

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
	const [panel, setPanel] = React.useState('global');

	const formOptions: formLayoutObjectProps = {
		model: 'Settings',
		id: 'SettingsForm',
	};
	const panels = {
		global: {
			key: 'global',
			label: 'Global',
		},
		content: {
			key: 'content',
			label: 'Content',
		},
		language: {
			key: 'language',
			label: 'Language',
		},
		modules: {
			key: 'modules',
			label: 'Modules',
		},
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
								{/*  ============ Main form items ============ */}
								<Tab label={panels.global.label} value={panels.global.key} />
								<Tab label={panels.content.label} value={panels.content.key} />
								<Tab
									label={panels.language.label}
									value={panels.language.key}
								/>
								<Tab label={panels.modules.label} value={panels.modules.key} />
								{/*  ============ \\ Main form items ============ */}
							</TabList>
						</Box>
						{/*  ============ Main form panels ============ */}
						<TabPanel
							value={panels.global.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section>Item global</Section>
						</TabPanel>
						<TabPanel
							value={panels.content.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section>Item content</Section>
						</TabPanel>
						<TabPanel
							value={panels.language.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section>Item language</Section>
						</TabPanel>
						<TabPanel
							value={panels.modules.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section>Item modules</Section>
						</TabPanel>
						{/*  ============ \\ Main form panels ============ */}
					</TabContext>
				</Box>
			</Form.Layout>
		</>
	);
};
export default SettingsForm;
