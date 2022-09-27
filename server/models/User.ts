import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  id: Number,
  username: String,
  password: String,
});

export const UserModel = model("User", UserSchema);
