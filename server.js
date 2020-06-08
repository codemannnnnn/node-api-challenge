const express = require("express");
const server = express();
const morgan = require("morgan");
// const userRouter = require("./users/userRouter");
// const postRouter = require("./posts/postRouter");

//global middleware
server.use(express.json());
server.use(morgan("dev"));

// server.use("/api/users", userRouter);
// server.use("/api/posts", postRouter);

// test get request
server.get("/", (req, res) => {
  res.send(`Let's write some code!`);
});

module.exports = server;
