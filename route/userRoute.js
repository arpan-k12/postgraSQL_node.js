const { authentication, restrictTo } = require("../controller/authController");
const { getAllUser, getProfile } = require("../controller/userController");

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
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             example:
 *               users:
 *                 - id: "12345"
 *                   firstName: "John"
 *                   lastName: "Doe"
 *                   email: "johndoe@example.com"
 *                   role: "user"
 *                 - id: "67890"
 *                   firstName: "Jane"
 *                   lastName: "Smith"
 *                   email: "janesmith@example.com"
 *                   role: "manager"
 *       403:
 *         description: Forbidden (Only admins allowed)
 *       401:
 *         description: Unauthorized (Missing or invalid token)
 */

const router = require("express").Router();
router.route("/").get(authentication, restrictTo("0"), getAllUser);

router.route("/me").get(authentication, getProfile);

module.exports = router;
