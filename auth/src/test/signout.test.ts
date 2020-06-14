import request from "supertest";
import app from "../app";

// Valid logout occurs.
it("Should logout an authenticated user", async () => {
  const cookie = await global.registerUserTest();
  return request(app)
    .delete("/api/users/signout")
    .set("Cookie", cookie)
    .expect(202);
});
