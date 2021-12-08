import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useForm, Controller } from 'react-hook-form';

import { EMAIL_REGEX } from '../../constants';
import { Input } from '../ui';
import getPickerInitialValue from '../../utils/getPickerInitialValue';
import { getElTestAttr } from '../../utils/tests';

export interface ArrayPickerInitialProps {
	value: any;
	onChange: (value: any) => void;
	multiple?: boolean;
	dataTestId?: string;
}

interface ArrayPickerBaseProps extends ArrayPickerInitialProps {
	type?: 'email' | 'phone' | 'text';
}

const ArrayPickerBase = ({
	type = 'text',
	value,
	onChange,
	multiple,
	dataTestId = 'ArrayPickerBase',
}: ArrayPickerBaseProps) => {
	const [selectedItems, setSelectedItems] = useState(
		getPickerInitialValue(value),
	);
	const { control, handleSubmit, reset, formState } = useForm({
		mode: 'all',
		defaultValues: {
			value: '',
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
			console.warn('Item is already in field');
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
			console.warn('Item is not exist');
		}
		setSelectedItems(tmp_list);
	};
	const should_show_input =
		(multiple && selectedItems.length >= 0) ||
		(!multiple && selectedItems.length == 0);
	const input_rules = {
		required: true,
		pattern: type == 'email' && EMAIL_REGEX,
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
			{should_show_input && (
				<Stack spacing={1} direction="row">
					<Controller
						name="value"
						control={control}
						rules={input_rules}
						render={({ field: { onChange, onBlur, value, ref, name } }) => (
							<Input.Text
								type={type}
								id={`${dataTestId}__${type}.value`}
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								name={name}
								label={`New ${type}`}
								dataTestId={`${dataTestId}.input.${type}_new`}
							/>
						)}
					/>
					<IconButton
						color="success"
						aria-label={`add ${type}`}
						component="span"
						onClick={handleSubmit(submitHandler)}
						disabled={!isValid}
						{...getElTestAttr(`${dataTestId}.button.${type}_new.add`)}
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
								{...getElTestAttr(`${dataTestId}.chip.${type}_${index}.delete`)}
							/>
						))}
					</Stack>
				</div>
			)}
		</>
	);
};

export default ArrayPickerBase;
