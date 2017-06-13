import app from './app';

app.listen(app.get('port'), ()=>{
    console.log(`app rodando na porta:${app.get('port')}`);
})