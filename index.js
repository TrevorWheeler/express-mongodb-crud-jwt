require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const PORT = 8082;
const authRoutes = require("./routes/auth");
const menuItemRoutes = require("./routes/menuItem");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/menuItem",
  loginRequired,
  ensureCorrectUser,
  menuItemRoutes
);

// app.use(
//   "localhost:8080/dashboard",
//   loginRequired,
//   ensureCorrectUser
//   // menuItemRoutes
// );

app.get("/api/menuItem", async function(req, res, next) {
  try {
    let menuItems = await db.Menu.find()
      // .sort({ createdAt: "desc" })
      .sort({ orderNumber: "asc" })
      .populate("user", {
        username: true
      });
    return res.status(200).json(menuItems);
  } catch (err) {
    return next(err);
  }
});

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});
