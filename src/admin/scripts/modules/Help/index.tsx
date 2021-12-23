import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styled from 'styled-components';

import config from '../../config';
import { Section, Typography } from '../../components/ui';
import { ROUTES } from '../../constants';

const Wrapper = styled.div``;
const StyledTable = styled.table`
	width: 100%;
	height: auto;
	margin: 0 0 1.5rem;
	border-spacing: 0;

	& th,
	& td {
		padding: calc(${(props) => props.theme.spacer} / 2)
			${(props) => props.theme.spacer};
	}
	& thead th {
	}
	& tbody th {
		text-align: right;
	}
	& tbody td {
		text-align: left;
	}
`;

interface HelpModuleProps {}

const HelpModule = ({}: HelpModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const { t } = useTranslation(['common', 'help', 'types']);
	const [panel, setPanel] = useState('common');

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
							<Section title={t('help:common.title.controls')}>
								<Typography.Paragraph>
									{t('help:common.controls')}
								</Typography.Paragraph>
							</Section>
							<Section title={t('help:common.title.tables')}>
								<Typography.Paragraph>
									{t('help:common.tables')}
								</Typography.Paragraph>
							</Section>
							<Section title={t('help:common.title.detail')}>
								<Typography.Paragraph>
									{t('help:common.detail')}
								</Typography.Paragraph>
							</Section>
							<Section title={t('help:common.title.dashboard')}>
								<Typography.Paragraph>
									{t('help:common.dashboard')}
								</Typography.Paragraph>
							</Section>
							<Section title={t('help:common.title.settings')}>
								<Typography.Paragraph>
									{t('help:common.settings')}
								</Typography.Paragraph>
							</Section>
						</TabPanel>
						{/*  ===== content ============== */}
						<TabPanel
							value={panels.content.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section title={t('help:content.title.categories')}>
								<Typography.Paragraph>
									{t('help:content.categories.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Categories.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.categories.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.deliveries')}>
								<Typography.Paragraph>
									{t('help:content.deliveries.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Deliveries.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.deliveries.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.distributors')}>
								<Typography.Paragraph>
									{t('help:content.distributors.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Distributors.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.distributors.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.members')}>
								<Typography.Paragraph>
									{t('help:content.members.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Members.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.members.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.menu')}>
								<Typography.Paragraph>
									{t('help:content.menu.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Menu.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.menu.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.orders')}>
								<Typography.Paragraph>
									{t('help:content.orders.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Orders.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.orders.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.pages')}>
								<Typography.Paragraph>
									{t('help:content.pages.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Pages.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.pages.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.payments')}>
								<Typography.Paragraph>
									{t('help:content.payments.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Payments.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.payments.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.posts')}>
								<Typography.Paragraph>
									{t('help:content.posts.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Posts.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.posts.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.producers')}>
								<Typography.Paragraph>
									{t('help:content.producers.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Producers.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.producers.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.products')}>
								<Typography.Paragraph>
									{t('help:content.products.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Products.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.products.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.productsOptions')}>
								<Typography.Paragraph>
									{t('help:content.productsOptions.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Tags.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.tags.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.stores')}>
								<Typography.Paragraph>
									{t('help:content.stores.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Stores.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.stores.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.tags')}>
								<Typography.Paragraph>
									{t('help:content.tags.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Tags.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.tags.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.translations')}>
								<Typography.Paragraph>
									{t('help:content.translations.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Translations.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.translations.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.uploads')}>
								<Typography.Paragraph>
									{t('help:content.uploads.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Uploads.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>
													{t(`help:content.uploads.type.${type}`)}{' '}
													{JSON.stringify(
														config.options.model.Uploads[type]?.extension,
													)}
												</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Section title={t('help:content.title.users')}>
								<Typography.Paragraph>
									{t('help:content.users.main')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Users.type.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.users.type.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
								<Typography.Paragraph>
									{t('help:content.users.main_level')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Users.level.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.users.level.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
								<Typography.Paragraph>
									{t('help:content.users.main_group')}
								</Typography.Paragraph>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: '150px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										{config.options.model.Users.group.map((type) => (
											<tr key={type}>
												<th>{t(`types:${type}`)}</th>
												<td>
													<Typography.Paragraph small>
														{type}
													</Typography.Paragraph>
												</td>
												<td>{t(`help:content.users.group.${type}`)}</td>
											</tr>
										))}
									</tbody>
								</StyledTable>
							</Section>
							<Typography.Paragraph small>
								* {t('help:content.*_label')}
							</Typography.Paragraph>
						</TabPanel>
						{/*  ===== modules ============== */}
						<TabPanel
							value={panels.modules.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section title={t('help:modules.title.about')}>
								<Typography.Paragraph>
									{t('help:modules.about')}
								</Typography.Paragraph>
							</Section>
							<Section title={t('help:modules.title.crm')}>
								<Typography.Paragraph>
									{t('help:modules.crm')}
								</Typography.Paragraph>
							</Section>
							<Section title={t('help:modules.title.market')}>
								<Typography.Paragraph>
									{t('help:modules.market')}
								</Typography.Paragraph>
							</Section>
						</TabPanel>
						{/*  ===== about ============== */}
						<TabPanel
							value={panels.about.key}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Section title={t('help:about.title.copyright')}>
								<StyledTable>
									<colgroup>
										<col style={{ width: '200px' }} />
										<col style={{ width: 'auto' }} />
									</colgroup>
									<tbody>
										<tr>
											<th>{t('help:about.label.system')}</th>
											<td>{config.project.admin.name}</td>
										</tr>
										<tr>
											<th>{t('help:about.label.version')}</th>
											<td>{config.project.admin.version}</td>
										</tr>
										<tr>
											<th>{t('help:about.label.author')}</th>
											<td>{config.project.admin.meta.author}</td>
										</tr>
										<tr>
											<th>{t('help:about.label.environment')}</th>
											<td>{config.env}</td>
										</tr>
										<tr>
											<th>{t('help:about.label.timestamp')}</th>
											<td>{config.timestamp}</td>
										</tr>
										<tr>
											<th>{t('help:about.label.github')}</th>
											<td>
												<Typography.Paragraph
													a
													href={'https://github.com/zpectah/cms-enterprise'}
													target="_blank"
												>
													https://github.com/zpectah/cms-enterprise
												</Typography.Paragraph>
											</td>
										</tr>
									</tbody>
								</StyledTable>
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
