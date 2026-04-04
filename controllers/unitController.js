const UnitModel = require("../models/UnitSchema");
const ApiError = require("../utils/ApiError");

const getUnitData = async (req, res, next) => {
  try {
    const units = await UnitModel.find();

    res.status(200).json({
      status: "success",
      message: "Units data retrieved successfully",
      data: units,
    });
  } catch (error) {
    next(new ApiError("Failed to retrieve units data", 500));
  }
};

const createUnit = async (req, res, next) => {
  try {
    const {
      floor,
      floorEN,
      number,
      area,
      balconyArea,
      totalArea,
      type,
      typeEN,
      description,
      descriptionEN,
      balcony,
      balconyEN,
      parking,
      status,
      price,
    } = req.body;

    if (!floor || !number || !area || !totalArea || !type) {
      return next(
        new ApiError(
          "floor, number, area, totalArea, and type are required",
          400,
        ),
      );
    }

    // const unitNumber = Number(number);
    // if (isNaN(unitNumber)) {
    //   return next(new ApiError("number must be a valid number", 400));
    // }

    const existingUnit = await UnitModel.findOne({ number });
    if (existingUnit) {
      return next(new ApiError("Unit with this number already exists", 400));
    }

    const newUnit = await UnitModel.create({
      floor,
      floorEN,
      number,
      area,
      balconyArea: balconyArea || 0,
      totalArea,
      type,
      typeEN,
      description,
      descriptionEN,
      balcony,
      balconyEN,
      parking: parking || 0,
      status: status || "available",
      price,
    });

    res.status(201).json({
      status: "success",
      message: "Unit created successfully",
      data: newUnit,
    });
  } catch (error) {
    next(new ApiError("Failed to create unit", 500));
  }
};

module.exports = {
  getUnitData,
  createUnit,
};
