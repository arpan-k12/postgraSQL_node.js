const { authentication, restrictTo } = require("../controller/authController");
const {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
  getMyProjects,
} = require("../controller/projectController");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management APIs
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - productImage
 *               - price
 *               - shortDescription
 *               - description
 *               - productUrl
 *               - category
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the project
 *               productImage:
 *                 type: string
 *                 description: Image URL of the project
 *               price:
 *                 type: number
 *                 description: Price of the project
 *               shortDescription:
 *                 type: string
 *                 description: Short description of the project
 *               description:
 *                 type: string
 *                 description: Detailed description of the project
 *               productUrl:
 *                 type: string
 *                 description: URL of the project
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Category of the project
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associated with the project
 *           example:
 *             title: "E-commerce Website"
 *             productImage: "https://example.com/image.png"
 *             price: 499
 *             shortDescription: "A modern e-commerce platform"
 *             description: "This is a detailed description of the e-commerce website project."
 *             productUrl: "https://example.com/product"
 *             category: ["e-commerce", "web development"]
 *             tags: ["e-commerce", "web development", "nodejs"]
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Project created successfully"
 *               projectId: "12345"
 *       400:
 *         description: Validation error
 *   get:
 *     summary: Get all projects of logged-in user
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             example:
 *               projects:
 *                 - id: "12345"
 *                   title: "E-commerce Website"
 *                   productImage: "https://example.com/image.png"
 *                   price: 499
 *                   shortDescription: "A modern e-commerce platform"
 *                 - id: "67890"
 *                   title: "Portfolio Site"
 *                   productImage: "https://example.com/portfolio.png"
 *                   price: 299
 *                   shortDescription: "A portfolio website template"
 */

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 productImage:
 *                   type: string
 *                 price:
 *                   type: number
 *                 shortDescription:
 *                   type: string
 *                 description:
 *                   type: string
 *                 productUrl:
 *                   type: string
 *                 category:
 *                   type: array
 *                   items:
 *                     type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *             example:
 *               id: "12345"
 *               title: "E-commerce Website"
 *               productImage: "https://example.com/image.png"
 *               price: 499
 *               shortDescription: "A modern e-commerce platform"
 *               description: "Detailed description here"
 *               productUrl: "https://example.com/product"
 *               category: ["e-commerce", "web development"]
 *               tags: ["nodejs", "swagger"]
 *       404:
 *         description: Project not found
 *
 *   patch:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - productImage
 *               - price
 *               - shortDescription
 *               - description
 *               - productUrl
 *               - category
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *               productImage:
 *                 type: string
 *               price:
 *                 type: number
 *               shortDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               productUrl:
 *                 type: string
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *           example:
 *             title: "Updated Project Title"
 *             productImage: "https://example.com/newimage.png"
 *             price: 599
 *             shortDescription: "Updated short description"
 *             description: "Updated detailed description"
 *             productUrl: "https://example.com/newproduct"
 *             category: ["updated-category"]
 *             tags: ["updated", "project"]
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Project updated successfully"
 *       404:
 *         description: Project not found
 *
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Project deleted successfully"
 *       404:
 *         description: Project not found
 */

router
  .route("/")
  .post(authentication, restrictTo("1", "2"), createProject)
  .get(authentication, restrictTo("1"), getAllProject);

router
  .route("/:id")
  .get(authentication, getProjectById)
  .patch(authentication, updateProject)
  .delete(authentication, deleteProject);

router.route("/projects/my").get(authentication, getMyProjects);

module.exports = router;
