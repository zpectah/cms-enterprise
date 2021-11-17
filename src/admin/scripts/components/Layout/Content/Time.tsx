import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { date } from '../../../../../../utils/utils';
import { utilsDateObjectProps } from '../../../types/app';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	font-size: 0.85rem;
	color: ${(props) => props.theme.content.breadcrumbs.color};
`;
const TimeText = styled.div`
	margin-left: ${(props) => props.theme.spacer};

	> span {
	}
`;
const DateText = styled.div``;

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
			<Wrapper>
				<DateText>
					{t(`calendar:day.${time.dayOfTheWeek}`)} {time.day}.{' '}
					{t(`calendar:month.${time.month}`)} {time.year}
				</DateText>
				<TimeText>
					{time.hour}
					<span>:</span>
					{time.minute}
					<span>:</span>
					{time.second}
				</TimeText>
			</Wrapper>
		</>
	);
};

export default Time;
