const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      id: "Course",
    },
  ],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {
  User,
  Admin,
  Course,
};
