import config from '../config';

export const init: any = {
	headers: {
		'X-App-Token': 'wmcyenyntbmxzanv', // TODO
		'Content-Type': 'application/json',
	},
};

export const get = async (url: string) => {
	// console.log('get', url);
	const response = await fetch(url, {
		method: 'GET',
		...init,
	});
	return response.json();
};

export const post = async (url: string, data: any) => {
	// console.log('post', url, data);
	const response = await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});

	return response.json();
};

export const postRaw = async (url: string, data: any) => {
	// console.log('postRaw', url, data);
	return await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});
};

export const fetcher = (url) => fetch(url, init).then((res) => res.json());
