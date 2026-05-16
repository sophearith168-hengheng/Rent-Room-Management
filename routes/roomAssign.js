const express = require("express");
const router = express.Router();

const assignment = require("../controller/roomAssign");


router.get("/", assignment.getAssignments);

router.get("/:id", assignment.getAssignmentByID);

router.post("/", assignment.createAssignment);

router.put("/:id", assignment.updateAssignment);

router.delete("/:id", assignment.deleteAssignment);

module.exports = router;