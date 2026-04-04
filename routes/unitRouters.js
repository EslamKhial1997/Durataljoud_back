const express = require("express");
const router = express.Router();

const {
  getUnitData,
  createUnit
} = require("../controllers/unitController");

router.get("/", getUnitData);
router.post("/", createUnit); 

module.exports = router;
