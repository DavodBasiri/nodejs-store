const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIdPatern } = require("../../../utils/constans");
const creatProductSchema = Joi.object({
  title: Joi.string().trim().max(30).min(3).required().error(createHttpError.BadRequest("pls enter title")),
  text: Joi.string().error(createHttpError.BadRequest("Pls Enter Text")),
  short_text: Joi.string().error(createHttpError.BadRequest("Pls Enter Short text")),
  type: Joi.string().error(createHttpError.BadRequest("Pls Enter product type")),
  filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif|)$/).error(createHttpError.BadRequest("Pls Send Image")),
  tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("Max of tags is 20")),
  price: Joi.number().error(createHttpError.BadRequest("The entered price is not correct")),
  discount: Joi.number().error(createHttpError.BadRequest("The entered discount is not correct")),
  count: Joi.number().error(createHttpError.BadRequest("The entered count is not correct")),
  length: Joi.number().allow(null,0,'0','').error(createHttpError.BadRequest("The entered length is not correct")),
  height: Joi.number().allow(null,0,'0','').error(createHttpError.BadRequest("The entered height is not correct")),
  width: Joi.number().allow(null,0,'0','').error(createHttpError.BadRequest("The entered width is not correct")),
  wighth: Joi.number().allow(null,0,'0','').error(createHttpError.BadRequest("The entered wighth is not correct")),

  category: Joi.string()
    .pattern(MongoIdPatern).allow('').allow("")
    .error(createHttpError.BadRequest("Can not found Category")),
    fileUploadPath:Joi.allow(),
});
module.exports = {
    creatProductSchema,
};
