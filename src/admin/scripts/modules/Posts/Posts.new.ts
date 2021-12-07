import moment from 'moment';

import { PostsItemProps } from '../../types/model';

export default {
	id: 'new',
	type: 'article',
	name: '',
	categories: [],
	tags: [],
	event_start: moment().format(),
	event_end: moment().format(),
	event_location: '',
	event_address: '',
	event_country: '',
	event_city: '',
	event_zip: '',
	media: [],
	attachments: [],
	img_main: '',
	img_thumbnail: '',
	published: moment().format(),
	author: 0,
	approved: false,
	rating: 0,
	active: true,
} as PostsItemProps;
