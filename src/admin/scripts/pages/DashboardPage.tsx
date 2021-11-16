import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import { Button, Typography, Section, Form, Drawer } from '../components/ui';
import Layout from '../components/Layout';

interface DashboardPageProps {}

const DashboardPage = ({}: DashboardPageProps) => {
	const { t } = useTranslation(['common', 'page']);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Dashboard',
		route: ROUTES.app.dashboard,
	};

	return (
		<>
			<Layout.Base
				titlePage={t('page:Dashboard.page.title')}
				pageObject={pageObject}
			>
				<Section>
					<Stack spacing={2} direction="row">
						<Button variant="outlined">Primary</Button>
						<Button variant="outlined" color="secondary">
							Secondary
						</Button>
						<Button variant="contained" color="info">
							info
						</Button>
						<Button variant="contained" color="error">
							error
						</Button>
						<Button variant="contained" color="warning">
							warning
						</Button>
					</Stack>
				</Section>
				<Section title={'Section title'}>
					<Typography.Paragraph p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
						eget risus convallis turpis tincidunt maximus. Duis sed faucibus
						felis, sed facilisis tellus. Integer imperdiet sodales lectus, a
						molestie justo aliquam eget. Nunc semper nisi ligula, eget euismod
						quam sagittis eget. Integer et dui sed lorem tristique pulvinar.
						Cras lobortis velit erat, et efficitur odio vehicula eget. Mauris
						vehicula et lacus vel condimentum. Praesent dictum elit a tempus
						semper. Vivamus mi sapien, euismod in rutrum ac, posuere quis erat.
						Aenean et luctus mi. Etiam nec est rutrum, rutrum lacus eu, sagittis
						felis. Donec molestie justo mauris, ullamcorper faucibus metus
						maximus a. Fusce tristique felis a massa commodo, ac tristique purus
						lacinia. Mauris porta tellus id nulla elementum viverra ut id velit.
						Donec sit amet mauris volutpat, suscipit lectus sit amet, pretium
						purus. Aliquam finibus nisi nec purus semper, at imperdiet mi
						vehicula. Nulla dapibus, lacus eget posuere accumsan, leo elit
						sodales massa, quis eleifend libero velit maximus nibh. Curabitur
						pulvinar laoreet nulla, dapibus feugiat quam imperdiet eu. Duis in
						turpis eget orci fringilla tempus et sit amet purus. Nulla malesuada
						nec lectus vel elementum. Duis sit amet erat eu nisl congue aliquet.
						Aliquam pulvinar quis magna a lobortis. Aliquam eu ex eleifend,
						pharetra eros eu, ultrices turpis.
					</Typography.Paragraph>
				</Section>
				<Section title={'Demo form examples'}>
					<Form.Base>form base</Form.Base>

					<br />

					<Form.DetailLayout
						sidebarChildren={<>sidebar</>}
						footerChildren={
							<>
								<Button variant="contained">Submit</Button>
								<Button variant="outlined" color="secondary">
									Cancel
								</Button>
							</>
						}
						footerStackProps={{ justifyContent: 'center' }}
						secondaryChildren={
							<Typography.Paragraph p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Praesent eget risus convallis turpis tincidunt maximus. Duis sed
								faucibus felis, sed facilisis tellus. Integer imperdiet sodales
								lectus, a molestie justo aliquam eget. Nunc semper nisi ligula,
								eget euismod quam sagittis eget. Integer et dui sed lorem
								tristique pulvinar. Cras lobortis velit erat, et efficitur odio
								vehicula eget. Mauris vehicula et lacus vel condimentum.
								Praesent dictum elit a tempus semper. Vivamus mi sapien, euismod
								in rutrum ac, posuere quis erat. Aenean et luctus mi. Etiam nec
								est rutrum, rutrum lacus eu, sagittis felis. Donec molestie
								justo mauris, ullamcorper faucibus metus maximus a. Fusce
								tristique felis a massa commodo, ac tristique purus lacinia.
								Mauris porta tellus id nulla elementum viverra ut id velit.
								Donec sit amet mauris volutpat, suscipit lectus sit amet,
								pretium purus. Aliquam finibus nisi nec purus semper, at
								imperdiet mi vehicula. Nulla dapibus, lacus eget posuere
								accumsan, leo elit sodales massa, quis eleifend libero velit
								maximus nibh. Curabitur pulvinar laoreet nulla, dapibus feugiat
								quam imperdiet eu. Duis in turpis eget orci fringilla tempus et
								sit amet purus. Nulla malesuada nec lectus vel elementum. Duis
								sit amet erat eu nisl congue aliquet. Aliquam pulvinar quis
								magna a lobortis. Aliquam eu ex eleifend, pharetra eros eu,
								ultrices turpis.
							</Typography.Paragraph>
						}
					>
						form detail content
					</Form.DetailLayout>
				</Section>
				<Section>
					<Button
						variant="outlined"
						color="success"
						onClick={() => setDrawerOpen(true)}
					>
						Open drawer
					</Button>
				</Section>
			</Layout.Base>
			<Drawer
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				title="Demo drawer title"
			>
				<>
					<Typography.Paragraph p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
						eget risus convallis turpis tincidunt maximus. Duis sed faucibus
						felis, sed facilisis tellus. Integer imperdiet sodales lectus, a
						molestie justo aliquam eget. Nunc semper nisi ligula, eget euismod
						quam sagittis eget. Integer et dui sed lorem tristique pulvinar.
						Cras lobortis velit erat, et efficitur odio vehicula eget. Mauris
						vehicula et lacus vel condimentum. Praesent dictum elit a tempus
						semper. Vivamus mi sapien, euismod in rutrum ac, posuere quis erat.
						Aenean et luctus mi. Etiam nec est rutrum, rutrum lacus eu, sagittis
						felis. Donec molestie justo mauris, ullamcorper faucibus metus
						maximus a. Fusce tristique felis a massa commodo, ac tristique purus
						lacinia. Mauris porta tellus id nulla elementum viverra ut id velit.
						Donec sit amet mauris volutpat, suscipit lectus sit amet, pretium
						purus. Aliquam finibus nisi nec purus semper, at imperdiet mi
						vehicula. Nulla dapibus, lacus eget posuere accumsan, leo elit
						sodales massa, quis eleifend libero velit maximus nibh. Curabitur
						pulvinar laoreet nulla, dapibus feugiat quam imperdiet eu. Duis in
						turpis eget orci fringilla tempus et sit amet purus. Nulla malesuada
						nec lectus vel elementum. Duis sit amet erat eu nisl congue aliquet.
						Aliquam pulvinar quis magna a lobortis. Aliquam eu ex eleifend,
						pharetra eros eu, ultrices turpis.
					</Typography.Paragraph>
				</>
			</Drawer>
		</>
	);
};

export default DashboardPage;
