

export const getToken = () => {
    const token= localStorage.getItem('token');
    console.log(token);
    return token;
}