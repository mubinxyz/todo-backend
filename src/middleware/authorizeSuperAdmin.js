const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authSuperAdmin = asyncHandler(async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    res.status(404);
    throw new Error("user not found.");
  }

  if (user.role === "SUPERADMIN") {
    res.status(200);
    next();
  } else {
    res
      .status(401)
      .json({ msg: "you are not alowed to see super-admin routes." });
  }
});

module.exports = authSuperAdmin;
