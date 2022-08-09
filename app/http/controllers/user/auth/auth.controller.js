const { getOtpSchema,checkOtpSchema } = require("../../../validators/user/auth.schema");
const createError = require("http-errors");
const { RandomNumberGenerator, SignAccessToken, SignRefreshToken, VerifyRefreshToken } = require("../../../../utils/function");
const { UserModel } = require("../../../../models/users");
const Controller = require("../../controller");
const {ROLES} = require("../../../../utils/constans");

class UserAuthController extends Controller{

    async getOtp(req,res,next){
        try {
            await getOtpSchema.validateAsync(req.body);
            const {mobile} = req.body;
            const code = RandomNumberGenerator();
            const result = await this.saveUser(mobile,code);
            if(!result) throw createError.Unauthorized("ورود شما انجام نشد");
            return res.status(200).send({
                data : {
                    statuseCode: 200 ,
                    message : "کد اعتبارسنجی برای شما ارسال شد ",
                    code,
                    mobile
                }
            });
        } catch (error) {
            next(error);
    
         }
    }
    async checkOtp(req,res,next){
        try {
            await checkOtpSchema.validateAsync(req.body);
            const {mobile,code} = req.body;
            const user = await UserModel.findOne({mobile});
            if(!user) throw createError.NotFound("User Not Found");
            if(user.otp.code != code) throw createError.Unauthorized("The code is not correct");
            const now = Date.now();
            if(+user.otp.expiresIn < now) throw createError.Unauthorized("Your code has expired");
            const accessToken = await SignAccessToken(user._id);
            const newRefreshToken = await SignRefreshToken(user._id);
            return res.json({
                data : {
                    accessToken,
                    refreshToken : newRefreshToken
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async refreshToken(req,res,next){
        try {
            const {refreshToken} = req.body;
            const mobile = await VerifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({mobile});
            const accessToken = await SignAccessToken(user._id);
            const newRefreshToken = await SignRefreshToken(user._id);
            return res.json({
                data: {
                    accessToken ,
                    refreshToken : newRefreshToken
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async saveUser(mobile,code){
        let otp = {
            code ,
            expiresIn : new Date().getTime()+120000
        }
        const result = await this.checkExistUser(mobile);
        if(result){
          return (await this.updateUser(mobile,{otp}))
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            roles : [ROLES.USER]
        }))
        
    }
    async checkExistUser(mobile){
        const user = await UserModel.findOne({mobile}) ;
        return !!user
    }
    async updateUser(mobile,objectData={}){
        Object.keys(objectData).forEach(key =>{
            if([""," ",0,null,undefined,"0",NaN].includes(objectData[key]))
                 delete objectData[key]
        })
        const updateResult = await UserModel.updateOne({mobile},{$set : objectData})
        return !!updateResult.modifiedCount
    }


}
module.exports= {
    UserAuthController : new UserAuthController()
}