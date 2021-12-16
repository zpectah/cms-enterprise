import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styled from 'styled-components';

import config from '../../config';
import { Section } from '../../components/ui';
import { ROUTES } from '../../constants';

const Wrapper = styled.div``;

interface HelpModuleProps {}

const HelpModule = ({}: HelpModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const { t } = useTranslation(['common']);
	const [panel, setPanel] = React.useState('about');

	const panels_list = ['common', 'content', 'modules', 'about'];
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

	const panelChangeHandler = (event: React.SyntheticEvent, panel: string) => {
		setPanel(panel);
		history.push(`${ROUTES.app.help.path}/${panel}`);
	};

	useEffect(() => {
		if (params.panel) setPanel(params.panel);
	}, [params.panel]);

	return (
		<>
			<Wrapper>
				<Box sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={panel}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<TabList
								onChange={panelChangeHandler}
								aria-label={`Help tabs-list`}
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
						{/*  ===== common ============== */}
						<TabPanel
							value={panels.common.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section title={'Controls'}>Item common</Section>
							<Section title={'Tables'}>Item common</Section>
							<Section title={'Detail'}>Item common</Section>
						</TabPanel>
						{/*  ===== content ============== */}
						<TabPanel
							value={panels.content.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section title={'Categories'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Categories.type)}
							</Section>
							<Section title={'Deliveries'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Deliveries.type)}
							</Section>
							<Section title={'Distributors'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Distributors.type)}
							</Section>
							<Section title={'Members'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Members.type)}
							</Section>
							<Section title={'Menu'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Menu.type)}
							</Section>
							<Section title={'Orders'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Orders.type)}
							</Section>
							<Section title={'Pages'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Pages.type)}
							</Section>
							<Section title={'Payments'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Payments.type)}
							</Section>
							<Section title={'Posts'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Posts.type)}
							</Section>
							<Section title={'Producers'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Producers.type)}
							</Section>
							<Section title={'Products'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Products.type)}
							</Section>
							<Section title={'Stores'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Stores.type)}
							</Section>
							<Section title={'Tags'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Tags.type)}
							</Section>
							<Section title={'Translations'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Translations.type)}
							</Section>
							<Section title={'Uploads'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Uploads.type)}
							</Section>
							<Section title={'Users'}>
								Item content ...{' '}
								{JSON.stringify(config.options.model.Users.type)}
							</Section>
						</TabPanel>
						{/*  ===== modules ============== */}
						<TabPanel
							value={panels.modules.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section title={'About modules'}>Item modules</Section>
							<Section title={'CRM'}>Item modules</Section>
							<Section title={'Market'}>Item modules</Section>
						</TabPanel>
						{/*  ===== about ============== */}
						<TabPanel
							value={panels.about.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section title={'Copyright'}>
								<div>
									Verze: <span>{config.project.admin.version}</span>
								</div>
								<div>
									Author: <span>{config.project.admin.meta.author}</span>
								</div>
								<div>
									GitHub: <span>https://github.com/zpectah/cms-enterprise</span>
								</div>
							</Section>
						</TabPanel>
						{/*  ============ \\ Main form panels ============ */}
					</TabContext>
				</Box>
			</Wrapper>
		</>
	);
};

export default HelpModule;
