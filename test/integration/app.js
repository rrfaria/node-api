describe('Route Books', ()=>{
    const Books = app.datasource.models.Books,
    defaultBook = {
        id:1,
        name:"Default Book"
    };
    beforeEach(done=>{
        Books.destroy({where:{}})
        .then(()=> Books.create(defaultBook))
        .then(()=>{
            done();
        })
    })

    describe('Route GET /books',()=>{
        it('Should return book list', done =>{
                request
                .get('/books')
                .end((err,res)=>{
                    expect(res.body[0].name).to.be.eql(defaultBook.name);
                    expect(res.body[0].id).to.be.eql(defaultBook.id);
                    done(err);
                });
        });
    });

    describe('Route GET /books/{id}',()=>{
        it('Should return a book', done =>{
                request
                .get('/books/1')
                .end((err,res)=>{
                    expect(res.body.name).to.be.eql(defaultBook.name);
                    expect(res.body.id).to.be.eql(defaultBook.id);
                    done(err);
                });
        });
    });

    describe('Route POST /books',()=>{
        it('Should create a book', done =>{
            const newBook ={
                id:2,
                name: 'newBook'
            };

            request
            .post('/books')
            .send(newBook)
            .end((err,res)=>{
                expect(res.body.name).to.be.eql(newBook.name);
                expect(res.body.id).to.be.eql(newBook.id);
                done(err);
            });
        });
    });

    describe('Route PUT /books/{id}',()=>{
        it('Should update a book', done =>{
            const updatedBook ={
                id:1,
                name: 'newBook'
            };

            request
            .put('/books/1')
            .send(updatedBook)
            .end((err,res)=>{
                //console.log(res.body); me mostra o que esta sendo retornado
                expect(res.body).to.be.eql([1]);// se retornar 1 significa que foi atualizado.
                done(err);
            });
        });
    });

    describe('Route PUT /books/{id}',()=>{
        it('Should delete a book', done =>{
           request
            .delete('/books/1')
            .end((err,res)=>{
                //console.log(res); me mostra o que esta sendo retornado
                expect(res.statusCode).to.be.eql(204);// espera que o retorno seja um 204 no content 
                done(err);
            });
        });
    });
});