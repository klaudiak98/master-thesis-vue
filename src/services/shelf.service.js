import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/shelves';

class ShelfService {

    async getShelf(email) {
        return await axios.post(
            API_URL + 'my-shelf',
            email,
            {headers: authHeader()});
    }

    async getBookState(req) {
        const bookId = req.bookId;
        const email = req.email;

        return await axios.post(
            API_URL + 'check-book',
            JSON.stringify({
                email,
                bookId
            }),
            {headers: authHeader()});
    }

    async updateBook(req) {
        const bookId = req.bookId;
        const email = req.email;
        const newState = req.newState;

        return await axios.post(
            API_URL + 'update-book', 
            JSON.stringify({
                email,
                bookId,
                newState
            }),
            {headers: authHeader()});
    }

    async removeBookFromShelf(req) {
        const bookId = req.bookId;
        const email = req.email;

        return await axios.post(
            API_URL + 'update-book', 
            JSON.stringify({
                email,
                bookId,
                newState: ''
            }),
            {headers: authHeader()});
    }

}

export default new ShelfService();