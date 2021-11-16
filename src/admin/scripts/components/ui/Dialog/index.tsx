import React, { useEffect, useState } from 'react';
import {
	default as MuiDialog,
	DialogProps as MuiDialogProps,
} from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { getElTestAttr } from '../../../utils/tests';

export interface DialogProps {
	isOpen?: boolean;
	onClose?: () => void;
	labeledBy?: string;
	describedBy?: string;
	titleChildren?: React.ReactElement;
	footerChildren?: React.ReactElement;
	size?: MuiDialogProps['maxWidth'];
	scroll?: MuiDialogProps['scroll'];
	dividers?: boolean;
	dataAppId?: string;
}

const Transition = React.forwardRef(function Transition(props: any, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog: React.FC<DialogProps> = ({
	children,
	isOpen = false,
	onClose,
	labeledBy = 'modal-default-title',
	describedBy = 'modal-default-description',
	titleChildren,
	footerChildren,
	size = 'md',
	scroll = 'paper',
	dividers,
	dataAppId = 'dialog.default',
}) => {
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
					{titleChildren && (
						<DialogTitle>
							<>{titleChildren}</>
						</DialogTitle>
					)}
					<DialogContent dividers={dividers}>{children}</DialogContent>
					{footerChildren && <DialogActions>{footerChildren}</DialogActions>}
					<IconButton
						aria-label="close"
						onClick={onClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
						{...getElTestAttr('modal.close')}
					>
						<CloseIcon />
					</IconButton>
				</div>
			</MuiDialog>
		</>
	);
};

export default Dialog;
