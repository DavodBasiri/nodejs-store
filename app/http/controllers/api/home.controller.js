const createError = require("http-errors")
const { authSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");

module.exports=new class HomeContoller extends Controller{
    async indexPage(req,res,next){
       try {
            return res.status(200).send("index Page Store");
       } catch (error) {
                next(error)
        
       }
    }
}