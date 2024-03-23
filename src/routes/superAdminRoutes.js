const { Router } = require("express");
const superAdminController = require("../controllers/superAdminController.js");
const validateToken = require("../middleware/validateTokenHandler.js");
const authorizeSuperAdmin = require("../middleware/authorizeSuperAdmin.js");

const router = Router();

router.use(validateToken);
router.use(authorizeSuperAdmin);

// user actions
router.get("/users", superAdminController.getAllUsers);
router.get("/users/:id", superAdminController.getUserById);
router.delete("/users/:id", superAdminController.removeUserById);

// todo actions
router.get("/todos", superAdminController.getAllTodos);
router.get("/todos/:id", superAdminController.getTodoById);
router.delete("/users/:id", superAdminController.removeTodoById);

// admin actions
router.get("/admins", superAdminController.getAllAdmins);
router.get("/admins/:id", superAdminController.getAdminById);

module.exports = router;
