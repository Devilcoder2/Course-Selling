const jwt = require("jsonwebtoken");
const JWT_SECRET = "raman";

const userMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  const val = jwt.verify(token, JWT_SECRET);

  if (val) {
    next();
  } else {
    res.status(400).json({
      msg: "No user with this username of password exists",
    });
  }
};

module.exports = userMiddleware;
