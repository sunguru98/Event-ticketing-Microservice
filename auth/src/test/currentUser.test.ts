import request from "supertest";
import app from "../app";

// Take current user
it("Should reveal the current user", async () => {
  const cookie = await global.registerUserTest();
  const {
    body: { email }
  } = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

  expect(email).toBe("user@example.com");
});

// Should not give current user for unauthenticated requests.
it("Should reveal the current user", async () => {
  await request(app).get("/api/users/currentuser").expect(401);
});
