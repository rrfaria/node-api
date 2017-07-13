import BooksController from '../../../controllers/books';

describe('Controllers :Books', () => {
    describe('Get all books: getAll()', () => {
        it('should return a list of books', () => {
            const Books = {
                findAll: td.function(),
            };

            const expectedResponse = [{
                id: 1,
                name: 'Test Book',
                created_at: '2017-06-06T23:55:36.6922',
                updated_at: '2017-06-06T23:55:36.6922',
            }];

            td.when(Books.findAll({})).thenResolve(expectedResponse);
            const booksController = new BooksController(Books);
            return booksController.getAll()
			.then(response => expect(response.data).to.be.equals(expectedResponse));
        });
    });
});
