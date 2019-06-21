const express = require("express");

const router = express.Router();

const Projects = require("./projectModel");
const Actions = require("./actionModel");

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      res.status(500).json({ message: "Error adding the project!" });
    });
});

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving projects!"
      });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "Project not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving actions!"
      });
    });
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Projects.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "Project deleted!" });
    } else {
      res.status(404).json({ message: "Project could not be found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error removing project"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const project = await Projects.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project could not be found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating project" });
  }
});

// Get list of actions from a selected project
router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "Project not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving actions!"
      });
    });
});


// middleware for validating
function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "Not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving project" });
    });
}

module.exports = router;