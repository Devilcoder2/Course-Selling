const express = require("express");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("listening to the port 3000....");
});
