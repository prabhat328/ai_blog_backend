import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  // Retrieve token from headers or cookies
  // const token =
  //   req.cookies.token || req.headers["authorization"]?.split(" ")[1];

  // if (!token) return res.status(401).json({ message: "Access denied" });

  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) return res.status(403).json({ message: "Invalid token" });
  //   req.user = user; // Attach user info to request object
  //   next();
  // });
  next();
};
