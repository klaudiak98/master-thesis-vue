import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class AuthService {
    async login(user) {
        const email = user.email;
        const password = user.password;
        
        const response = await axios
            .post(
                API_URL + '/auth',
                JSON.stringify({
                    email,
                    password
                }));
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
            API_URL + 'register',
            JSON.stringify({
                email,
                password,
                name
            }));
    }
}

export default new AuthService();