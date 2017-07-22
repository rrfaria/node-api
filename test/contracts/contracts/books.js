describe('Route Books', () => {
    const Books = app.datasource.models.Books;
    const defaultBook = {
        id: 1,
        name: 'Default Book',
        description: 'Default Description',
    };
    beforeEach((done) => {
        Books.destroy({ where: {} })
        .then(() => Books.create(defaultBook))
        .then(() => {
            done();
        });
    });

    describe('Route GET /books', () => {
        it('Should return book list', (done) => {
            const booksList = Joi.array().items(Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                description: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso(),
            }));

            request
                .get('/books')
                .end((err, res) => {
                    joiAssert(res.body, booksList);
                    done(err);
                });
        });
    });

    describe('Route GET /books/{id}', () => {
        it('Should return a book', (done) => {
            const book = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                description: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso(),
            });

            request
                .get('/books/1')
                .end((err, res) => {
                    joiAssert(res.body, book);
                    done(err);
                });
        });
    });

    describe('Route POST /books', () => {
        it('Should create a book', (done) => {
            const newBook = {
                id: 2,
                name: 'newBook',
                description: 'new description',
            };

            const book = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                description: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso(),
            });

            request
            .post('/books')
            .send(newBook)
            .end((err, res) => {
                joiAssert(res.body, book);
                done(err);
            });
        });
    });

    describe('Route PUT /books/{id}', () => {
        it('Should update a book', (done) => {
            const updatedBook = {
                id: 1,
                name: 'newBook',
                description: 'Updated Book',
            };
            const updatedCount = Joi.array().items(1);

            request
            .put('/books/1')
            .send(updatedBook)
            .end((err, res) => {
                // console.log(res.body); me mostra o que esta sendo retornado
                joiAssert(res.body, updatedCount);// se retornar 1 significa que foi atualizado.
                done(err);
            });
        });
    });

    describe('Route PUT /books/{id}', () => {
        it('Should delete a book', (done) => {
            request
            .delete('/books/1')
            .end((err, res) => {
                // console.log(res); me mostra o que esta sendo retornado
                expect(res.statusCode).to.be.eql(204);// espera que o retorno seja um 204 no content
                done(err);
            });
        });
    });
});
