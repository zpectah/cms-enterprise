import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useForm, Controller } from 'react-hook-form';

import { EMAIL_REGEX } from '../../constants';
import { Form, Input } from '../ui';
import getPickerInitialValue from '../../utils/getPickerInitialValue';

interface EmailPickerProps {
	value: any;
	onChange: (value: any) => void;
	multiple?: boolean;
}

const EmailPicker = ({ value, onChange, multiple }: EmailPickerProps) => {
	const [selectedItems, setSelectedItems] = useState(
		getPickerInitialValue(value),
	);

	const { control, handleSubmit, reset, formState } = useForm({
		mode: 'all',
		defaultValues: {
			email: '',
		},
	});
	const { isDirty, isValid } = formState;

	const submitHandler = (data: { email: string }) => {
		const new_item = data.email;
		const tmp_list = [...selectedItems];
		const index = tmp_list.indexOf(new_item);
		if (!(index > -1)) {
			tmp_list.push(new_item);
		} else {
			console.warn('E-mail is already in field');
		}
		reset();
		setSelectedItems(tmp_list);
	};

	const removeHandler = (item: number | string) => {
		const tmp_list = [...selectedItems];
		const index = tmp_list.indexOf(item);
		if (index > -1) {
			tmp_list.splice(index, 1);
		} else {
			console.warn('E-mail is not exist');
		}
		setSelectedItems(tmp_list);
	};

	useEffect(() => {
		if (multiple) {
			onChange(selectedItems);
		} else {
			onChange(selectedItems[0]);
		}
	}, [selectedItems]);

	return (
		<>
			<Stack spacing={1} direction="row">
				<Controller
					name="email"
					control={control}
					rules={{ required: true, pattern: EMAIL_REGEX }}
					render={({ field: { onChange, onBlur, value, ref, name } }) => (
						<Input.Text
							type="email"
							id={`EmailPicker__type.label`}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							name={name}
							label={'New e-mail'}
							dataTestId={`EmailPicker.input.email_new`}
							required
						/>
					)}
				/>
				<IconButton
					color="success"
					aria-label="add e-mail"
					component="span"
					onClick={handleSubmit(submitHandler)}
					disabled={!isValid}
				>
					<AddCircleIcon />
				</IconButton>
			</Stack>
			{selectedItems.length > 0 && (
				<div style={{ marginTop: '.5rem' }}>
					<Stack spacing={1} direction="row">
						{selectedItems.map((item, index) => (
							<Chip
								label={item}
								onDelete={() => removeHandler(item)}
								key={item}
							/>
						))}
					</Stack>
				</div>
			)}
		</>
	);
};

export default EmailPicker;
