const Joi = require("joi");
const getOtpSchema =Joi.object({
    mobile : Joi.string().trim().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل واردشده صحیح نمی باشد"))

    //  email : Joi.string().trim().lowercase().email().required().error(new Error("ایمیل وارد شده صحیح نمی باشد")),
   // password : Joi.string().trim().min(6).max(16).required().error(new Error("رمز عبور باید بین 6 -16 کاراکتر باشد"))
})
const checkOtpSchema =Joi.object({
    mobile : Joi.string().trim().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل واردشده صحیح نمی باشد")),
    code: Joi.string().max(6).min(4).required().error(new Error("کد وارد شده صحیح نمی باشد"))
  
})
module.exports ={
    getOtpSchema,
    checkOtpSchema
}