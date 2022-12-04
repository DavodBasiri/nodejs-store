const { VerifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");
const redisClient = require("../utils/init_redis");
const { AdminRouts } = require("./admin/admin.router");
const { HomeRouts } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRoutes } = require("./user/auth");
(async() =>{
    await redisClient.set("key","value");
    const value = await redisClient.get("key");
    console.log(value);
})()
const router=require("express").Router();
router.use("/user",UserAuthRoutes);
router.use("/admin",VerifyAccessToken,checkRole('ADMIN'),AdminRouts);
router.use("/developer" , DeveloperRoutes);
router.use("/",HomeRouts);
module.exports= {
    AllRoutes : router
}