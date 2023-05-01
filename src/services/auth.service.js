import axios from 'axios';

const API_URL = 'http://localhost:3500';

class AuthService {
    async login(user) {
        const email = user.email;
        const password = user.password;
        const response = await axios
            .post(
                `${API_URL}/auth`,
                {
                    email,
                    password
                }
                );
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem('user');
    }

    async register(user) {
        const email = user.email;
        const password = user.password;
        const name = user.name;

        return await axios.post(
            API_URL + '/register',
            {
                email,
                password,
                name
            });
    }
}

export default new AuthService();