import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

import { Button } from '../ui';

interface DetailFormActionsProps {
	formId: string;
	id: string | number;
	isValid: boolean;
	onDelete: () => void;
	onCancel: () => void;
}

const DetailFormActions = ({
	formId,
	id,
	isValid,
	onDelete,
	onCancel,
}: DetailFormActionsProps) => {
	const { t } = useTranslation(['common']);

	return (
		<>
			<Button
				type="submit"
				variant="contained"
				disabled={!isValid}
				dataTestId={`${formId}.button.submit`}
				endIcon={<SendIcon style={{ fontSize: '16px' }} />}
			>
				{id == 'new' ? t('button.create') : t('button.update')}
			</Button>
			{id !== 'new' && (
				<Button
					variant="outlined"
					color="error"
					onClick={onDelete}
					dataTestId={`${formId}.button.delete`}
				>
					{t('button.delete')}
				</Button>
			)}
			<Button
				variant="outlined"
				color="secondary"
				onClick={onCancel}
				dataTestId={`${formId}.button.return`}
			>
				{t('button.return')}
			</Button>
		</>
	);
};

export default DetailFormActions;
