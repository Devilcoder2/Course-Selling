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

  const user = await User.find({
    username,
    password,
  });

  if (user) {
    const token = jwt.sign(username, JWT_SECRET);
    res.status(200).json({
      msg: "User signin successfull",
      token,
    });
  } else {
    res.status(403).json({
      msg: "wrong username or password",
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

router.get("/purchasedCourses", userMiddleware, async (req, res) => {});

module.exports = router;
