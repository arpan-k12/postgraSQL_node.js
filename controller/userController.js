const catchAsync = require("../utils/catchAsync");
const user = require("../db/models/user");
const { Sequelize } = require("sequelize");

const getAllUser = catchAsync(async (req, res, next) => {
  const users = await user.findAndCountAll({
    where: {
      userType: {
        [Sequelize.Op.ne]: "0",
      },
    },
    attributes: { exclude: "password" },
  });

  return res.status(200).json({
    status: "success",
    data: users,
  });
});

const getProfile = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const result = await user.findByPk(userId, {
    attributes: { exclude: "password" },
  });

  if (!result) {
    return next(new AppError("User not found", 404));
  }
  return res.status(200).json({
    status: "success",
    data: result,
  });
});

module.exports = {
  getAllUser,
  getProfile,
};
