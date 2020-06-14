import request from "supertest";
import app from "../app";

// Valid Signup request
it("Returns a 201 status code on valid register", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      name: "Test User",
      password: "testUser1234"
    })
    .expect(201);
});

// Prevent duplicate emails
it("Returns a 400 status code on duplicate emails", async () => {
  await global.registerUserTest();

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      name: "Test User",
      password: "testUser1234"
    })
    .expect(400);
});

// Invaid signup request for email
it("Returns a 400 status code on invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "hi there",
      name: "Test User",
      password: "1234"
    })
    .expect(400);
});

// Invaid signup request for password
it("Returns a 400 status code on invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "hithere@hulu.com",
      name: "Test User",
      password: "1234"
    })
    .expect(400);
});

// Should return a cookie called Set-Cookie after register
it("Returns a header Set-Cookie after successful register", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      password: "testUser1234",
      name: "Test User"
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
