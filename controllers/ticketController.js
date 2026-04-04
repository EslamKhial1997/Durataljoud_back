const Ticket = require("../models/Ticket");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFetcher = require("../utils/ApiFetcher");

exports.AddTicket = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, region, heardAboutUs, unit } =
    req.body;

  if (!firstName || !lastName || !phone || !region || !email) {
    return next(new ApiError("من فضلك إدخل كل البيانات المطلوبة", 400));
  }

  const ticket = await Ticket.create({
    firstName,
    lastName,
    email,
    phone,
    region,
    heardAboutUs,
    unit,
  });

  res.status(201).json({
    status: "success",
    message: "تم إضافة التذكرة بنجاح",
    data: ticket,
  });
});

exports.getTickets = asyncHandler(async (req, res, next) => {
  const documentsCount = await Ticket.countDocuments();

  const features = new ApiFetcher(Ticket.find(), req.query)
    .filter()
    .filterByDate()
    .search()
    .sort()
    .limitFields()
    .paginate(documentsCount);

  const tickets = await features.query;

  res.status(200).json({
    status: "success",
    results: tickets.length,
    pagination: features.paginationResult,
    data: tickets,
  });
});
