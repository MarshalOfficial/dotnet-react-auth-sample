import axios from 'axios';
import { refreshToken } from './AuthenticationService';
import { useAuth } from '../contexts/AuthContext';

export const useApi = () => {
    const { authTokens, setAuthTokens } = useAuth();

    const fetchSecuredData = async () => {
        try {
            const response = await axios.get('https://localhost:7158/SecuredMethod', {
                headers: {
                    Authorization: `Bearer ${authTokens.token}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Token expired, try refreshing it
                const refreshedTokens = await refreshToken(authTokens.refreshToken);
                if (refreshedTokens) {
                    setAuthTokens(refreshedTokens);
                    // Retry the original request with the new token
                    const retryResponse = await axios.get('https://localhost:7158/SecuredMethod', {
                        headers: {
                            Authorization: `Bearer ${refreshedTokens.token}`,
                        },
                    });
                    return retryResponse.data;
                }
            }
            throw error;
        }
    };

    return { fetchSecuredData };
};
