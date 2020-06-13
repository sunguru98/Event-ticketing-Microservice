import { Schema, model, Document, Model } from "mongoose";
import { hash, compare } from "bcryptjs";

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
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Statics
export interface IUserModel extends Model<IUser> {
  build: (user: UserReqSignUp) => IUser;
  findUserByEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<IUser | null>;
}

const userSchema = new Schema(
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
  { timestamps: true, versionKey: false }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.id = user._id;
  delete user._id;
  delete user.password;
  return user;
};

userSchema.statics.findUserByEmailAndPassword = async function (
  email: string,
  password: string
) {
  try {
    const user = await User.findOne({ email });
    if (!user) return null;
    const isMatched = await compare(password, user.password);
    if (!isMatched) return null;
    return user;
  } catch (err) {
    throw err;
  }
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
