const { Router } = require("express");
const { Admin, Course } = require("./../db/db");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middlewares/adminMiddleware");
const JWT_SECRET = "raman";

const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const admin = await Admin.create({
    username,
    password,
  });

  res.status(200).json({
    msg: "Admin created successfully",
    admin,
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const admin = await Admin.findOne({
    username,
    password,
  });

  if (!admin) {
    res.status(403).json({
      msg: "Wrong",
    });
    return;
  }

  console.log(admin.username);

  if (admin.username) {
    const token = jwt.sign(username, JWT_SECRET);
    res.status(200).json({
      msg: "admin signin successfull",
      token,
    });
  }
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find({});

  res.status(200).json({
    msg: "Courses Found successfully",
    courses,
  });
});

router.post("/course", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const newCourse = await Course.create({
    title,
    description,
    price,
    imageLink,
  });

  res.status(200).json({
    msg: "Course added successfully",
    newCourse,
  });
});

module.exports = router;
