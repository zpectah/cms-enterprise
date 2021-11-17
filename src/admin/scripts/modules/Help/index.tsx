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

	const panels = {
		about: {
			key: 'about',
			label: 'About',
		},
		content: {
			key: 'content',
			label: 'Content',
		},
		modules: {
			key: 'modules',
			label: 'Modules',
		},
	};

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
								{/*  ============ Main form items ============ */}
								<Tab label={panels.about.label} value={panels.about.key} />
								<Tab label={panels.content.label} value={panels.content.key} />
								<Tab label={panels.modules.label} value={panels.modules.key} />
								{/*  ============ \\ Main form items ============ */}
							</TabList>
						</Box>
						{/*  ============ Main form panels ============ */}
						<TabPanel
							value={panels.about.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section>Item about</Section>
						</TabPanel>
						<TabPanel
							value={panels.content.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section>Item content</Section>
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
			</Wrapper>
		</>
	);
};

export default HelpModule;
