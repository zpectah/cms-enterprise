import React, { useEffect, useState } from 'react';
import { default as MuiBreadcrumbs } from '@mui/material/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { date } from '../../../../../../utils/utils';
import { utilsDateObjectProps } from '../../../types/app';
import { Typography } from '../../ui';

const StyledText = styled(Typography.Paragraph)`
	color: ${(props) => props.theme.content.breadcrumbs.color};
`;

interface TimeProps {}

const Time = ({}: TimeProps) => {
	const { t } = useTranslation(['calendar']);
	const [time, setTime] = useState<utilsDateObjectProps>(date.getTodayObject());
	const interval = 1000;
	let timer: any = null;

	useEffect(() => {
		timer = setInterval(() => {
			let today = date.getTodayObject();

			setTime(today);
		}, interval);

		return () => clearInterval(timer);
	}, []);

	return (
		<>
			<MuiBreadcrumbs aria-label="breadcrumbs" separator={'  '}>
				<StyledText small>
					{t(`calendar:day.${time.dayOfTheWeek}`)} {time.day}.{' '}
					{t(`calendar:month.${time.month}`)} {time.year}
				</StyledText>
				<StyledText small>
					{time.hour}
					<span>:</span>
					{time.minute}
					<span>:</span>
					{time.second}
				</StyledText>
			</MuiBreadcrumbs>
		</>
	);
};

export default Time;
