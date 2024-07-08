export const request = async (url, method, data) => {
	return fetch(url, {
		method: method || 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: data ? JSON.stringify(data) : undefined,
	}).then(resp => resp.json());
};
