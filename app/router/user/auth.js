const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: One Time Password(OTP) Login
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: them user mobile for singup/singnin
 *                  code:
 *                      type: integer
 *                      description: recived code from getOTP
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: One Time Password(OTP) Login
 */

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
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
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
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
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
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
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