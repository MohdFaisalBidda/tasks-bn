const express = require("express");
const authenticate = require("../middleware/authenticate");
const Task = require("../models/Task");
const SubTask = require("../models/SubTask");
const { parseISO, format, parse } = require("date-fns");

const router = express.Router();

//Get all tasks
router.get("/all", authenticate, async (req, res) => {
  try {
    const tasks = await Task.find().populate("user");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create a task
router.post("/new", authenticate, async (req, res) => {
  try {
    const { title, description, due_date, status, user } = req.body;

    const parsedDate = parse(due_date, "dd/MM/yyyy", new Date());

    const task = await Task.create({
      title,
      description,
      due_date: parsedDate,
      status,
      user: user,
    });

    const formattedCreatedAt = format(task.createdAt, "MM/dd/yyyy");
    const formattedUpdatedAt = format(task.updatedAt, "MM/dd/yyyy");
    const formattedDueDate = format(parsedDate, "MM/dd/yyyy");

    res.status(201).json({
      ...task.toObject(),
      createdAt: formattedCreatedAt,
      updatedAt: formattedUpdatedAt,
      due_date: formattedDueDate,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get all sub tasks
router.get("/subtasks", authenticate, async (req, res) => {
  try {
    const { task_id } = req.query;
    const subTasks = await SubTask.find({ task_id });
    res.json(subTasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create a sub task
router.post("/new-subtask", authenticate, async (req, res) => {
  try {
    const { task_id, title, description } = req.body;
    const subTask = await SubTask.create({ task_id, title, description });
    res.status(201).json(subTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update task
router.patch("/:taskId", authenticate, async (req, res) => {
  try {
    const { due_date, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { due_date, status },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update sub task
router.patch("/subtasks/:subtaskID", authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const subtask = await SubTask.findByIdAndUpdate(
      req.params.subtaskID,
      { status },
      { new: true }
    );
    res.json(subtask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
    res.status(500).json({ error: "Internal Server Error" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
