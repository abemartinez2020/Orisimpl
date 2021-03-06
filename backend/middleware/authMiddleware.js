const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const tokenPayload = jwt.verify(token, process.env.jWT_SECRET);

      req.user = await User.findById(tokenPayload.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

module.exports = { protect };
