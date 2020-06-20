import mongoose from "mongoose";

mongoose
  .connect("mongodb://tickets-mongo-srv:27017/tickets", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log(`Tickets service mongo has been connected`))
  .catch(err => console.error(`Error: ${err.message}`));
