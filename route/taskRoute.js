const { authentication, restrictTo } = require("../controller/authController");
const {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTask,
  updateTask,
} = require("../controller/taskController");

const router = require("express").Router();

router
  .route("/")
  .post(authentication, restrictTo("0"), createTask)
  .get(authentication, restrictTo("0"), getAllTasks);

router
  .route("/:id")
  .get(authentication, restrictTo("0"), getTaskById)
  .delete(authentication, restrictTo("0"), deleteTask)
  .patch(authentication, updateTask);

module.exports = router;
