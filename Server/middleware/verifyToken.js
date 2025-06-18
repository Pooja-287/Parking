// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader) {
//     return res.status(401).json({ message: 'Authorization header missing' });
//   }

//   const token = authHeader.split(' ')[1]; // Expecting format: "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ message: 'Token missing' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_fallback_secret');
//     req.user = decoded; // attach user data to request object
//     next(); // continue to the next middleware or route
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = verifyToken;




const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticate = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_fallback_secret");

    const user = await User.findById(decoded.id); // token payload should have `id`

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ full user object attached to req
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
