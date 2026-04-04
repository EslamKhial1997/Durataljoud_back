const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    floor: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
    },
    balconyArea: {
      type: Number,
      required: true,
    },
    totalArea: {
      type: Number,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    balcony: {
      type: String,
    },
    parking: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const UnitModel = mongoose.model("datas", unitSchema);

module.exports = UnitModel;
