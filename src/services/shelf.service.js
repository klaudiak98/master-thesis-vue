import api from './api';

const API_URL = 'http://localhost:3500/shelves';

class ShelfService {

    async getShelf(email) {
        return await api.post(
            API_URL + '/my-shelf',
            {email});
    }

    async getBookState(email, bookId) {
        return await api.post(
            API_URL + '/check-book',
            {
                email,
                bookId
            });
    }

    async changeBookState(email, bookId, newState) {
        return await api.put(
            API_URL + '/update-book', 
            {
                email,
                bookId,
                newState
            });
    }
}

export default new ShelfService();