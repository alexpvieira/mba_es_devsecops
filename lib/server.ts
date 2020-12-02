import app from './config/app'
import env from './environment'
import { RewriteFrames } from '@sentry/integrations'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

declare global {
    namespace NodeJS {
        interface Global {
            __rootdir__: string
        }
    }
}
  
global.__rootdir__ = __dirname || process.cwd()

Sentry.init({
    dsn: 'https://4cbfd2439bab48a4b92faf926212c7e4@o486024.ingest.sentry.io/5542179',
    integrations: [
        new RewriteFrames({
            root: global.__rootdir__
        }),
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ 
            app
        })
    ],
    tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())
app.use(Sentry.Handlers.errorHandler())

app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + "\n")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT)
})