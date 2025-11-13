const express = require("express");
const router = express.Router();

const {
  toggleApartmentStatus,

  getProjectData,
  getProjectDataByID,
} = require("../controllers/projectController");

router.get("/", getProjectData);
router.get("/:id", getProjectDataByID);
router.put("/:id", toggleApartmentStatus);

module.exports = router;
