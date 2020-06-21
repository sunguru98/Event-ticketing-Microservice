import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { sign } from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      registerUserTest: () => Promise<string[]>;
    }
  }
}

const setEnvironmentVariables = () => {
  process.env.JWT_KEY = "testJWTKey";
  process.env.NODE_ENV = "test";
};

const registerUserTest = async () => {
  // Fake user
  const payload = {
    name: "Test user",
    email: "name@example.com",
    password: "NameTest123"
  };
  // Generating JWT.
  const accessToken = sign(payload, process.env.JWT_KEY!);
  // Build session object
  const session = JSON.stringify({ accessToken });
  // Convert to base64
  const base64EncodedSession = Buffer.from(session).toString("base64");
  // cookie format
  return [`express:sess=${base64EncodedSession}`];
};

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  // Setting environment variables
  setEnvironmentVariables();
  // Creating new Mongo in memory server.
  mongoServer = new MongoMemoryServer();
  const mongoURI = await mongoServer.getUri();
  // Connecting that server via mongoose.
  await mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
});

beforeEach(async () => {
  // Cleaning up all the collections.
  const collections = await mongoose.connection.db.collections();
  collections.forEach(async c => await c.deleteMany({}));
});

afterAll(async () => {
  // Closing both mongoose as well as our server.
  await mongoServer.stop();
  await mongoose.connection.close();
});

global.registerUserTest = registerUserTest;
