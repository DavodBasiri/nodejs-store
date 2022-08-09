const { CategoryRoutes } = require("./category");
const router = require("express").Router();
/**
 * @swagger
 *  tags :
 *      name : Adimn-Panel
 *      description : User-Auth Section
 */
router.use("/category",CategoryRoutes);
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