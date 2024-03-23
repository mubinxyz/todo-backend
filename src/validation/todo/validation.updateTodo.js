const Joi = require("joi");

// Define Joi schema for validating id in req.params
const idSchema = Joi.object({
  id: Joi.number().integer().min(0).required().messages({
    "number.base": `"id" should be a type of number`,
    "number.integer": `"id" should be an integer`,
    "number.min": `"id" must be a non-negative number`,
    "any.required": `"id" is a required field`,
  }),
});

// Define Joi schema for validating the rest of the update fields in req.body
const updateFieldsSchema = Joi.object({
  title: Joi.string().messages({
    "string.base": `"title" should be a type of text`,
  }),
  description: Joi.string().allow("").messages({
    "string.base": `"description" should be a type of text`,
  }),
  due_date: Joi.date().optional().messages({
    "date.base": `"due_date" should be a valid date`,
  }),
  completed: Joi.boolean().messages({
    "boolean.base": `"completed" should be a boolean`,
  }),
}).options({ abortEarly: false }); // Collect all errors before returning

// Combined validation middleware function
const validateUpdateTodo = (req, res, next) => {
  // Validate id in req.params
  const paramValidation = idSchema.validate(req.params);
  if (paramValidation.error) {
    const errors = paramValidation.error.details.map((err) => err.message);
    return res.status(400).json({ errors });
  }

  // Validate update fields in req.body
  const bodyValidation = updateFieldsSchema.validate(req.body);
  if (bodyValidation.error) {
    const errors = bodyValidation.error.details.map((err) => err.message);
    return res.status(400).json({ errors });
  }

  // Combine validated values
  req.validatedUpdateTodoData = {
    id: paramValidation.value.id,
    ...bodyValidation.value,
  };
  next();
};

module.exports = {
  validateUpdateTodo,
};
