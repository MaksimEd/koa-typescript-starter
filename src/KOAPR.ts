const Koa = require('koa');

const app = new Koa();

app.use(async (ctx: any) => {
  console.log(ctx.request)
  ctx.body = 'Hello World';
});

app.listen(3000, () => console.log('port 3000'));