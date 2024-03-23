const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//! user actions

//@desc Get all users
//@route GET /api/superadmin/users
//@access private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

//@desc Get user by id
//@route GET /api/superadmin/users/:id
//@access private
const getUserById = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  res.status(200).json(user);
});

//@desc Remove a User
//@route DELETE /api/superadmin/users/:id
//@access private
const removeUserById = asyncHandler(async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  res
    .status(200)
    .json({ msg: "user deleted successfully!", deleteduser: user });
});

//! todos actions

//@desc Get all todos
//@route GET /api/superadmin/todos
//@access private
const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await prisma.task.findMany();

  res.status(200).json(todos);
});

//@desc Get todo by id
//@route GET /api/superadmin/todos/:id
//@access private
const getTodoById = asyncHandler(async (req, res) => {
  const todo = await prisma.task.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!todo) {
    res.status(404);
    throw new Error("todo not found");
  }

  res.status(200).json(todo);
});

//@desc Removes todo by id
//@route DELETE /api/superadmin/todos/:id
//@access private
const removeTodoById = asyncHandler(async (req, res) => {
  const todo = await prisma.task.delete({
    where: {
      id: req.params.id,
    },
  });

  if (!todo) {
    res.status(404);
    throw new Error("todo not found");
  }

  res.status(200).json({ msg: "todo removed successfuly", removedTodo: todo });
});

//! admin actions

//@desc Get all admins
//@route GET /api/superadmin/admins
//@access private
const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
  });

  res.status(200).json(admins);
});

//@desc Get an admin by id
//@route GET /api/superadmin/admins/:id
//@access private
const getAdminById = asyncHandler(async (req, res) => {
  const admin = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!admin) {
    res.status(404);
    throw new Error(`no admin found with id: ${req.params.id}`);
  }

  res.status(200).json(admin);
});

module.exports = {
  getAllUsers,
  getUserById,
  removeUserById,
  getAllTodos,
  getTodoById,
  removeTodoById,
  getAllAdmins,
  getAdminById,
};
