const { authentication, restrictTo } = require("../controller/authController");
const { getAllUser } = require("../controller/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Current user data
 *       401:
 *         description: Unauthorized
 */

const router = require("express").Router();
router.route("/").get(authentication, restrictTo("0"), getAllUser);

module.exports = router;
