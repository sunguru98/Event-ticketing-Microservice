import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_DB_URI!, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log(`Orders service mongo has been connected`))
  .catch(err => console.error(`Error: ${err.message}`));
