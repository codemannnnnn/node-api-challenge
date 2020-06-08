const express = require("express");
const server = express();
const morgan = require("morgan");
const actionRouter = require("./api/action.js");
const projectRouter = require("./api/project.js");

//global middleware
server.use(express.json());
server.use(morgan("dev"));

server.use("/api/action", actionRouter);
server.use("/api/project", projectRouter);

// test get request
server.get("/", function (req, res) {
  res.status(200).json({
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    greeting: process.env.GREETING,
    hey: process.env.HEY,
  });
});

module.exports = server;
