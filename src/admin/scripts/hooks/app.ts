import useSWR, { mutate } from 'swr';

import { get, post, postRaw } from '../utils/api';
import { PostsItemProps, CategoriesItemProps } from '../types/model';

export function usePosts() {
	const { data, error } = useSWR(`/api/get_posts`, get);

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
		posts_loading: !data && !error,
		posts_error: error,
		reloadPosts: () => mutate(`/api/get_posts`),
		createPosts: (data: PostsItemProps) => post('/api/create_posts', data),
		updatePosts: (data: PostsItemProps) => post('/api/update_posts', data),
		togglePosts: (data: (number | string)[]) => post('/api/toggle_posts', data),
		deletePosts: (data: (number | string)[]) => post('/api/delete_posts', data),
	};
}

export function useCategories() {
	const { data, error } = useSWR(`/api/get_categories`, get);

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
		categories_loading: !data && !error,
		categories_error: error,
		reloadCategories: () => mutate(`/api/get_categories`),
		createCategories: (data: CategoriesItemProps) =>
			post('/api/create_categories', data),
		updateCategories: (data: CategoriesItemProps) =>
			post('/api/update_categories', data),
		toggleCategories: (data: (number | string)[]) =>
			post('/api/toggle_categories', data),
		deleteCategories: (data: (number | string)[]) =>
			post('/api/delete_categories', data),
	};
}

export function useMenu() {
	const { data, error } = useSWR(`/api/get_menu`, get);

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
		menu_loading: !data && !error,
		menu_error: error,
		reloadMenu: () => mutate(`/api/get_menu`),
		createMenu: (data: CategoriesItemProps) => post('/api/create_menu', data),
		updateMenu: (data: CategoriesItemProps) => post('/api/update_menu', data),
		toggleMenu: (data: (number | string)[]) => post('/api/toggle_menu', data),
		deleteMenu: (data: (number | string)[]) => post('/api/delete_menu', data),
	};
}

export function useMenuItems() {
	const { data, error } = useSWR(`/api/get_menuItems`, get);

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
		menuItems_loading: !data && !error,
		menuItems_error: error,
		reloadMenuItems: () => mutate(`/api/get_menuItems`),
		createMenuItems: (data: CategoriesItemProps) =>
			post('/api/create_menuItems', data),
		updateMenuItems: (data: CategoriesItemProps) =>
			post('/api/update_menuItems', data),
		toggleMenuItems: (data: (number | string)[]) =>
			post('/api/toggle_menuItems', data),
		deleteMenuItems: (data: (number | string)[]) =>
			post('/api/delete_menuItems', data),
	};
}

export function usePages() {
	const { data, error } = useSWR(`/api/get_pages`, get);

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
		pages_loading: !data && !error,
		pages_error: error,
		reloadPages: () => mutate(`/api/get_pages`),
		createPages: (data: CategoriesItemProps) => post('/api/create_pages', data),
		updatePages: (data: CategoriesItemProps) => post('/api/update_pages', data),
		togglePages: (data: (number | string)[]) => post('/api/toggle_pages', data),
		deletePages: (data: (number | string)[]) => post('/api/delete_pages', data),
	};
}

export function useTags() {
	const { data, error } = useSWR(`/api/get_tags`, get);

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
		tags_loading: !data && !error,
		tags_error: error,
		reloadTags: () => mutate(`/api/get_tags`),
		createTags: (data: CategoriesItemProps) => post('/api/create_tags', data),
		updateTags: (data: CategoriesItemProps) => post('/api/update_tags', data),
		toggleTags: (data: (number | string)[]) => post('/api/toggle_tags', data),
		deleteTags: (data: (number | string)[]) => post('/api/delete_tags', data),
	};
}

export function useTranslations() {
	const { data, error } = useSWR(`/api/get_translations`, get);

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
		translations_loading: !data && !error,
		translations_error: error,
		reloadTranslations: () => mutate(`/api/get_translations`),
		createTranslations: (data: CategoriesItemProps) =>
			post('/api/create_translations', data),
		updateTranslations: (data: CategoriesItemProps) =>
			post('/api/update_translations', data),
		toggleTranslations: (data: (number | string)[]) =>
			post('/api/toggle_translations', data),
		deleteTranslations: (data: (number | string)[]) =>
			post('/api/delete_translations', data),
	};
}

export function useUploads() {
	const { data, error } = useSWR(`/api/get_uploads`, get);

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
		uploads_loading: !data && !error,
		uploads_error: error,
		reloadUploads: () => mutate(`/api/get_uploads`),
		createUploads: (data: CategoriesItemProps) =>
			post('/api/create_uploads', data),
		updateUploads: (data: CategoriesItemProps) =>
			post('/api/update_uploads', data),
		toggleUploads: (data: (number | string)[]) =>
			post('/api/toggle_uploads', data),
		deleteUploads: (data: (number | string)[]) =>
			post('/api/delete_uploads', data),
	};
}

export function useUsers() {
	const { data, error } = useSWR(`/api/get_users`, get);

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
		users_loading: !data && !error,
		users_error: error,
		reloadUsers: () => mutate(`/api/get_users`),
		createUsers: (data: CategoriesItemProps) => post('/api/create_users', data),
		updateUsers: (data: CategoriesItemProps) => post('/api/update_users', data),
		toggleUsers: (data: (number | string)[]) => post('/api/toggle_users', data),
		deleteUsers: (data: (number | string)[]) => post('/api/delete_users', data),
	};
}
