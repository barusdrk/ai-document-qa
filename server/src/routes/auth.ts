import { Router } from "express";

import {
  loginUser,
  registerUser,
} from "../services/auth.js";

const router = Router();

router.post(
  "/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      if (
        !name ||
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            message:
              "Name, email and password are required.",
          });
      }

      const result =
        await registerUser(
          name,
          email,
          password
        );

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Registration failed.",
      });
    }
  }
);

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      if (
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            message:
              "Email and password are required.",
          });
      }

      const result =
        await loginUser(
          email,
          password
        );

      res.json(result);
    } catch (error) {
      res.status(401).json({
        message:
          error instanceof Error
            ? error.message
            : "Login failed.",
      });
    }
  }
);

export default router;
