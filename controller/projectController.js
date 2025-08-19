const project = require("../db/models/project");
const user = require("../db/models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createProject = catchAsync(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;

  const newProject = await project.create({
    title: body.title,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: userId,
  });

  return res.status(201).json({
    status: "success",
    data: newProject,
  });
});

const getAllProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const result = await project.findAll({
    include: user,
    where: { createdBy: userId },
  });

  return res.json({
    status: "success",
    data: result,
  });
});

const getProjectById = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;

  const result = await project.findByPk(projectId, { include: user });
  if (!result) {
    return next(new AppError("Invalid Project id", 400));
  }

  return res.json({
    status: "success",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;
  const body = req.body;

  const result = await project.findOne({
    where: { id: projectId, createdBy: userId },
  });
  if (!result) {
    return next(new AppError("Invalida Project id", 400));
  }

  result.title = body.title;
  result.productImage = body.productImage;
  result.price = body.price;
  result.shortDescription = body.shortDescription;
  result.description = body.description;
  result.productUrl = body.productUrl;
  result.category = body.category;
  result.tags = body.tags;

  const updateResult = await result.save();

  return res.json({
    status: "success",
    data: updateResult,
  });
});

const deleteProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;

  const result = await project.findOne({
    where: { id: projectId, createdBy: userId },
  });
  if (!result) {
    return next(new AppError("Invalida Project id", 400));
  }

  await result.destroy();

  return res.json({
    status: "success",
    data: "Record deleted successfully",
  });
});

const getMyProjects = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const result = await project.findAll({
    where: { createdBy: userId },
  });

  if (!result || result.length === 0) {
    return next(new AppError("No projects found for this user", 404));
  }
  return res.json({
    status: "success",
    data: result,
  });
});

module.exports = {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
  getMyProjects,
};
