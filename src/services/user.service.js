import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users';

class UserService {
  async getAllUsers() {
    return await axios.get(API_URL, {headers: authHeader()});
  }

  async getUser() {
    return await axios.get(API_URL + '/me', {headers: authHeader()});
  }

  async updateUser(user) {
    const email = user.email;
    const name = user.name;
    const password = user.password;

    if (password.length) {
        return await axios.patch(
            API_URL + '/update', 
            JSON.stringify({
                email,
                name,
                password
            }),
            {
                headers: authHeader(),
            }
        );
    } else {
        return await axios.patch(
            API_URL + '/update', 
            JSON.stringify({
                email,
                name,
            }),
            {
                headers: authHeader(),
            }
        );
    }
  }

  async removeUser(userId) {
    return await axios.post(
        API_URL + '/remove',
        JSON.stringify({
            userId
        }), 
        {headers: authHeader()});
  }
}

export default new UserService();