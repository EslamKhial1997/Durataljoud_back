const express = require("express");
const router = express.Router();

const { AuthUser, allowedTO } = require("../controllers/authController");
const {
  getApartmentByName,
  toggleApartmentStatus,
  getProjectDataWithStats,
  getApartmentsByStatus,
  ChangeApartmentPrice,
  getProjectData,
} = require("../controllers/projectController");

const {
  apartmentStatusValidation,
} = require("../utils/validators/ChangeStatuseProject");

router.get("/", getProjectData);
router.put("/:id", toggleApartmentStatus);

module.exports = router;
