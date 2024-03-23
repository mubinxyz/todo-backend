const Joi = require("joi");

// Updated schema to allow id to be 0
const getUserByIdSchema = Joi.object({
  id: Joi.number().integer().min(0).required().messages({
    "number.base": `"id" should be a type of number`,
    "number.integer": `"id" should be an integer`,
    "number.min": `"id" must be a non-negative number`,
    "any.required": `"id" is a required field`,
  }),
});

// Validation middleware function remains the same
const validateGetTodoById = (req, res, next) => {
  const { error, value } = getTodoByIdSchema.validate(req.params, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ errors });
  }

  req.validatedTodoIdForGet = value.id;
  next();
};

module.exports = {
  validateGetTodoById,
};
