const router = require("express").Router();
const bcrypt = require("bcrypt");
const { RandomNumberGenerator } = require("../utils/function");
/**
 * @swagger
 *  tags :
 *      name : Developer-Routes
 *      description : developer Utils
 */
/**
 * @swagger
 * /developer/password-hash/{password}:
 *  get:
 *          tags : [Developer-Routes]
 *          summary: hash data with bcrypt
 *          description: hash for test
 *          parameters:
 *          -   name: password
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */
router.get("/password-hash/:password", (req,res,next) => {
    const {password} = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.send(bcrypt.hashSync(password,salt));
})
/**
 * @swagger
 * /developer/random-number:
 *  get:
 *          tags : [Developer-Routes]
 *          summary: Get Random Number
 *          description: Random Number For Developer
 *          responses:
 *              200:
 *                  description: Success
 */
 router.get("/random-number", (req,res,next) => {

    return res.send(RandomNumberGenerator().toString());
})
module.exports ={
    DeveloperRoutes : router
}