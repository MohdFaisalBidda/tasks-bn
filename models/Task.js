const { default: mongoose } = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    due_date: Date,
    status: { type: String, enum: ["TODO", "IN_PROGRESS", "DONE"] },
    priority: { type: Number, enum: [0, 1, 2, 3] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubTask" }],
    delete_at: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
