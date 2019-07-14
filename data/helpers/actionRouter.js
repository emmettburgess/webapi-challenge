const express = require("express");

const router = express.Router();

const Projects = require("./projectModel");
const Actions = require("./actionModel");

// Get list of actions
router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "Actions not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving actions!"
      });
    });
});

router.put("/:id", (req, res) =>
{
    const id = req.params.id;
    const notes = req.body.notes;
    const description = req.body.description;
    Actions.update(id, {description, notes})
    .then(got => {
        res.status(200).json(got)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get("/:id", validateProjectId, (req, res) => {
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

  router.post("/:id"), validateProjectId, (req, res) => {
    const newAction = {
      description: req.body.description,
      notes: req.body.notes,
      project_id: req.params.id
    };

    Actions.insert(newAction)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error adding action" });
      });
  };

router.delete("/:id", async (req, res) => {
  try {
    const count = await Actions.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "Action deleted!" });
    } else {
      res.status(404).json({ message: "Action could not be found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error removing project"
    });
  }
});

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