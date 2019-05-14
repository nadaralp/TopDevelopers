const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token exist
  if (!token) {
    return res.status(401).json({ msg: "No token authorization denied" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSECRET"));
    // set a value to req.user so we can access it
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token isnt valid" });
  }
};
