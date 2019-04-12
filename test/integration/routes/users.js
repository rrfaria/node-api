describe('Route Users', () => {
  const Users = app.datasource.models.Users;
  const defaultUser = {
    id: 1,
    name: 'Default USer',
    email: 'user@mail.com',
    password: 'test',
  };
  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => {
        done();
      });
  });

  describe('Route GET /users', () => {
    it('Should return user list', (done) => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('Should return a user', (done) => {
      request
        .get('/users/1')
        .end((err, res) => {
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);
          expect(res.body.id).to.be.eql(defaultUser.id);
          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('Should create a user', (done) => {
      const newUser = {
        id: 2,
        name: 'newUser',
        email: 'newUser@mail.com',
        password: 'test',
      };

      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.id).to.be.eql(newUser.id);
          expect(res.body.email).to.be.eql(newUser.email);
          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('Should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'updatedUser',
      };

      request
        .put('/users/1')
        .send(updatedUser)
        .end((err, res) => {
          // console.log(res.body); me mostra o que esta sendo retornado
          expect(res.body).to.be.eql([1]);// se retornar 1 significa que foi atualizado.
          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('Should delete a user', (done) => {
      request
        .delete('/users/1')
        .end((err, res) => {
          // console.log(res); me mostra o que esta sendo retornado
          expect(res.statusCode).to.be.eql(204);// espera que o retorno seja um 204 no content
          done(err);
        });
    });
  });
});
