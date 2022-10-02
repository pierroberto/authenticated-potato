import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  id: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  token: String,
})

export const UserModel = model('User', UserSchema)
