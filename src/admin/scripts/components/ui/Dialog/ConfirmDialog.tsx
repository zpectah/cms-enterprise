import React from 'react';

import Dialog, { DialogProps } from './index';

export interface ConfirmDialogProps extends DialogProps {
	confirmMethod: 'delete' | 'formDirty' | 'logOut';
	onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
	const { children, confirmMethod, onConfirm, onClose, ...rest } = props;

	return (
		<Dialog size={'xs'} {...rest}>
			{
				{
					delete: (
						<>
							...delete method...{children}....
							<a onClick={onConfirm}>onConfirm</a>|
							<a onClick={onClose}>onClose</a>...
						</>
					),
					formDirty: (
						<>
							...formDirty method...{children}....
							<a onClick={onConfirm}>onConfirm</a>|
							<a onClick={onClose}>onClose</a>...
						</>
					),
					logOut: (
						<>
							...logOut method...{children}....
							<a onClick={onConfirm}>onConfirm</a>|
							<a onClick={onClose}>onClose</a>...
						</>
					),
				}[confirmMethod]
			}
		</Dialog>
	);
};

export default ConfirmDialog;
