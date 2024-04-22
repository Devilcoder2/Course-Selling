const { Admin } = require("./../db/db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "raman";

const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  const admin = jwt.verify(token, JWT_SECRET);
  console.log(admin);
  if (admin) {
    next();
  } else {
    res.status(400).json({
      msg: "Admin does not exits",
    });
  }
};

module.exports = adminMiddleware;
