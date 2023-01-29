const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return friends.length;
  })

const User = model('User', userSchema);

module.exports = User;
