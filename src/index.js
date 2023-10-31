const app = require('./app');
const { port, env } = require('./config/keys')

app.listen(port, () => {
  if (env == 'production') {
    console.log(`Production: ${process.env.BASE_URL}`);
  } else {
    console.log(`Listening: http://localhost:${port}`);
  }
});
