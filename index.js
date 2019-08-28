import app from './app';

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`app rodando na porta:${app.get('port')}`);
});
