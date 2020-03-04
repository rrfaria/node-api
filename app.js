import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import BooksRouter from './routes/books';
import UsersRouter from './routes/users';
import SlackRouter from './routes/slack';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

BooksRouter(app);
UsersRouter(app);
SlackRouter(app);

export default app;
