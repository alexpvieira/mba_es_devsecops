import { Application, Request, Response } from 'express'
import { UserController } from '../controllers/userController'
import * as Joi from 'joi'
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema, createValidator } from 'express-joi-validation'

const validator = createValidator()

const querySchema = Joi.object({
    first_name: Joi.string().required(),
    middle_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required()
})

interface HelloRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        first_name: string,
        middle_name: string,
        last_name: string
        email: string
    }
}

export class ApplicationRoutes {
    private user_controller: UserController = new UserController()

    public route(app: Application) {
        app.post('/api/user', validator.body(querySchema), (req: ValidatedRequest<HelloRequestSchema>, res) => {
            this.user_controller.create_user(req, res)
        })

        app.get('/api/user/:id', (req: Request, res: Response) => {
            this.user_controller.get_user(req, res)
        })

        app.put('/api/user/:id', validator.body(querySchema), (req: ValidatedRequest<HelloRequestSchema>, res) => {
            this.user_controller.update_user(req, res)
        })

        app.delete('/api/user/:id', (req: Request, res: Response) => {
            this.user_controller.delete_user(req, res)
        })
    }
}