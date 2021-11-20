import useSWR, { mutate } from 'swr';

import { get, post, postRaw } from '../utils/api';
import { MembersItemProps } from '../types/model';

export function useMembers() {
	const { data, error } = useSWR(`/api/get_members`, get);

	return {
		Members: [
			{
				id: 1,
				type: 'default',
				name: 'Member 1 name',
				active: true,
			},
			{
				id: 2,
				type: 'default',
				name: 'Post 2 name',
				active: false,
			},
			{
				id: 3,
				type: 'default',
				name: 'Post 3 name',
				active: true,
			},
			{
				id: 4,
				type: 'default',
				name: 'Post 4 name',
				active: true,
			},
			{
				id: 5,
				type: 'default',
				name: 'Post 5 name',
				active: true,
			},
		],
		members_loading: !data && !error,
		posts_error: error,
		reloadMembers: () => mutate(`/api/get_members`),
		createMembers: (data: MembersItemProps) =>
			post('/api/create_members', data),
		updateMembers: (data: MembersItemProps) =>
			post('/api/update_members', data),
		toggleMembers: (data: (number | string)[]) =>
			post('/api/toggle_members', data),
		deleteMembers: (data: (number | string)[]) =>
			post('/api/delete_members', data),
	};
}
