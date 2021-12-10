import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styled from 'styled-components';

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
							<Section>Item common</Section>
						</TabPanel>
						{/*  ===== content ============== */}
						<TabPanel
							value={panels.content.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section>Item content</Section>
						</TabPanel>
						{/*  ===== modules ============== */}
						<TabPanel
							value={panels.modules.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section>Item modules</Section>
						</TabPanel>
						{/*  ===== about ============== */}
						<TabPanel
							value={panels.about.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section>Item about</Section>
						</TabPanel>
						{/*  ============ \\ Main form panels ============ */}
					</TabContext>
				</Box>
			</Wrapper>
		</>
	);
};

export default HelpModule;
