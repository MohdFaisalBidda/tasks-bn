const cron = require("node-cron");
const Task = require("./routes/tasks");

cron.schedule("0 0 * *", async () => {
  try {
    const currentDate = new Date();
    const upcommingTasks = await Task.find({ due_date: { $gt: currentDate } })
      .sort({ due_date: 1 })
      .limit(5);

    upcommingTasks.forEach(async (task, index) => {
      task.priority = Math.min(index, 3);
      await task.save();
    });
    console.log("Task priority updated successfully");
  } catch (error) {
    console.error("Error updating task priorities:", error);
  }
});
