import React, { useState } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';

import config from '../../../config';
import { TOASTS_TIMEOUT_DEFAULT } from '../../../constants';
import { MenuItemItemProps, MenuItemItemLangProps } from '../../../types/model';
import { useMenuItems } from '../../../hooks/model';
import { useSettings, useToasts } from '../../../hooks/common';
import { selectedArrayProps } from '../../../types/table';
import {
	Dialog,
	Drawer,
	ConfirmDialog,
	Button,
	ButtonCreate,
	Typography,
	Preloader,
} from '../../../components/ui';
import MenuItemsDetailForm from './MenuItemsDetailForm';
import getDetailData from '../../../utils/getDetailData';
import { getLanguagesFields } from '../../../utils/detail';
import ModuleLanguageToggle from '../../../components/ModuleLanguageToggle';
import MenuItemsList from './MenuItemsList';

interface MenuItemsManagerProps {
	menuId: string | number;
	languageList: string[];
	languageDefault: string;
}

const getMenuItems = (items: MenuItemItemProps[], menuId: string | number) => {
	const selected: MenuItemItemProps[] = [];

	items.map((item) => {
		if (item.menu == menuId) selected.push(item);
	});

	return selected;
};

const MenuItemsManager = ({
	menuId,
	languageList,
	languageDefault,
}: MenuItemsManagerProps) => {
	const { t } = useTranslation(['common', 'messages']);
	const dispatch = useDispatch();
	const [lang, setLang] = useState(languageDefault);
	const [detail, setDetail] = useState<string | number>(null);
	const [detailData, setDetailData] = useState<MenuItemItemProps>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
	const [confirmDialogData, setConfirmDialogData] =
		useState<selectedArrayProps>([]);
	const [isProcessing, setProcessing] = useState(false);

	const { createToasts } = useToasts(dispatch);
	const {
		MenuItems,
		createMenuItems,
		updateMenuItems,
		toggleMenuItems,
		deleteMenuItems,
		reloadMenuItems,
		menuItems_loading,
		menuItems_error,
	} = useMenuItems();
	const { Settings } = useSettings();

	// Trigger open detail with current id and set data
	const openDetailHandler = (id: string | number) => {
		const detail = getDetailData(id, 'MenuItems', MenuItems);
		if (id == 'new')
			detail['lang'] = getLanguagesFields(Settings?.language_active, {
				label: '',
			} as MenuItemItemLangProps);

		setDetail(id);
		setDetailData(detail);
		setDrawerOpen(true);
	};

	// Trigger closes detail and show detail
	const closeDetailHandler = () => {
		setDetail(null);
		setDetailData(null);
		setDrawerOpen(false);
	};

	// When detail is submitted (create/update)
	const itemSubmitHandler = (data: MenuItemItemProps) => {
		const master: MenuItemItemProps = _.cloneDeep(data);
		setProcessing(true);
		// reformat data before save
		master.name = master.name.split(' ').join('-');
		if (master.id == 'new') {
			createMenuItems(master).then((response) => {
				reloadMenuItems();
				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemCreated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				setProcessing(false);
			});
		} else {
			updateMenuItems(master).then((response) => {
				reloadMenuItems();
				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemUpdated', { count: 1 }),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				setProcessing(false);
			});
		}
	};

	// When error returns from submit
	const detailSubmitErrorHandler = (error: string) =>
		createToasts({
			title: error,
			context: 'error',
			timeout: TOASTS_TIMEOUT_DEFAULT,
		});

	// When item/row is active/disable toggled
	const itemToggleHandler = (ids: selectedArrayProps) => {
		const master: selectedArrayProps = [...ids];
		setProcessing(true);
		toggleMenuItems(master).then((response) => {
			reloadMenuItems();
			createToasts({
				title: t('messages:success.itemUpdated', { count: master.length }),
				context: 'success',
				timeout: TOASTS_TIMEOUT_DEFAULT,
			});
			setProcessing(false);
		});
	};

	// When item/row opens confirm dialog
	const itemDeleteHandler = (ids: selectedArrayProps) => {
		const master: selectedArrayProps = [...ids];
		setConfirmDialog(true);
		setConfirmDialogData(master);
	};

	// When item/row is confirmed to submit confirm dialog
	const itemDeleteConfirmHandler = () => {
		const master: selectedArrayProps = [...confirmDialogData];
		setProcessing(true);
		deleteMenuItems(master).then((response) => {
			reloadMenuItems();
			createToasts({
				title: t('messages:success.itemDeleted', { count: master.length }),
				context: 'success',
				timeout: TOASTS_TIMEOUT_DEFAULT,
			});
			closeConfirmHandler();
			closeDetailHandler();
			setProcessing(false);
		});
	};

	// When confirm dialog closes
	const closeConfirmHandler = () => {
		setConfirmDialog(false);
		setConfirmDialogData([]);
	};

	return (
		<>
			<div>
				<Drawer
					isOpen={drawerOpen}
					onClose={closeDetailHandler}
					title={detailData?.id == 'new' ? 'New menu item' : detailData?.name}
					headingChildren={
						<ModuleLanguageToggle
							language={lang}
							languageList={languageList}
							onChange={(lng) => setLang(lng)}
							style={{ marginRight: '.75rem' }}
						/>
					}
				>
					<>
						{detail && detailData && (
							<MenuItemsDetailForm
								menuId={menuId}
								detailData={detailData}
								onSubmit={itemSubmitHandler}
								onSubmitError={detailSubmitErrorHandler}
								onToggle={itemToggleHandler}
								onDelete={itemDeleteHandler}
								languageList={languageList}
								language={lang}
								onCancel={closeDetailHandler}
							/>
						)}
					</>
				</Drawer>
			</div>
			<div>
				{MenuItems ? (
					<MenuItemsList
						menuId={menuId}
						items={getMenuItems(MenuItems, menuId)}
						onEdit={(id) => openDetailHandler(id)}
						onToggle={(id) => itemToggleHandler([id])}
						onDelete={(id) => itemDeleteHandler([id])}
					/>
				) : (
					<Preloader.Block />
				)}
			</div>
			<Stack spacing={2} direction="row" justifyContent="flex-end">
				<ButtonCreate onClick={() => openDetailHandler('new')}>
					{t('new.MenuItems')}
				</ButtonCreate>
			</Stack>
			<ConfirmDialog
				isOpen={confirmDialog}
				onClose={closeConfirmHandler}
				confirmMethod="delete"
				onConfirm={itemDeleteConfirmHandler}
				confirmData={confirmDialogData}
			/>
		</>
	);
};

export default MenuItemsManager;
