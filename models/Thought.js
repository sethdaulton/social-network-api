const { Schema, model } = require('mongoose');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => timeSince(date),
      },
    username:
        {
            type: String,
            required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return reactions.length;
  })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;