const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIdPatern } = require("../../../utils/constans");
const creatBlogSchema = Joi.object({
  title: Joi.string().trim().max(30).min(3).required().error(createHttpError.BadRequest("pls enter title")),
  text: Joi.string().error(createHttpError.BadRequest("Pls Enter Text")),
  short_text: Joi.string().error(createHttpError.BadRequest("Pls Enter Short text")),
  filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif|)$/).error(createHttpError.BadRequest("Pls Send Image")),
  tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("Max of tags is 20")),
  category: Joi.string()
    .pattern(MongoIdPatern)
    .error(createHttpError.BadRequest("Can not found Category")),
    fileUploadPath:Joi.allow(),
});
module.exports = {
  creatBlogSchema,
};
