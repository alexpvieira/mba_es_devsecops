import { ModificationNote } from '../common/model'

export interface IUser {
    _id?: String;
    first_name: String;
    middle_name: String;
    last_name: String;
    email: String;
    modification_notes: ModificationNote[]
}