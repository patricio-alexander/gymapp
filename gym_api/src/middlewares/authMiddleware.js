import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;

  // console.log(req.cookies);

  if (!token)
    return res.status(401).json({ message: "No token, unauthorized" });
  jwt.verify(token, "secretKey", (error, user) => {
    if (error) return res.status(403).json({ message: "Invalid token" });
    next();
  });

};

export { isAuthenticated };
