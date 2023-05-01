import api from './api';
import TokenService from './token.service';

const API_URL = 'http://localhost:3500';

class AuthService {
    async login(user) {
        const email = user.email;
        const password = user.password;
        const response = await api
            .post(
                `${API_URL}/auth`,
                {
                    email,
                    password
                }
                );
        if (response.data.accessToken) {
            TokenService.setUser(response.data)
        }
        return response.data;
    }

    logout() {
        TokenService.removeUser();
    }

    async register(user) {
        const email = user.email;
        const password = user.password;
        const name = user.name;

        return await api.post(
            API_URL + '/register',
            {
                email,
                password,
                name
            });
    }
}

export default new AuthService();