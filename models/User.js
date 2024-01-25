const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    phone_number: { type: Number, required: true },
    priority: { type: Number, enum: [0, 1, 2] },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
