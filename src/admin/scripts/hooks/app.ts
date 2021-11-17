import useSWR, { mutate } from 'swr';

import { get, post, postRaw } from '../utils/api';
import { PostsItemProps, CategoriesItemProps } from '../types/model';

export function usePosts() {
	return {
		Posts: [
			{
				id: 1,
				name: 'Post 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Post 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Post 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Post 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Post 5 name',
				active: true,
			},
		],
		posts_loading: false,
		posts_error: false,
		reloadPosts: () => {},
		createPosts: (data: PostsItemProps) => {
			console.log(`create Posts`, data);
		},
		updatePosts: (data: PostsItemProps) => {
			console.log(`update Posts`, data);
		},
		togglePosts: (data: (number | string)[]) => {
			console.log(`toggle Posts`, data);
		},
		deletePosts: (data: (number | string)[]) => {
			console.log(`delete Posts`, data);
		},
	};
}

export function useCategories() {
	return {
		Categories: [
			{
				id: 1,
				name: 'Category 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Category 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Category 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Category 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Category 5 name',
				active: true,
			},
		],
		categories_loading: false,
		categories_error: false,
		reloadCategories: () => {},
		createCategories: (data: CategoriesItemProps) => {
			console.log(`create Categories`, data);
		},
		updateCategories: (data: CategoriesItemProps) => {
			console.log(`update Categories`, data);
		},
		toggleCategories: (data: (number | string)[]) => {
			console.log(`toggle Categories`, data);
		},
		deleteCategories: (data: (number | string)[]) => {
			console.log(`delete Categories`, data);
		},
	};
}

export function useMenu() {
	return {
		Menu: [
			{
				id: 1,
				name: 'Menu 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Menu 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Menu 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Menu 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Menu 5 name',
				active: true,
			},
		],
		menu_loading: false,
		menu_error: false,
		reloadMenu: () => {},
		createMenu: (data: CategoriesItemProps) => {
			console.log(`create Menu`, data);
		},
		updateMenu: (data: CategoriesItemProps) => {
			console.log(`update Menu`, data);
		},
		toggleMenu: (data: (number | string)[]) => {
			console.log(`toggle Menu`, data);
		},
		deleteMenu: (data: (number | string)[]) => {
			console.log(`delete Menu`, data);
		},
	};
}

export function useMenuItems() {
	return {
		MenuItems: [
			{
				id: 1,
				name: 'MenuItem 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'MenuItem 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'MenuItem 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'MenuItem 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'MenuItem 5 name',
				active: true,
			},
		],
		menuItems_loading: false,
		menuItems_error: false,
		reloadMenuItems: () => {},
		createMenuItems: (data: CategoriesItemProps) => {
			console.log(`create MenuItems`, data);
		},
		updateMenuItems: (data: CategoriesItemProps) => {
			console.log(`update MenuItems`, data);
		},
		toggleMenuItems: (data: (number | string)[]) => {
			console.log(`toggle MenuItems`, data);
		},
		deleteMenuItems: (data: (number | string)[]) => {
			console.log(`delete MenuItems`, data);
		},
	};
}

export function usePages() {
	return {
		Pages: [
			{
				id: 1,
				name: 'Page 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Page 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Page 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Page 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Page 5 name',
				active: true,
			},
		],
		pages_loading: false,
		pages_error: false,
		reloadPages: () => {},
		createPages: (data: CategoriesItemProps) => {
			console.log(`create Pages`, data);
		},
		updatePages: (data: CategoriesItemProps) => {
			console.log(`update Pages`, data);
		},
		togglePages: (data: (number | string)[]) => {
			console.log(`toggle Pages`, data);
		},
		deletePages: (data: (number | string)[]) => {
			console.log(`delete Pages`, data);
		},
	};
}

export function useTags() {
	return {
		Tags: [
			{
				id: 1,
				name: 'Tag 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Tag 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Tag 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Tag 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Tag 5 name',
				active: true,
			},
		],
		tags_loading: false,
		tags_error: false,
		reloadTags: () => {},
		createTags: (data: CategoriesItemProps) => {
			console.log(`create Tags`, data);
		},
		updateTags: (data: CategoriesItemProps) => {
			console.log(`update Tags`, data);
		},
		toggleTags: (data: (number | string)[]) => {
			console.log(`toggle Tags`, data);
		},
		deleteTags: (data: (number | string)[]) => {
			console.log(`delete Tags`, data);
		},
	};
}

export function useTranslations() {
	return {
		Translations: [
			{
				id: 1,
				name: 'Translation 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Translation 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Translation 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Translation 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Translation 5 name',
				active: true,
			},
		],
		translations_loading: false,
		translations_error: false,
		reloadTranslations: () => {},
		createTranslations: (data: CategoriesItemProps) => {
			console.log(`create Translations`, data);
		},
		updateTranslations: (data: CategoriesItemProps) => {
			console.log(`update Translations`, data);
		},
		toggleTranslations: (data: (number | string)[]) => {
			console.log(`toggle Translations`, data);
		},
		deleteTranslations: (data: (number | string)[]) => {
			console.log(`delete Translations`, data);
		},
	};
}

export function useUploads() {
	return {
		Uploads: [
			{
				id: 1,
				name: 'Upload 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Upload 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Upload 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Upload 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Upload 5 name',
				active: true,
			},
		],
		uploads_loading: false,
		uploads_error: false,
		reloadUploads: () => {},
		createUploads: (data: CategoriesItemProps) => {
			console.log(`create Uploads`, data);
		},
		updateUploads: (data: CategoriesItemProps) => {
			console.log(`update Uploads`, data);
		},
		toggleUploads: (data: (number | string)[]) => {
			console.log(`toggle Uploads`, data);
		},
		deleteUploads: (data: (number | string)[]) => {
			console.log(`delete Uploads`, data);
		},
	};
}

export function useUsers() {
	return {
		Users: [
			{
				id: 1,
				name: 'User 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'User 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'User 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'User 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'User 5 name',
				active: true,
			},
		],
		users_loading: false,
		users_error: false,
		reloadUsers: () => {},
		createUsers: (data: CategoriesItemProps) => {
			console.log(`create Users`, data);
		},
		updateUsers: (data: CategoriesItemProps) => {
			console.log(`update Users`, data);
		},
		toggleUsers: (data: (number | string)[]) => {
			console.log(`toggle Users`, data);
		},
		deleteUsers: (data: (number | string)[]) => {
			console.log(`delete Users`, data);
		},
	};
}
