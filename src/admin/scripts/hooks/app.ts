import useSWR, { mutate } from 'swr';

import { get, post, postRaw } from '../utils/api';
import { PostsItemProps } from '../types/model';

export function usePosts() {
	return {
		Posts: [
			{
				id: 1,
				name: 'item 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'item 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'item 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'item 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'item 5 name',
				active: true,
			},
		],
		posts_loading: false,
		posts_error: false,
		reloadPosts: () => {},
		createPosts: (data: PostsItemProps) => {
			console.log(`create `, data);
		},
		updatePosts: (data: PostsItemProps) => {
			console.log(`update `, data);
		},
		togglePosts: (data: (number | string)[]) => {
			console.log(`toggle `, data);
		},
		deletePosts: (data: (number | string)[]) => {
			console.log(`delete `, data);
		},
	};
}

export function useCategories() {
	return {};
}

export function useMenu() {
	return {};
}

export function useMenuItems() {
	return {};
}

export function usePages() {
	return {};
}

export function useTags() {
	return {};
}

export function useTranslations() {
	return {};
}

export function useUploads() {
	return {};
}

export function useUsers() {
	return {};
}
