import jwt from "jsonwebtoken";

export const authorize = (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(`Bearer `)) {
    return res.status(404).json({ message: "No token was provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT Verification Error: ", err.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
