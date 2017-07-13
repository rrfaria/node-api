const defaultResponse = (data, statusCode = 200) => ({
    data,
    statusCode,
});
const errorResponse = (message, statusCode = 400) => defaultResponse({
    error: message,
}, statusCode);

export default class BooksController {
    constructor(Books) {
        this.Books = Books;
    }

    getAll() {
        return this.Books.findAll({})
        .then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }
}
