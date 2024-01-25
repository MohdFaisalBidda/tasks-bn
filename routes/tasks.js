const express = require("express");
const authenticate = require("../middleware/authenticate");
const Task = require("../models/Task");
const SubTask = require("../models/SubTask");
const { format, parse } = require("date-fns");
const User = require("../models/User");

const router = express.Router();

//Get all tasks
// router.get("/all", authenticate, async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     // const tasks = await Task.find().populate("user");
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// });

//Get all tasks with filters and queries
router.get("/all", authenticate, async (req, res) => {
  try {
    const { priority, due_date, page = 1, limit = 2 } = req.query;
    const filter = {};
    if (priority) filter.priority = priority;
    if (due_date)
      filter.due_date = { $gte: parseISO(`${due_date}T00:00:00.000Z`) };

    const tasks = await Task.find(filter)
      .sort({ due_date: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    // const tasks = await Task.find().populate("user");
    res.json(tasks);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//create a task
router.post("/new", authenticate, async (req, res) => {
  try {
    const { title, description, due_date, status, priority, user } = req.body;

    const parsedDate = parse(due_date, "dd/MM/yyyy", new Date());

    const task = await Task.create({
      title,
      description,
      due_date: parsedDate,
      status,
      priority,
      user,
    });

    const formattedCreatedAt = format(task.createdAt, "MM/dd/yyyy");
    const formattedUpdatedAt = format(task.updatedAt, "MM/dd/yyyy");
    const formattedDueDate = format(parsedDate, "MM/dd/yyyy");

    await User.findByIdAndUpdate(user, { tasks: task._id });

    res.status(201).json({
      ...task.toObject(),
      createdAt: formattedCreatedAt,
      updatedAt: formattedUpdatedAt,
      due_date: formattedDueDate,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Get all sub tasks
router.get("/subtasks", authenticate, async (req, res) => {
  try {
    const subTasks = await SubTask.find();
    // const subTasks = await SubTask.find().populate("task_id");
    res.json(subTasks);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//create a sub task
router.post("/new-subtask", authenticate, async (req, res) => {
  try {
    const { task_id, title, description } = req.body;
    const subTask = await SubTask.create({ task_id, title, description });
    await Task.findByIdAndUpdate(task_id, { subTasks: subTask._id.toString() });
    res.status(201).json(subTask);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//update task
router.patch("/:taskId", authenticate, async (req, res) => {
  try {
    const { due_date, status } = req.body;
    const parsedDate = parse(due_date, "dd/MM/yyyy", new Date());
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { due_date: parsedDate, status },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//update sub task
router.patch("/subtasks/:subtaskID", authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    if (status === 0 && status === 1 && status === "") {
      res.json("Status is not valid");
      return;
    }
    const subtask = await SubTask.findByIdAndUpdate(
      req.params.subtaskID,
      { status },
      { new: true }
    );
    res.json(subtask);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//delete task (soft delete)
router.delete("/:taskId", authenticate, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { delete_at: Date.now() },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//delete sub task (soft delete)
router.delete("/subtasks/:subtaskId", authenticate, async (req, res) => {
  try {
    const subTask = await SubTask.findByIdAndUpdate(
      req.params.subtaskId,
      { delete_at: Date.now() },
      { new: true }
    );
    res.json(subTask);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
