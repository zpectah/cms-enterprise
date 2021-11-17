import useSWR, { mutate } from 'swr';

import { get, post, postRaw } from '../utils/api';
import { MembersItemProps } from '../types/model';

export function useMembers() {
	return {
		Members: [
			{
				id: 1,
				name: 'Member 1 name',
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
		members_loading: false,
		posts_error: false,
		reloadMembers: () => {},
		createMembers: (data: MembersItemProps) => {
			console.log(`create Members`, data);
		},
		updateMembers: (data: MembersItemProps) => {
			console.log(`update Members`, data);
		},
		toggleMembers: (data: (number | string)[]) => {
			console.log(`toggle Members`, data);
		},
		deleteMembers: (data: (number | string)[]) => {
			console.log(`delete Members`, data);
		},
	};
}
