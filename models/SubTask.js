const { default: mongoose } = require("mongoose");

const subTaskSchema = mongoose.Schema(
  {
    task_id: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    status: { type: Number, enum: [0, 1], default: 0 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    delete_at: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubTask", subTaskSchema);
