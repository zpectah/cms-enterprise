import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EMAIL_REGEX } from '../../constants';
import { Input, IconButton, Chip } from '../ui';
import getPickerInitialValue from '../../utils/getPickerInitialValue';

export interface ArrayPickerInitialProps {
	value: any;
	onChange: (value: any) => void;
	multiple?: boolean;
	dataTestId?: string;
	inputWidth?: string;
	inputLabel?: string;
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
	inputWidth = '75%',
	inputLabel,
}: ArrayPickerBaseProps) => {
	const { t } = useTranslation(['components']);
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
	const submitHandler = (data: { value: string }) => {
		const new_item = data.value;
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
	const input_label = inputLabel
		? inputLabel
		: t(`components:ArrayPickerBase.new_${type}`);
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
								label={input_label}
								responsiveWidth={inputWidth}
								dataTestId={`${dataTestId}.input.${type}_new`}
							/>
						)}
					/>
					<IconButton
						color="success"
						aria-label={`add ${type}`}
						onClick={handleSubmit(submitHandler)}
						disabled={!isValid}
						dataTestId={`${dataTestId}.button.${type}_new.add`}
						style={{ height: '37px' }}
					>
						<AddCircleIcon />
					</IconButton>
				</Stack>
			)}
			{selectedItems.length > 0 && (
				<div style={{ marginTop: should_show_input ? '1rem' : '0' }}>
					<Stack spacing={1} direction="row">
						{selectedItems.map((item, index) => (
							<Chip
								color="secondary"
								size="small"
								label={item}
								onDelete={() => removeHandler(item)}
								key={`${type}_${item}_${index}`}
								dataTestId={`${dataTestId}.chip.${type}-${index}.delete`}
							/>
						))}
					</Stack>
				</div>
			)}
		</>
	);
};

export default ArrayPickerBase;
