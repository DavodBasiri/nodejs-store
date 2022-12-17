const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { AdminApiBlogRoutes } = require("./blog.routes");
const { AdminApiCategoryRoutes } = require("./category.routes");
const { AdminApiCourseRouter } = require("./course.routes");
const { AdminApiProductRouter } = require("./product.routes");
const router = require("express").Router();
/**
 * @swagger
 *  tags :
 *      -    name : Adimn-Panel(Course)
 *           description : All Method And Course About Course Section
 *      -    name : Adimn-Panel(Product)
 *           description : All Method And Routes About Product Section
 *      -    name : Category(Adimn-Panel)
 *           description : All Method And Routes About Category Section  
 *      -    name : Blogs(Admin-Panel)
 *           description : All Method And Routes About Blog Section
 */
router.use("/category",AdminApiCategoryRoutes);
router.use("/blog",AdminApiBlogRoutes);
router.use("/product",AdminApiProductRouter);
router.use("/courses",AdminApiCourseRouter);

module.exports = {
    AdminRouts : router
}