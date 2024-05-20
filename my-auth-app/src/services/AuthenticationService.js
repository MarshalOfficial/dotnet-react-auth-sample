import axios from 'axios';

export const login = async (username, password) => {
    const response = await axios.post('https://localhost:7158/login', { username, password });
    return response.data;
};

export const refreshToken = async (refreshToken, accessToken) => {
    const response = await axios.post('https://localhost:7158/refresh-token', { refreshToken }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
