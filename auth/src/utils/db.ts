import mongoose from "mongoose";

mongoose
  .connect("mongodb://auth-mongo-srv:27017/auth", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log(`Auth service mongo has been connected`))
  .catch(err => console.error(`Error: ${err.message}`));
