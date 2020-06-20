import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";

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
  const user = {
    email: "user@example.com",
    name: "Test User",
    password: "testUser1234"
  };
  const response = await request(app)
    .post("/api/users/signup")
    .send(user)
    .expect(201);
  return response.get("Set-Cookie");
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
