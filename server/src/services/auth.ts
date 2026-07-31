import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const SALT_ROUNDS = 10;

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    throw new Error(
      "An account with this email already exists."
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      SALT_ROUNDS
    );

  const user = await User.create({
    name: name.trim(),
    email: email
      .trim()
      .toLowerCase(),
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    throw new Error(
      "Invalid email or password."
    );
  }

  const valid =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!valid) {
    throw new Error(
      "Invalid email or password."
    );
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
