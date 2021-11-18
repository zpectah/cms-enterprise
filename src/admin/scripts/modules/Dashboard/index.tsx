import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

import { TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { useToasts } from '../../hooks/common';
import {
	Button,
	Typography,
	Section,
	Form,
	Drawer,
	Dialog,
} from '../../components/ui';
import DashboardTile from '../../components/DashboardTile';

interface DashboardModuleProps {}

const DashboardModule = ({}: DashboardModuleProps) => {
	const { t } = useTranslation(['common']);
	const dispatch = useDispatch();
	const { createToasts } = useToasts(dispatch);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<div>
				<Section>
					<DashboardTile.Base>Dashboard Tile</DashboardTile.Base>
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
				<Section title={'Demo actions'}>
					<Stack spacing={2} direction="row">
						<Button
							variant="outlined"
							color="success"
							onClick={() => setDrawerOpen(true)}
						>
							Open drawer
						</Button>
						<Button
							variant="outlined"
							color="success"
							onClick={() => setDialogOpen(true)}
						>
							Open dialog
						</Button>
						<Button
							variant="contained"
							color="success"
							onClick={() => {
								createToasts({
									title: 'Test success message',
									context: 'success',
								});
							}}
						>
							Open success message
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={() => {
								createToasts({
									title: 'Test error message with autoclose',
									context: 'error',
									timeout: TOASTS_TIMEOUT_DEFAULT,
								});
							}}
						>
							Open error message
						</Button>
					</Stack>
				</Section>
				<Section title={'Demo form examples'}>
					<Form.Base>form base</Form.Base>

					<br />

					<Form.Layout
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
					</Form.Layout>
				</Section>
			</div>
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
			<Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
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
			</Dialog>
		</>
	);
};

export default DashboardModule;
