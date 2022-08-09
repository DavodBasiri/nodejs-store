const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
/**
 * @swagger
 *  tags :
 *      name : User-Authentication
 *      description : User-Auth Section
 */
/**
 * @swagger
 * /user/get-otp:
 *  post:
 *          tags : [User-Authentication]
 *          summary: Login User In UserPanel With Phone Number
 *          description: One Time Password(OTP) Login
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI PhoneNumber
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/get-otp",UserAuthController.getOtp);
/**
 * @swagger
 * /user/check-otp:
 *  post:
 *          tags : [User-Authentication]
 *          description: Check otp with code and mobile and expires date
 *          summary: Check-otp value in user controller
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI PhoneNumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code recived
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/check-otp",UserAuthController.checkOtp);
/**
 * @swagger
 * /user/refresh-token:
 *      post:
 *          tags : [User-Authentication]
 *          summary: Send Refresh Token For Get New Token And Refresh Token
 *          description: Refresh Token
 *          parameters:
 *          -   name: refreshToken
 *              description: Do it now
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not Found
 */
router.post("/refresh-token",UserAuthController.refreshToken);
module.exports={
    UserAuthRoutes : router
}