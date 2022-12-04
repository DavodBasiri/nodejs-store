const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const router = require("express").Router();
/**
 * @swagger
 *  tags :
 *      -    name : Adimn-Panel
 *           description : Action Of Admin (add , remove , edit and... )
 *      -    name : Category(Adimn-Panel)
 *           description : All Method And Routes About Category Section
 *      -    name : Blogs(Admin-Panel)
 *           description : All Method And Routes About Category Section
 */
router.use("/category",CategoryRoutes);
router.use("/blog",BlogAdminApiRoutes);
router.use("/", (req,res,next) =>{
    try {
        return res.send("slm")
    } catch (error) {
        next(error)
    }
})
module.exports = {
    AdminRouts : router
}