export const getToken = () => {
	return localStorage.getItem('token');
};

export const logout = () => {
	localStorage.clear();
	alert('로그아웃 되었습니다.');

	// memo 지우: 해당 url이라면 홈화면으로 이동
	if (
		window.location.pathname === '/pay' ||
		window.location.pathname === '/mypage' ||
		window.location.pathname === '/farm'
	) {
		window.location.href = '/';
	}
};
