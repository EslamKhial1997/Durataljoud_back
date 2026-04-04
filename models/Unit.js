const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    unit: {
      type: String,
      required: true,
      unique: true,
    },
    unitLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UnitModel = mongoose.model("units", unitSchema);

module.exports = UnitModel;
