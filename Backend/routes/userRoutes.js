const { User, Course } = require("./../db/db");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "raman";
const userMiddleware = require("./../middlewares/userMiddleware");

const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.create({
    username,
    password,
  });

  res.status(200).json({
    msg: "user created succesfully",
    user,
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    username,
    password,
  });

  if (!user) {
    res.status(403).json({
      msg: "wrong username or password",
    });
    return;
  }

  if (user.username) {
    const token = jwt.sign(username, JWT_SECRET);
    res.status(200).json({
      msg: "user signin successfull",
      token,
    });
  }
});

router.get("/courses", async (req, res) => {
  const allCourses = await Course.find({});

  res.status(200).json({
    allCourses,
  });
});

router.post("/course/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.body.username;

  await User.updateOne(
    {
      username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );

  res.status(200).json({
    msg: "Cousre Purchased successfull",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.headers.username;
  const user = await User.findOne({
    username,
  });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.status(200).json({
    courses,
  });
});

module.exports = router;
