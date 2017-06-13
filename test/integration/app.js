describe('Route Books', ()=>{
    const defaultBook = {
        id:1,
        name:"Default Book"
    };

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
});