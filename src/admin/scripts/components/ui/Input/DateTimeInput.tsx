import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker, { DateTimePickerProps } from '@mui/lab/DateTimePicker';

const DateTimeInput = (props: DateTimePickerProps) => (
	<LocalizationProvider dateAdapter={AdapterDateFns}>
		<DateTimePicker
			ampm={false}
			ampmInClock={false}
			showTodayButton
			{...props}
		/>
	</LocalizationProvider>
);

export default DateTimeInput;
