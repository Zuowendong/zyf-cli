
    const serve = require('koa-static')
  
 
    const app = new koa()


    app.use(serve(__dirname + "/static"))



    const router = new Router()
    router.get("/", (ctx) => {
        ctx.body = 'Hello, koa-setup-test'
    })
    app.use(router.routes())


    app.listen(8080, () => {
        console.log('open server localhost:8080')
    })