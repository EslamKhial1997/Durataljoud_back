const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const UnitModel = require("../models/UnitSchema");

exports.getProjectData = asyncHandler(async (req, res, next) => {
  const units = await UnitModel.find();

  if (!units) {
    return next(new ApiError("لا يوجد وحدات", 404));
  }

  res.status(200).json({
    status: "success",
    data: units,
  });
});
exports.getProjectDataByID = asyncHandler(async (req, res, next) => {
  const units = await UnitModel.findOne({ number: req.params.id });

  if (!units) {
    return next(new ApiError("لا يوجد وحدات", 404));
  }

  res.status(200).json({
    status: "success",
    data: units,
  });
});

exports.toggleApartmentStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const allowedStatuses = ["available", "sold", "not_offered", "reserved"];
  if (!id) {
    return next(new ApiError("يجب إرسال اسم الوحدة في الـ query", 400));
  }

  if (req.body.status && !allowedStatuses.includes(req.body.status)) {
    return next(new ApiError("الحالة المرسلة غير صحيحة", 400));
  }

  const apartment = await UnitModel.findById(id);
  req.body.newStatus.area
    ? (req.body.newStatus.totalArea =
        req.body.newStatus.area + apartment.balconyArea)
    : apartment.totalArea;
  const updatedApartment = await UnitModel.findByIdAndUpdate(
    id,
    req.body.newStatus,
    {
      new: true,
    }
  );

  if (!updatedApartment) {
    return next(new ApiError("الوحدة غير موجودة", 404));
  }

  res.status(200).json({
    status: "success",
    message: `تم تعديل الوحدة إلى: ${updatedApartment}`,
    apartment: updatedApartment,
  });
});
