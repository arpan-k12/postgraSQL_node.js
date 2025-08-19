const task = require("../db/models/task");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createTask = catchAsync(async (req, res, next) => {
  const body = req.body;

  const newTask = await task.create({
    title: body.title,
    description: body.description,
    projectId: body.projectId,
    assignedTo: body.assignedTo,
    priority: body.priority,
    status: body.status,
    dueDate: body.dueDate,
  });

  return res.status(201).json({
    status: "success",
    data: newTask,
  });
});

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await task.findAll({});

  return res.status(200).json({
    status: "success",
    data: tasks,
  });
});

const getTaskById = catchAsync(async (req, res, next) => {
  const taskId = req.params.id;

  const result = await task.findByPk(taskId);
  if (!result) {
    return next(new AppError("Invalid Task id", 400));
  }

  return res.json({
    status: "success",
    data: result,
  });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const taskId = req.params.id;

  const result = await task.findOne({ where: { id: taskId } });
  if (!result) {
    return next(new AppError("Invalid Task id", 400));
  }
  await result.destroy();

  return res.status(204).json({
    status: "success",
    data: "Task deleted successfully",
  });
});

const updateTask = catchAsync(async (req, res, next) => {
  const taskId = req.params.id;
  const body = req.body;

  const result = await task.findOne(taskId);
  if (!result) {
    return next(new AppError("Invalid Task id", 400));
  }

  result.title = body.title;
  result.description = body.description;
  result.projectId = body.projectId;
  result.assignedTo = body.assignedTo;
  result.priority = body.priority;
  result.status = body.status;
  result.dueDate = body.dueDate;

  const updateResult = await result.save();

  return res.status(200).json({
    status: "success",
    data: updateResult,
  });
});

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTask,
  updateTask,
};
