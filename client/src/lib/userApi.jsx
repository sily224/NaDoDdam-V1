import axios from 'axios';
// api 로 POST 요청 (/endpoint 로, JSON 데이터 형태로 요청함)
// endpoint : api/user/login
async function post(endpoint, data) {
	const apiUrl = endpoint;
	const bodyData = JSON.stringify(data);

	const res = await axios(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		data: bodyData,
	});

	return res;
}

// api 로 user정보 GET 요청
async function get(endpoint) {
	const apiUrl = endpoint;

	const res = await axios(apiUrl, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});

	return res;
}

export { post, get };
