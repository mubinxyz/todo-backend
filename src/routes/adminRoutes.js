const { Router } = require("express");
const adminController = require("../controllers/adminController.js");
const validateToken = require("../middleware/validateTokenHandler.js");
const authorizeAdmin = require("../middleware/authorizeAdmin.js");

const router = Router();

router.use(validateToken);
router.use(authorizeAdmin);

// user actions
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);

// todo actions
router.get("/todos", adminController.getAllTodos);
router.get("/todos/:id", adminController.getTodoById);

module.exports = router;
