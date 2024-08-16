import { verifyToken } from "../utils/jwt.js";

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    verifyToken(token);
  } catch (error) {
    return res.sendStatus(401);
  }

  next();
};

export default requireAuth;
