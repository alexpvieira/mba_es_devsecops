import * as mongoose from 'mongoose'
import { ModificationNote } from '../common/model'

const Schema = mongoose.Schema

const schema = new Schema({
    first_name: String,
    middle_name: String,
    last_name: String,
    email: String,
    modification_notes: [ModificationNote]
})

export default mongoose.model('users', schema)