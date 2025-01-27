// tests/userRoutes.test.js
const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const mongoose = require("mongoose");

beforeAll(async () => {
  const url = process.env.MONGO_URI;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/users", () => {
  it("should create a new user with valid data", async () => {
    const userData = {
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      role: "user",
    };

    const res = await request(app).post("/api/users").send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("name", userData.name);
    expect(res.body).toHaveProperty("email", userData.email);
  });

  it("should return error if user already exists", async () => {
    const userData = {
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      role: "user",
    };

    // Create user first
    await request(app).post("/api/users").send(userData);

    // Try to create the same user again
    const res = await request(app).post("/api/users").send(userData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "User already exists");
  });

  it("should return validation error if email is invalid", async () => {
    const userData = {
      name: "Test User",
      email: "invalidemail",
      password: "password123",
    };

    const res = await request(app).post("/api/users").send(userData);

    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe("Please enter a valid email address");
  });
});
