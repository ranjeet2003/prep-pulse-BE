const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const chapterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chapterSchema.plugin(toJSON);
chapterSchema.plugin(paginate);

/**
 * @typedef Chapter
 */
const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
