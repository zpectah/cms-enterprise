import useSWR, { mutate } from 'swr';

import config from '../config';
import { get, post, postRaw } from '../utils/api';
import {
	PostsItemProps,
	CategoriesItemProps,
	MenuItemProps,
	MenuItemItemProps,
	PagesItemProps,
	TagsItemProps,
	TranslationsItemProps,
	UploadsItemProps,
	UsersItemProps,
} from '../types/model';

const api_path_prefix = `/${config.project.path.api}`;

export function usePosts() {
	const { data, error } = useSWR(`/api/get_posts`, get);

	return {
		Posts: [
			{
				id: 1,
				type: 'article',
				name: 'Post 1 name',
				active: true,
			},
			{
				id: 2,
				type: 'blog',
				name: 'Post 2 name',
				active: false,
			},
			{
				id: 3,
				type: 'article',
				name: 'Post 3 name',
				active: true,
			},
			{
				id: 4,
				type: 'reference',
				name: 'Post 4 name',
				active: true,
			},
			{
				id: 5,
				type: 'testimonial',
				name: 'Post 5 name',
				active: true,
			},
			{
				id: 6,
				type: 'article',
				name: 'Post 6 name',
				active: true,
			},
		] as PostsItemProps[],
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
				type: 'default',
				name: 'Category 1 name',
				active: true,
			},
			{
				id: 2,
				type: 'default',
				name: 'Category 2 name',
				active: false,
			},
			{
				id: 3,
				type: 'default',
				name: 'Category 3 name',
				active: true,
			},
			{
				id: 4,
				type: 'default',
				name: 'Category 4 name',
				active: true,
			},
			{
				id: 5,
				type: 'default',
				name: 'Category 5 name',
				active: true,
			},
		] as CategoriesItemProps[],
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
				type: 'primary',
				name: 'Menu 1 name',
				active: true,
			},
			{
				id: 2,
				type: 'secondary',
				name: 'Menu 2 name',
				active: false,
			},
			{
				id: 3,
				type: 'custom',
				name: 'Menu 3 name',
				active: true,
			},
		] as MenuItemProps[],
		menu_loading: !data && !error,
		menu_error: error,
		reloadMenu: () => mutate(`/api/get_menu`),
		createMenu: (data: MenuItemProps) => post('/api/create_menu', data),
		updateMenu: (data: MenuItemProps) => post('/api/update_menu', data),
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
				type: 'default',
				name: 'MenuItem 1 name',
				active: true,
			},
			{
				id: 2,
				type: 'default',
				name: 'MenuItem 2 name',
				active: false,
			},
			{
				id: 3,
				type: 'default',
				name: 'MenuItem 3 name',
				active: true,
			},
			{
				id: 4,
				type: 'default',
				name: 'MenuItem 4 name',
				active: true,
			},
			{
				id: 5,
				type: 'default',
				name: 'MenuItem 5 name',
				active: true,
			},
		] as MenuItemItemProps[],
		menuItems_loading: !data && !error,
		menuItems_error: error,
		reloadMenuItems: () => mutate(`/api/get_menuItems`),
		createMenuItems: (data: MenuItemItemProps) =>
			post('/api/create_menuItems', data),
		updateMenuItems: (data: MenuItemItemProps) =>
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
				type: 'default',
				name: 'Page 1 name',
				active: true,
			},
			{
				id: 2,
				type: 'default',
				name: 'Page 2 name',
				active: false,
			},
			{
				id: 3,
				type: 'default',
				name: 'Page 3 name',
				active: true,
			},
			{
				id: 4,
				type: 'default',
				name: 'Page 4 name',
				active: true,
			},
			{
				id: 5,
				type: 'default',
				name: 'Page 5 name',
				active: true,
			},
		] as PagesItemProps[],
		pages_loading: !data && !error,
		pages_error: error,
		reloadPages: () => mutate(`/api/get_pages`),
		createPages: (data: PagesItemProps) => post('/api/create_pages', data),
		updatePages: (data: PagesItemProps) => post('/api/update_pages', data),
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
				type: 'default',
				name: 'Tag 1 name',
				active: true,
			},
			{
				id: 2,
				type: 'default',
				name: 'Tag 2 name',
				active: false,
			},
			{
				id: 3,
				type: 'default',
				name: 'Tag 3 name',
				active: true,
			},
			{
				id: 4,
				type: 'default',
				name: 'Tag 4 name',
				active: true,
			},
			{
				id: 5,
				type: 'default',
				name: 'Tag 5 name',
				active: true,
			},
		] as TagsItemProps[],
		tags_loading: !data && !error,
		tags_error: error,
		reloadTags: () => mutate(`/api/get_tags`),
		createTags: (data: TagsItemProps) => post('/api/create_tags', data),
		updateTags: (data: TagsItemProps) => post('/api/update_tags', data),
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
				type: 'default',
				name: 'Translation 1 name',
				active: true,
			},
			{
				id: 2,
				type: 'default',
				name: 'Translation 2 name',
				active: false,
			},
			{
				id: 3,
				type: 'default',
				name: 'Translation 3 name',
				active: true,
			},
			{
				id: 4,
				type: 'default',
				name: 'Translation 4 name',
				active: true,
			},
			{
				id: 5,
				type: 'default',
				name: 'Translation 5 name',
				active: true,
			},
		] as TranslationsItemProps[],
		translations_loading: !data && !error,
		translations_error: error,
		reloadTranslations: () => mutate(`/api/get_translations`),
		createTranslations: (data: TranslationsItemProps) =>
			post('/api/create_translations', data),
		updateTranslations: (data: TranslationsItemProps) =>
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
				type: 'image',
				name: 'Upload 1 name',
				active: true,
			},
			{
				id: 2,
				type: 'audio',
				name: 'Upload 2 name',
				active: false,
			},
			{
				id: 3,
				type: 'image',
				name: 'Upload 3 name',
				active: true,
			},
			{
				id: 4,
				type: 'document',
				name: 'Upload 4 name',
				active: true,
			},
			{
				id: 5,
				type: 'image',
				name: 'Upload 5 name',
				active: true,
			},
		] as UploadsItemProps[],
		uploads_loading: !data && !error,
		uploads_error: error,
		reloadUploads: () => mutate(`/api/get_uploads`),
		createUploads: (data: UploadsItemProps) =>
			post('/api/create_uploads', data),
		updateUploads: (data: UploadsItemProps) =>
			post('/api/update_uploads', data),
		toggleUploads: (data: (number | string)[]) =>
			post('/api/toggle_uploads', data),
		deleteUploads: (data: (number | string)[]) =>
			post('/api/delete_uploads', data),
	};
}

export function useUsers() {
	const { data, error } = useSWR(`${api_path_prefix}get_users`, get);

	return {
		Users: data?.data as UsersItemProps[],
		users_loading: !data && !error,
		users_error: error,
		reloadUsers: () => mutate(`${api_path_prefix}get_users`),
		createUsers: (data: UsersItemProps) =>
			post(`${api_path_prefix}create_users`, data),
		updateUsers: (data: UsersItemProps) =>
			post(`${api_path_prefix}update_users`, data),
		toggleUsers: (data: (number | string)[]) =>
			post(`${api_path_prefix}toggle_users`, data),
		deleteUsers: (data: (number | string)[]) =>
			post(`${api_path_prefix}delete_users`, data),
	};
}
