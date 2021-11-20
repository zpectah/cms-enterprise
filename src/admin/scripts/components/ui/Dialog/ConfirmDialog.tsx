import React, { useEffect, useState } from 'react';
import {
	default as MuiDialog,
	DialogProps as MuiDialogProps,
} from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import WarningIcon from '@mui/icons-material/Warning';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button } from '../index';
import { getElTestAttr } from '../../../utils/tests';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
`;
const MediaBlock = styled.div`
	padding-top: ${(props) => props.theme.spacer};
	padding-bottom: ${(props) => props.theme.spacer};
	display: flex;
	align-items: center;
	justify-content: center;
`;
const ContentBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
const MessageBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;
const ActionsBlock = styled.div`
	padding-top: ${(props) => props.theme.spacer};
	padding-bottom: ${(props) => props.theme.spacer};
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export interface ConfirmDialogProps {
	isOpen?: boolean;
	onClose?: () => void;
	labeledBy?: string;
	describedBy?: string;
	size?: MuiDialogProps['maxWidth'];
	scroll?: MuiDialogProps['scroll'];
	dividers?: boolean;
	dataAppId?: string;
	confirmMethod: 'delete' | 'formDirty' | 'logOut';
	onConfirm: () => void;
	confirmData?: (number | string)[];
}

const Transition = React.forwardRef(function Transition(props: any, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const ConfirmDialog = ({
	isOpen = false,
	onClose,
	labeledBy = 'modal-confirm-title',
	describedBy = 'modal-confirm-description',
	size = 'xs',
	scroll = 'paper',
	dividers,
	confirmMethod,
	onConfirm,
	confirmData = [],
	dataAppId = 'dialog.confirm',
}: ConfirmDialogProps) => {
	const { t } = useTranslation(['common', 'messages', 'components']);
	const [open, setOpen] = useState<boolean>(isOpen);
	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose();
	};

	useEffect(() => setOpen(isOpen), [isOpen]);

	return (
		<>
			<MuiDialog
				onClose={handleClose}
				open={open}
				TransitionComponent={Transition}
				maxWidth={size}
				scroll={scroll}
				aria-describedby={describedBy}
				aria-labelledby={labeledBy}
				fullWidth
			>
				<div {...getElTestAttr(dataAppId)}>
					<DialogContent dividers={dividers}>
						<Wrapper>
							<MediaBlock>
								<WarningIcon fontSize="large" />
							</MediaBlock>
							<ContentBlock>
								<MessageBlock>
									<>
										{
											{
												delete: t('components:DialogConfirm.title.delete', {
													count: confirmData.length ? confirmData.length : 1,
												}),
												formDirty: t(
													'components:DialogConfirm.title.formDirty',
												),
												logOut: t('components:DialogConfirm.title.logOut'),
											}[confirmMethod]
										}
									</>
								</MessageBlock>
								<ActionsBlock>
									<Stack spacing={4} direction="row">
										<Button
											variant="outlined"
											color="secondary"
											onClick={onClose}
											dataAppId={`${dataAppId}.button.cancel`}
											size="large"
										>
											{t('button.no')}
										</Button>
										<Button
											variant="contained"
											color="primary"
											onClick={onConfirm}
											dataAppId={`${dataAppId}.button.confirm`}
											size="large"
										>
											{t('button.yes')}
										</Button>
									</Stack>
								</ActionsBlock>
							</ContentBlock>
						</Wrapper>
					</DialogContent>
					<IconButton
						aria-label="close"
						onClick={onClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
						{...getElTestAttr('dialog.confirm.close')}
					>
						<CloseIcon />
					</IconButton>
				</div>
			</MuiDialog>
		</>
	);
};

export default ConfirmDialog;
