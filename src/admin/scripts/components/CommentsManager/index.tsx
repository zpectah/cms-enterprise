import React, { Children, useCallback, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import styled from 'styled-components';

import { useComments } from '../../hooks/model';
import { useProfile } from '../../hooks/common';
import { CommentsItemProps } from '../../types/model';
import {
	Preloader,
	Drawer,
	Button,
	Typography,
	Form,
	Input,
	Section,
	ConfirmDialog,
} from '../ui';
import ReplyForm from './ReplyForm';
import { confirmDialogTypeProps, selectedArrayProps } from '../../types/table';

const ListWrapper = styled.div``;
const ItemChildrenWrapper = styled.div`
	margin-bottom: 1rem;
	padding-left: ${(props) => props.theme.spacer};
`;

interface CommentsManagerProps {
	assigned: 'post' | 'category' | 'product';
	assignedId: string | number;
	editAllComments?: boolean;
}

const CommentsManager = ({
	assigned,
	assignedId,
	editAllComments,
}: CommentsManagerProps) => {
	const {
		Comments,
		createComments,
		updateComments,
		deleteComments,
		reloadComments,
		confirmComments,
		cancelComments,
		toggleComments,
		comments_loading,
		comments_error,
	} = useComments();
	const { Profile } = useProfile();
	const { t } = useTranslation(['common', 'form', 'messages', 'components']);
	const [currentCommentsList, setCurrentCommentsList] = useState<
		CommentsItemProps[]
	>([]);
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
	const [replyData, setReplyData] = useState<CommentsItemProps>(null);
	const [processing, setProcessing] = useState<boolean>(false);
	const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
	const [confirmDialogType, setConfirmDialogType] =
		useState<confirmDialogTypeProps>(null);
	const [confirmDialogData, setConfirmDialogData] =
		useState<selectedArrayProps>([]);
	const [commentsOpen, setCommentsOpen] = useState<boolean>(false);

	const setCurrentList = useCallback(() => {
		let tmp = [];
		Comments?.map((comment) => {
			if (
				comment.assigned == assigned &&
				comment.assigned_id == assignedId &&
				comment.parent == 0
			)
				tmp.push(comment);
		});

		setCurrentCommentsList(tmp);
	}, [Comments]);

	const setReplyFormModel = (id: number | string) => {
		setDrawerOpen(true);
		const parent = Comments?.find((item) => item.id == id);
		if (parent)
			setReplyData({
				mode: 'reply',
				email: Profile.email,
				parent: id,
				title: `RE: ${parent.title}`,
				content: '',
				assigned: parent.assigned,
				assigned_id: parent.assigned_id,
			});
	};

	const setEditFormModel = (id: number | string) => {
		setDrawerOpen(true);
		const parent = Comments?.find((item) => item.id == id);
		if (parent)
			setReplyData({
				...parent,
				mode: 'edit',
			});
	};

	const getItemChildren = (id: number | string) => {
		let a = [];
		Comments?.map((item) => {
			if (item.parent == id) a.push(item);
		});

		return a;
	};

	const renderItem = (
		item: CommentsItemProps,
		children: CommentsItemProps[],
	) => {
		const is_my_comment: boolean = Profile?.email == item.email;
		const is_editable = editAllComments || is_my_comment;

		return (
			<div key={item.id}>
				<Card style={{ marginBottom: '.5rem' }}>
					<CardContent>
						<Typography.Title h5>{item.title}</Typography.Title>
						<Typography.Paragraph>{item.content}</Typography.Paragraph>
						<Stack spacing={2} direction="row" justifyContent="space-between">
							<Typography.Paragraph small>
								<b>{item.email}</b> {is_my_comment && ' *'}
							</Typography.Paragraph>
							<Typography.Paragraph small>{item.created}</Typography.Paragraph>
						</Stack>
					</CardContent>
					<CardActions>
						<Button onClick={() => setReplyFormModel(item.id)} size="small">
							{t('button.reply')}
						</Button>
						<Button
							onClick={() => setEditFormModel(item.id)}
							size="small"
							color="secondary"
							disabled={!is_editable}
						>
							{t('button.edit')}
						</Button>
						<Button
							onClick={() => itemDeleteHandler(item.id)}
							size="small"
							color="error"
						>
							{t('button.delete')}
						</Button>
					</CardActions>
				</Card>
				{children && <ItemChildrenWrapper>{children}</ItemChildrenWrapper>}
			</div>
		);
	};

	const renderList = (items: CommentsItemProps[]) => {
		items.sort(function (a, b) {
			let valA = a.id;
			let valB = b.id;

			if (valA < valB) return -1;
			if (valA > valB) return 1;
			return 0;
		});

		return (
			<>
				{items.map((item) =>
					renderItem(item, renderList(getItemChildren(item.id))),
				)}
			</>
		);
	};

	const submitFormHandler = (data: CommentsItemProps) => {
		const master: CommentsItemProps = _.cloneDeep(data);
		setProcessing(true);

		if (data.mode == 'reply') {
			createComments(master).then((response) => {
				reloadComments();
				setProcessing(false);
				setDrawerOpen(false);
				setReplyData(null);
			});
		} else if (data.mode == 'edit') {
			updateComments(master).then((response) => {
				reloadComments();
				setProcessing(false);
				setDrawerOpen(false);
				setReplyData(null);
			});
		}
	};

	const getChildrenList = (id) => {
		let this_item_children = getItemChildren(id);
		let a = [...this_item_children];

		if (this_item_children)
			this_item_children.map((item) => {
				a = [...a, ...getChildrenList(item.id)];
			});

		return a;
	};

	const deleteConfirmHandler = () => {
		const master: selectedArrayProps = [...confirmDialogData];
		setProcessing(true);
		getChildrenList(confirmDialogData[0]).map((item) => {
			master.push(item.id);
		});
		deleteComments(master).then((response) => {
			reloadComments();
			closeConfirmHandler();
			setProcessing(false);
		});
	};

	const itemDeleteHandler = (id: number | string) => {
		const master: selectedArrayProps = [id];

		setConfirmDialog(true);
		setConfirmDialogType('delete');
		setConfirmDialogData(master);
	};

	const closeConfirmHandler = () => {
		setConfirmDialog(false);
		setConfirmDialogType(null);
		setConfirmDialogData([]);
	};

	useEffect(() => setCurrentList(), [Comments]);

	return (
		<>
			<Button
				color="secondary"
				variant="outlined"
				size="small"
				onClick={() => setCommentsOpen(!commentsOpen)}
				style={{ marginBottom: '1rem' }}
				disabled={currentCommentsList.length == 0}
			>
				{commentsOpen
					? t('components:CommentsManager.button.closeComments')
					: t('components:CommentsManager.button.openComments')}
			</Button>
			{commentsOpen && (
				<ListWrapper>{renderList(currentCommentsList)}</ListWrapper>
			)}
			<Drawer
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				title={replyData?.title || t('components:CommentsManager.button.reply')}
			>
				{replyData ? (
					<ReplyForm formData={replyData} onSubmit={submitFormHandler} />
				) : (
					<Preloader.Block />
				)}
			</Drawer>
			<Preloader.Bar isProcessing={comments_loading || processing} />
			<ConfirmDialog
				isOpen={confirmDialog}
				onClose={closeConfirmHandler}
				confirmMethod={confirmDialogType}
				onConfirm={deleteConfirmHandler}
				confirmData={confirmDialogData}
			/>
		</>
	);
};

export default CommentsManager;
