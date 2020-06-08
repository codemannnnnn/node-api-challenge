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
server.get("/", (req, res) => {
  res.send(`Let's write some code!`);
});

module.exports = server;
