import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("Authorization header missing or malformed");
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("User not found for id:", decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    console.log("User authenticated:", user._id);
    next();
  } catch (error) {
    console.log("Token verification error:", error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
