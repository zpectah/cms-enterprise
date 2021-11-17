import { PostsItemProps, appModelProps } from '../types/app';

export const blankDataItem = {
	Categories: {},
	Menu: {},
	Posts: {
		id: 'new',
		name: '',
		active: true,
	} as PostsItemProps,
	Pages: {},
	Tags: {},
	Translations: {},
	Uploads: {},
	Users: {},
};

export default (id: number | string, model: appModelProps, items: any[]) => {
	let item;

	if (id == 'new') {
		item = blankDataItem[model];
	} else {
		item = items.find((item) => item.id == id);
	}

	return item;
};
