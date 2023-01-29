const { Schema, model } = require("mongoose");

// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
      get: (date) => timeSince(date),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

reactionSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return reactions.length;
  });

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;
