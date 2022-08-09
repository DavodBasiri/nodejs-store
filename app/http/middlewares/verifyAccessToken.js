const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");

function VerifyAccessToken(req,res,next){
    const headers = req.headers;
    const [bearer,token] = headers?.["accesstoken"]?.split(" ") || [];
    if(token && ["Bearer","bearer"].includes(bearer)){
        JWT.verify(token,ACCESS_TOKEN_SECRET_KEY,async(err,payload) =>{
            if(err) return next(createHttpError.Unauthorized("Please login"))
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile},{password : 0 , otp : 0});
            if(!user) return next( createHttpError.Unauthorized("User Not Found"))
            req.user=user;
            return next();
        })
        
    }
   else
    return next(createHttpError.Unauthorized("Please login"))
}
module.exports={
    VerifyAccessToken
}