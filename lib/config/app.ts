import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import environment from '../environment'
import { ApplicationRoutes } from '../routes/application_routes'
import { CommonRoutes } from '../routes/common_routes'

class App {
   public app: express.Application
   public mongoUrl: string = `mongodb+srv://db_user:dark1610@cluster0.d2k4q.mongodb.net/${environment.getDBName()}?retryWrites=true&w=majority`

   private application_routes: ApplicationRoutes = new ApplicationRoutes()
   private common_routes: CommonRoutes = new CommonRoutes()

    constructor() {
        this.app = express()
        this.config()
        this.mongoSetup()
        this.application_routes.route(this.app)
        this.common_routes.route(this.app)
    }

    private config(): void {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    }
}

export default new App().app