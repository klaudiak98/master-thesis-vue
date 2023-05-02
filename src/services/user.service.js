import api from './api';

const API_URL = 'http://localhost:3500/users';

class UserService {
  async getAllUsers() {
    return await api.get(API_URL);
  }

  async getUser() {
    return await api.get(API_URL + '/me');
  }

  async updateUser(email, name, password) {
    if (password.length) {
        return await api.patch(
            API_URL + '/update', 
            {
                email,
                name,
                password
            }
        );
    } else {
        return await api.patch(
            API_URL + '/update', 
            {
                email,
                name,
            }
        );
    }
  }

  async deleteUser(email) {
    return await api.post(
        API_URL + '/delete',
        {
            email
        });
  }
}

export default new UserService();