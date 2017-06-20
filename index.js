import app from './app';

app.listen(app.get('port'), () => {
    s(`app rodando na porta:${app.get('port')}`);
});