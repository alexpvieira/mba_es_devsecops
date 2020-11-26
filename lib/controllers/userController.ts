import { Request, Response } from 'express'
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service'
import { IUser } from '../modules/users/model'
import UserService from '../modules/users/service'

export class UserController {
    private user_service: UserService = new UserService()

    public create_user(req: Request, res: Response) {
        const user_params: IUser = {
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email: req.body.email,
            modification_notes: [{
                modified_on: new Date(Date.now()),
                modified_by: null,
                modification_note: 'New user created'
            }]
        }

        this.user_service.createUser(user_params, (err: any, user_data: IUser) => {
            if (err) {
                mongoError(err, res)
            } 
            else {
                successResponse('create user successfull', user_data, res)
            }
        })
    }

    public get_user(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id }
            this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res)
                } 
                else {
                    successResponse('get user successfull', user_data, res)
                }
            })
        } 
        else {
            insufficientParameters(res)
        }
    }

    public update_user(req: Request, res: Response) {
        const user_filter = { _id: req.params.id }
        
        this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
            if (err) {
                mongoError(err, res);
            } 
            else if (user_data) {
                user_data.modification_notes.push({
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'User data updated'
                })
                const user_params: IUser = {
                    _id: req.params.id,
                    first_name: req.body.first_name,
                    middle_name: req.body.middle_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    modification_notes: user_data.modification_notes
                }
                this.user_service.updateUser(user_params, (err: any) => {
                    if (err) {
                        mongoError(err, res)
                    } 
                    else {
                        successResponse('update user successfull', null, res)
                    }
                })
            } 
            else {
                failureResponse('invalid user', null, res)
            }
        })
    }

    public delete_user(req: Request, res: Response) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res)
                } 
                else if (delete_details.deletedCount !== 0) {
                    successResponse('delete user successfull', null, res)
                } 
                else {
                    failureResponse('invalid user', null, res)
                }
            })
        } 
        else {
            insufficientParameters(res)
        }
    }
}