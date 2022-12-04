const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
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

module.exports = {
    AdminRouts : router
}