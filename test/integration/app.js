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
                    expect(res.body.id).to.be.eql(defaultBook.name);
                    expect(res.body.id).to.be.eql(defaultBook.id);
                    done(err);
                });
        });
    });
});