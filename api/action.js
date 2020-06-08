const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionModel.js");
const pDb = require("../data/helpers/projectModel.js");
// const postDb = require("../posts/postDb.js");

// POSTs
router.post("/:id", (req, res) => {
  const body = { ...req.body, project_id: req.params.id };
  db.insert(body)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((err) => console.log(err));
});
// GET

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.e);
});

router.put("/:id", validateUserId, (req, res) => {
  db.update(req.params.id, req.body)
    .then((e) => {
      res
        .status(200)
        .json({ message: "Action updated", id: e, newInfo: req.body });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "couldnt update action" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then((e) => {
      res.status(204).json(e);
    })
    .catch((e) => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});

// middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  db.get(id)
    .then((e) => {
      if (e) {
        req.e = e;
        next();
      } else {
        res.status(400).json({ errorMessage: "That ID does not exist!" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the db.",
      });
    });
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ errorMessage: "Missing body of post" });
  } else if (!req.body.name) {
    res.status(400).json({ errorMessage: "missing name field" });
  } else if (!req.body.description) {
    res.status(400).json({ errorMessage: "missing description field" });
  } else {
    next();
  }
}

// export router
module.exports = router;
