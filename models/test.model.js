const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const testSchema = mongoose.Schema(
  {
    test_number: {
      type: Number,
      required: true,
    },
    total_questions: {
      type: Number,
      required: true,
    },
    attempted_questions: {
      type: Number,
      required: true,
    },
    corrected_questions: {
      type: Number,
      required: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
testSchema.plugin(toJSON);
testSchema.plugin(paginate);

/**
 * @typedef Test
 */
const Test = mongoose.model("Test", testSchema);

module.exports = Test;
