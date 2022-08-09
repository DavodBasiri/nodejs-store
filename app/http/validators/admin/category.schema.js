const Joi = require("joi");
const { MongoIdPatern } = require("../../../utils/constans");
const addCetegorySchema =Joi.object({
    title : Joi.string().trim().max(30).min(3).required().error(new Error("pls enter title")),
    parent: Joi.string().pattern(MongoIdPatern).allow('').allow("").error(new Error("pls enter parent"))
  
})
module.exports ={
    addCetegorySchema
}