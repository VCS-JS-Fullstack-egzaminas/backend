import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const secret = process.env.SECRET;

if (!secret) {
  console.log("JWT secret is missing in .env");
  process.exit(1);
}

export const signToken = (id, role = "user") => {
  return jwt.sign({ id, role }, secret, {
    expiresIn: "2d",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error(`Token verification failed: ${error}`);
  }
};
