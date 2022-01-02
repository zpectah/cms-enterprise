const init = {
	headers: {
		// 'X-App-Token': config.user_token,
		'Content-Type': 'application/json',
	},
};

export const get = async (url) => {
	const response = await fetch(url, {
		method: 'GET',
		...init,
	});
	return response.json();
};

export const post = async (url, data) => {
	const response = await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});

	return response.json();
};
