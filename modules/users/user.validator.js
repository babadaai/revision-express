const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  phoneNum: Joi.number().integer(),
  role: Joi.string().valid("admin", "user"),
  isEmailVerified: Joi.boolean(),
  isActive: Joi.boolean(),
  image: Joi.string(),
});

const validator = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

module.exports = { validator };