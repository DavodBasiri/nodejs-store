const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIdPatern } = require("../../utils/constans");
const ObjectIdValidator = Joi.object({
  id: Joi.string()
    .regex(MongoIdPatern)
    .error(
      new Error(createHttpError.BadRequest("The entered ID is not correct"))
    ),
});
module.exports = {
  ObjectIdValidator,
};
