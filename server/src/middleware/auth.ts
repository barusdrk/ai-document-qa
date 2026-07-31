import {
  Request,
  Response,
  NextFunction,
} from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest
  extends Request {
  user?: {
    id: string;
    email: string;
  };
}

interface JwtPayload {
  id: string;
  email: string;
}

export default function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader =
    req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      message:
        "Authentication required.",
    });
  }

  const token = authHeader.replace(
    "Bearer ",
    ""
  );

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token.",
    });
  }
}
