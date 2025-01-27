// tests/authRoutes.test.js
const request = require("supertest");
const app = require("../server");

describe("POST /api/auth/forgot-password", () => {
  it("should send a password reset link to the email", async () => {
    const userData = {
      email: "testuser@example.com",
    };

    // First, create a user to send the reset link to
    await request(app).post("/api/users").send({
      name: "Test User",
      email: userData.email,
      password: "password123",
    });

    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send(userData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Reset link sent to email");
  });
});
