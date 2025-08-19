const { signup, login } = require("../controller/authController");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SignupRequest:
 *       type: object
 *       required:
 *         - userType
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         userType:
 *           type: string
 *           enum: ["0","1", "2"]
 *           description: Type of user (e.g., "0"=admin, "1" = buyer, "2" = seller)
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *         confirmPassword:
 *           type: string
 *           format: password
 *           description: Confirm password
 *       example:
 *         userType: "2"
 *         firstName: John
 *         lastName: Doe
 *         email: johndoe@example.com
 *         password: Password123
 *         confirmPassword: Password123
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Registered email
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *       example:
 *         email: johndoe@example.com
 *         password: Password123
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []   # Public (no token required)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               data:
 *                 id: "12345"
 *                 userType: "2"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 email: "johndoe@example.com"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ..."
 *       400:
 *         description: Validation error (e.g., email already exists)
 *         content:
 *           application/json:
 *             example:
 *               status: "fail"
 *               message: "Invalid user Type"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     security: []   # Public (no token required)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               data:
 *                 id: "12345"
 *                 email: "johndoe@example.com"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ..."
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               status: "fail"
 *               message: "Invalid email or password"
 */

router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
