const { authentication, restrictTo } = require("../controller/authController");
const {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controller/projectController");

const router = require("express").Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects of logged-in user
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 */

router
  .route("/")
  .post(authentication, restrictTo("1"), createProject)
  .get(authentication, restrictTo("1"), getAllProject);

router
  .route("/:id")
  .get(authentication, getProjectById)
  .patch(authentication, updateProject)
  .delete(authentication, deleteProject);

module.exports = router;
