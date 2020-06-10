import { Schema, model, Document, Model } from "mongoose";
import { hash } from "bcryptjs";

// User Schema
interface IUserSchema extends Document {
  email: string;
  password: string;
  name: string;
}

// User request object - Login
export interface UserReq {
  email: string;
  password: string;
}

// User request object - Signup
export interface UserReqSignUp extends UserReq {
  name: string;
}

// User Methods
interface IUserBase extends IUserSchema {
  toJSON: () => IUser;
}

// User document
export interface IUser extends IUserBase {
  createdAt: Date;
  updatedAt: Date;
}

// User Statics
export interface IUserModel extends Model<IUser> {
  hi: string;
  build: (user: UserReqSignUp) => IUser;
}

const userSchema = new Schema<IUserSchema>(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;
  delete user.password;
  delete user.__v;
  return user;
};

userSchema.statics.build = (user: { email: string; password: string }) =>
  new User(user);

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  next();
});

const User = model<IUser, IUserModel>("user", userSchema);

export default User;
