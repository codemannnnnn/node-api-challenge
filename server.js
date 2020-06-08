const express = require("express");
const server = express();
const morgan = require("morgan");
const actionRouter = require("./api/action.js");
const projectRouter = require("./api/project.js");
const db = require("./data/helpers/projectModel.js");

//global middleware
server.use(express.json());
server.use(morgan("dev"));

server.use("/api/action", actionRouter);
server.use("/api/project", projectRouter);
server.use("/api/projects", (req, res) => {
  db.get()
    .then((e) => {
      res.status(200).json({ Projects: e });
    })
    .catch((e) => {
      res.status(500).json({ message: "error with db" });
    });
});

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
