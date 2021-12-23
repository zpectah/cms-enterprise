import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import CardContent from '@mui/material/CardContent';
import styled, { css } from 'styled-components';

import { usePosts } from '../../hooks/model';
import { Preloader } from '../ui';
import TileBase from './TileBase';

const reactCalendarHeatmapStyles = css`
	.react-calendar-heatmap text {
		font-size: 0.9rem;
		fill: #aaa;
	}
	.react-calendar-heatmap .react-calendar-heatmap-small-text {
		font-size: 0.5rem;
	}
	.react-calendar-heatmap .color-empty {
		fill: #eeeeee;
	}
	.react-calendar-heatmap .color-empty:hover {
		fill: #ededed;
	}
	.react-calendar-heatmap .color-scale-5 {
		fill: rgb(255, 224, 178);
	}
	.react-calendar-heatmap .color-scale-10 {
		fill: rgb(255, 204, 128);
	}
	.react-calendar-heatmap .color-scale-15 {
		fill: rgb(255, 183, 77);
	}
	.react-calendar-heatmap .color-scale-20 {
		fill: rgb(255, 167, 38);
	}
	.react-calendar-heatmap .color-scale-30 {
		fill: rgb(255, 152, 0);
	}
	.react-calendar-heatmap .color-scale-40 {
		fill: rgb(251, 140, 0);
	}
	.react-calendar-heatmap .color-scale-50 {
		fill: rgb(245, 124, 0);
	}
	.react-calendar-heatmap .color-scale-51 {
		fill: rgb(239, 108, 0);
	}
	.react-calendar-heatmap .is-value:hover {
		fill: #555;
	}
`;
const Wrapper = styled.div`
	width: 100%;
	height: auto;

	${reactCalendarHeatmapStyles}
`;

interface mapItemProps {
	count: number;
	date: string;
}
interface PostsCalendarTileProps {}

const PostsCalendarTile = ({}: PostsCalendarTileProps) => {
	const { Posts, posts_loading } = usePosts();
	const { t } = useTranslation(['common']);
	const [mapModel, setMapModel] = useState([]);

	const setMapModelData = () => {
		let tmp = [];

		Posts?.map((item) => {
			let foundIndex;
			let date = moment(item.published).format('YYYY-MM-DD');
			tmp.find((item2, index) => {
				if (item2.date == date) foundIndex = index;
			});
			if (foundIndex) {
				tmp[foundIndex].count = tmp[foundIndex].count + 1;
			} else {
				tmp.push({
					count: 1,
					date: date,
				});
			}
		});

		setMapModel(tmp);
	};

	const getColorClass = (value: mapItemProps) => {
		if (!value) return 'color-empty';

		let className = 'color-empty';
		if (value.count <= 5) className = 'is-value color-scale-5';
		if (value.count > 5 && value.count <= 10)
			className = 'is-value color-scale-10';
		if (value.count > 10 && value.count <= 15)
			className = 'is-value color-scale-15';
		if (value.count > 15 && value.count <= 20)
			className = 'is-value color-scale-20';
		if (value.count > 20 && value.count <= 30)
			className = 'is-value color-scale-30';
		if (value.count > 30 && value.count <= 40)
			className = 'is-value color-scale-40';
		if (value.count > 40 && value.count <= 50)
			className = 'is-value color-scale-50';
		if (value.count > 50) className = 'is-value color-scale-51';

		return className;
	};

	useEffect(() => setMapModelData(), [Posts]);

	return (
		<TileBase width={'100%'} title={t('dashboard.title.PostsCalendar')}>
			<CardContent>
				<Wrapper>
					{!posts_loading ? (
						<CalendarHeatmap
							startDate={moment().day(-180).format('YYYY-MM-DD')}
							endDate={moment()
								.day(+180)
								.format('YYYY-MM-DD')}
							values={mapModel}
							showMonthLabels={false}
							// showWeekdayLabels={true}
							// weekdayLabels={['po', 'út', 'st', 'čt', 'pá', 'so', 'ne']}
							classForValue={getColorClass}
							titleForValue={(value) => {
								if (value) return `${value.date}: ${value.count}`;
							}}
						/>
					) : (
						<Preloader.Block />
					)}
				</Wrapper>
			</CardContent>
		</TileBase>
	);
};

export default PostsCalendarTile;
