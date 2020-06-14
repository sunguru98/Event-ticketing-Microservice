import request from "supertest";
import app from "../app";

// Invalid Signin request
it("Returns a 401 status code on invalid email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "user@example.com",
      password: "testUser1234"
    })
    .expect(401);
});

// Inalid Signin request in terms of password
it("Returns a 401 status code on invalid email", async () => {
  await global.registerUserTest();
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "user@example.com",
      password: "testUser123"
    })
    .expect(401);
});

// Valid Signin request
it("Returns a 401 status code on invalid email", async () => {
  await global.registerUserTest();

  return request(app)
    .post("/api/users/signin")
    .send({
      email: "user@example.com",
      password: "testUser1234"
    })
    .expect(202);
});
