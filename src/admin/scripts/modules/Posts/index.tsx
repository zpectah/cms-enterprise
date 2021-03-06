import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import {
	ROUTES,
	ROUTE_SUFFIX,
	TOASTS_TIMEOUT_DEFAULT,
	USER_LEVEL_NUMS,
} from '../../constants';
import { moduleObjectProps } from '../../types/app';
import { PostsItemProps, PostsItemLangProps } from '../../types/model';
import {
	selectedArrayProps,
	selectedItemsProps,
	confirmDialogTypeProps,
} from '../../types/table';
import { usePosts } from '../../hooks/model';
import getDetailData from '../../utils/getDetailData';
import { useSettings, useProfile } from '../../hooks/common';
import { ConfirmDialog, Preloader } from '../../components/ui';
import DataTable from '../../components/DataTable';
import PostsDetailForm from './PostsDetailForm';
import { useToasts } from '../../hooks/common';
import { getLanguagesFields } from '../../utils/detail';
import { string } from '../../../../../utils/utils';

interface PostsModuleProps {}

const PostsModule = ({}: PostsModuleProps) => {
	const params: any = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'messages']);
	const [detail, setDetail] = useState<string | number>(null);
	const [detailData, setDetailData] = useState<PostsItemProps>(null);
	const [selectedItems, setSelectedItems] = useState<selectedItemsProps>([]);
	const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
	const [confirmDialogType, setConfirmDialogType] =
		useState<confirmDialogTypeProps>(null);
	const [confirmDialogData, setConfirmDialogData] =
		useState<selectedArrayProps>([]);
	const [isProcessing, setProcessing] = useState<boolean>(false);
	const { createToasts, createErrorToast } = useToasts(dispatch);
	const { Settings } = useSettings();
	const { Profile } = useProfile();
	const {
		Posts,
		createPosts,
		updatePosts,
		togglePosts,
		deletePosts,
		reloadPosts,
		posts_loading,
		posts_error,
	} = usePosts();
	const moduleObject: moduleObjectProps = {
		model: 'Posts',
		route: ROUTES.app.posts,
		detail: {},
		table: {
			tableCells: {
				name: ['left', 'auto'],
				type: ['left', '150px'],
				active: ['right', '125px'],
			},
			tableSearchProps: [
				'name',
				'lang.[lang].title',
				'lang.[lang].description',
				'lang.[lang].content',
			],
		},
	};
	const createNewCallback = () =>
		history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/new`);
	const openDetailHandler = (id: string, redirect?: boolean) => {
		const detail = getDetailData(id, 'Posts', Posts);
		if (id == 'new')
			detail['lang'] = getLanguagesFields(Settings?.language_active, {
				title: '',
				description: '',
				content: '',
			} as PostsItemLangProps);
		setDetail(id);
		setDetailData(detail);
		if (redirect)
			history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/${id}`);
	};
	const closeDetailHandler = () => {
		setDetail(null);
		setDetailData(null);
		history.push(moduleObject.route.path);
	};
	const itemSelectHandler = (selected: readonly string[]) =>
		setSelectedItems(selected);
	const detailSubmitHandler = (data: PostsItemProps) => {
		const master: PostsItemProps = _.cloneDeep(data);
		setProcessing(true);
		// reformat data before save
		master.name = master.name.split(' ').join('-');
		master.published = moment(master.published).format();
		master.event_start = moment(master.event_start).format();
		master.event_end = moment(master.event_end).format();
		if (master.id == 'new') master.author = Number(Profile.id);
		if (master.id == 'new') {
			createPosts(master).then((response) => {
				reloadPosts();
				closeDetailHandler();
				createToasts({
					title: t('messages:success.itemCreated'),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				setProcessing(false);
			});
		} else {
			updatePosts(master).then((response) => {
				reloadPosts();
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
	const detailSubmitErrorHandler = (error: string) => createErrorToast(error);
	const detailCancelHandler = (dirty: boolean) => {
		if (dirty) {
			setConfirmDialog(true);
			setConfirmDialogType('formDirty');
		} else {
			closeDetailHandler();
		}
	};
	const itemDeleteHandler = (ids: selectedArrayProps) => {
		const master: selectedArrayProps = [...ids];
		setConfirmDialog(true);
		setConfirmDialogType('delete');
		setConfirmDialogData(master);
	};
	const closeConfirmHandler = () => {
		setConfirmDialog(false);
		setConfirmDialogType(null);
		setConfirmDialogData([]);
	};
	const itemToggleHandler = (ids: selectedArrayProps) => {
		const master: selectedArrayProps = [...ids];
		setProcessing(true);
		togglePosts(master).then((response) => {
			reloadPosts();
			setSelectedItems([]);
			createToasts({
				title: t('messages:success.itemUpdated', { count: master.length }),
				context: 'success',
				timeout: TOASTS_TIMEOUT_DEFAULT,
			});
			setProcessing(false);
		});
	};
	const dialogConfirmHandler = () => {
		if (confirmDialogType == 'delete') {
			const master: selectedArrayProps = [...confirmDialogData];
			setProcessing(true);
			deletePosts(master).then((response) => {
				reloadPosts();
				setSelectedItems([]);
				closeConfirmHandler();
				createToasts({
					title: t('messages:success.itemDeleted', { count: master.length }),
					context: 'success',
					timeout: TOASTS_TIMEOUT_DEFAULT,
				});
				setProcessing(false);
				if (master.length == 1) history.push(moduleObject.route.path);
			});
		} else if (confirmDialogType == 'formDirty') {
			closeConfirmHandler();
			history.push(moduleObject.route.path);
		}
	};
	const shouldApproveHandler = () => {
		return (
			Settings?.content_redactor_approval &&
			Profile?.user_level <= USER_LEVEL_NUMS.redactor
		);
	};
	const toggleDetail = () => {
		if (params.id) {
			setDetail(params.id);
			openDetailHandler(params.id);
		} else {
			setDetailData(null);
		}
	};
	const createFromTemplateHandler = (id: number | string) => {
		const detail = getDetailData('new', 'Posts', Posts);
		const templateDetail = getDetailData(id, 'Posts', Posts);
		detail['lang'] = getLanguagesFields(Settings?.language_active, {
			title: '',
			description: '',
			content: '',
		} as PostsItemLangProps);
		const newDetailData = {
			...detail,
			type: templateDetail.type,
			name: `copy-${templateDetail.name}`,
			categories: templateDetail.categories,
			tags: templateDetail.tags,
			event_location:
				templateDetail.type == 'event' ? templateDetail.event_location : '',
			event_address:
				templateDetail.type == 'event' ? templateDetail.event_address : '',
			event_country:
				templateDetail.type == 'event' ? templateDetail.event_country : '',
			event_city:
				templateDetail.type == 'event' ? templateDetail.event_city : '',
			event_zip: templateDetail.type == 'event' ? templateDetail.event_zip : '',
			lang: {
				...templateDetail.lang,
			},
		};
		setDetail('new');
		setDetailData(newDetailData);
		history.push(`${moduleObject.route.path}${ROUTE_SUFFIX.detail}/new`);
		setTimeout(() => setDetailData(newDetailData), 125); // Fix data ...
	};

	useEffect(() => {
		if (Posts) toggleDetail();
	}, [params.id, Posts]);

	return (
		<>
			{Posts ? (
				<>
					{detail && detailData ? (
						<PostsDetailForm
							key={`${moduleObject.model}-${detail}`}
							detailData={detailData}
							detailOptions={moduleObject.detail}
							onSubmit={detailSubmitHandler}
							onSubmitError={detailSubmitErrorHandler}
							onCancel={detailCancelHandler}
							onDelete={(id) => itemDeleteHandler([id])}
							languageList={Settings?.language_active}
							languageDefault={Settings?.language_default}
							onCreateCallback={createNewCallback}
							shouldApprove={shouldApproveHandler()}
							isProcessing={isProcessing}
							allItems={Posts}
							profileLevel={Profile?.user_level}
							profileId={Profile?.id}
						/>
					) : (
						<DataTable
							model={moduleObject.model}
							routeObject={moduleObject.route}
							tableData={Posts}
							tableCells={moduleObject.table.tableCells}
							tableSearchProps={moduleObject.table.tableSearchProps}
							selectedItems={selectedItems}
							onToggle={itemToggleHandler}
							onDelete={itemDeleteHandler}
							onSelect={itemSelectHandler}
							languageList={Settings?.language_active}
							languageDefault={Settings?.language_default}
							onCreateCallback={createNewCallback}
							customActionTriggers={[
								{
									key: 'post_create_from_template',
									label: t('button.duplicate'),
									callback: createFromTemplateHandler,
									disabled: false,
								},
							]}
						/>
					)}
				</>
			) : (
				<Preloader.Block />
			)}
			<Preloader.Bar isProcessing={isProcessing || posts_loading} />
			<ConfirmDialog
				isOpen={confirmDialog}
				onClose={closeConfirmHandler}
				confirmMethod={confirmDialogType}
				onConfirm={dialogConfirmHandler}
				confirmData={confirmDialogData}
			/>
		</>
	);
};

export default PostsModule;
