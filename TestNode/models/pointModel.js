const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  point: {
    type: Number,
    default: 0,
  },
  attempts: {
    type: Number,
    default: 50,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
});

const Point = mongoose.model("Point", pointSchema);

module.exports = Point;
