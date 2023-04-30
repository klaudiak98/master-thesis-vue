import axios from 'axios';

const API_URL = 'http://localhost:3500';

class AuthService {
    async login(user) {
        const email = user.email;
        const password = user.password;
        console.log("email", email, password)
        const response = await axios
            .post(
                'http://localhost:3500/auth',
                {
                    email,
                    password
                }
                );
                console.log('response', response)
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