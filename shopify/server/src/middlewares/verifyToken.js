import jwt from "jsonwebtoken";
import "dotenv/config.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const jwtSecret = process.env.JWT_SECRET;

  const token = authHeader.split(" ")[1];

  if (!authHeader) {
    return res.status(401).json({ message: "Token is missing" });
  }

  jwt.verify(token, jwtSecret, (err) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Token has expired" });
      } else {
        return res.status(401).json({ message: "Token is invalid" });
      }
    }
    next();
  });
};
