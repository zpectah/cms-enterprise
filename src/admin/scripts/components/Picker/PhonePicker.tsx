import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useForm, Controller } from 'react-hook-form';

import { Form, Input } from '../ui';
import getPickerInitialValue from '../../utils/getPickerInitialValue';

interface PhonePickerProps {
	value: any;
	onChange: (value: any) => void;
	multiple?: boolean;
}

const PhonePicker = ({ value, onChange, multiple }: PhonePickerProps) => {
	const [selectedItems, setSelectedItems] = useState(
		getPickerInitialValue(value),
	);

	const { control, handleSubmit, reset, formState } = useForm({
		mode: 'all',
		defaultValues: {
			phone: '',
		},
	});
	const { isDirty, isValid } = formState;

	const submitHandler = (data: { phone: string }) => {
		const new_item = data.phone;
		const tmp_list = [...selectedItems];
		const index = tmp_list.indexOf(new_item);
		if (!(index > -1)) {
			tmp_list.push(new_item);
		} else {
			console.warn('Phone is already in field');
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
			console.warn('Phone is not exist');
		}
		setSelectedItems(tmp_list);
	};

	const should_show_input =
		(multiple && selectedItems.length >= 0) ||
		(!multiple && selectedItems.length == 0);

	useEffect(() => {
		if (multiple) {
			onChange(selectedItems);
		} else {
			onChange(selectedItems[0]);
		}
	}, [selectedItems]);

	return (
		<>
			{should_show_input && (
				<Stack spacing={1} direction="row">
					<Controller
						name="phone"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Input.Text
								type="tel"
								id={`PhonePicker__type.label`}
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								name={name}
								label={'New phone'}
								dataTestId={`PhonePicker.input.Phone_new`}
							/>
						)}
					/>
					<IconButton
						color="success"
						aria-label="add phone"
						component="span"
						onClick={handleSubmit(submitHandler)}
						disabled={!isValid}
					>
						<AddCircleIcon />
					</IconButton>
				</Stack>
			)}
			{selectedItems.length > 0 && (
				<div style={{ marginTop: should_show_input ? '.5rem' : '0' }}>
					<Stack spacing={1} direction="row">
						{selectedItems.map((item, index) => (
							<Chip
								color="secondary"
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

export default PhonePicker;
