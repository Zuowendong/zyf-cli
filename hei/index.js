
    const serve = require('koa-static')
  
 
    const app = new koa()


    app.use(serve(__dirname + "/static"))




    app.listen(8080, () => {
        console.log('open server localhost:8080')
    })