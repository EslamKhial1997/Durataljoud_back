const express = require("express");
const router = express.Router();

const { AuthUser, allowedTO } = require("../controllers/authController");

const { AddTicket, getTickets } = require("../controllers/ticketController");

const { addTicketValidator } = require("../utils/validators/ticketValidator");

// router.use(AuthUser, allowedTO("manager"));

// Ticket Routes
router.post("/", addTicketValidator, AddTicket);
router.get("/", AuthUser, allowedTO("manager"), getTickets);

module.exports = router;
