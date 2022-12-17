const homeController = require("../../http/controllers/api/home.controller");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const router= require("express").Router();
/**
 * @swagger
 *  tags :
 *      name : IndexPage
 *      description : index page route and data
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags : [IndexPage]
 *      description: get all data for index page
 *      parameters:
 *          -   in: header
 *              name: accesstoken
 *              example: Bearer YourToken...
 *      responses:
 *          200 :
 *              description: success
 *          404: 
 *              description: NotFund
 */
router.get("/",VerifyAccessToken,homeController.indexPage);
module.exports={
    HomeRouts: router
}