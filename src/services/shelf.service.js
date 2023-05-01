import api from './api';

const API_URL = 'http://localhost:3500/shelves';

class ShelfService {

    async getShelf(email) {
        return await api.post(
            API_URL + 'my-shelf',
            email);
    }

    async getBookState(req) {
        const bookId = req.bookId;
        const email = req.email;

        return await api.post(
            API_URL + 'check-book',
            JSON.stringify({
                email,
                bookId
            }));
    }

    async updateBook(req) {
        const bookId = req.bookId;
        const email = req.email;
        const newState = req.newState;

        return await api.post(
            API_URL + 'update-book', 
            JSON.stringify({
                email,
                bookId,
                newState
            }));
    }

    async removeBookFromShelf(req) {
        const bookId = req.bookId;
        const email = req.email;

        return await api.post(
            API_URL + 'update-book', 
            JSON.stringify({
                email,
                bookId,
                newState: ''
            }));
    }
}

export default new ShelfService();