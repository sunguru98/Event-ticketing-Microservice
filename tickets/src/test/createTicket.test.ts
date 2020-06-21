import request from "supertest";
import app from "../app";

it("Is defined", async () => {
  const response = await request(app).post("/api/tickets").send({});
  return expect(response.status).not.toBe(404);
});

it("Should not create a ticket without auth", async () => {
  const response = await request(app).post("/api/tickets").send({});
  return expect(response.status).toBe(401);
});
