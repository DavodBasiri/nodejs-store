const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();
/**
 * @swagger
 * /admin/category/add:
 *  post:
 *          tags : [Adimn-Panel]
 *          summary: Create New Category Title
 *          description: Add An Category
 *          parameters:
 *          -   name: title
 *              description: enter title
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: parent
 *              description: enter parent
 *              in: formData
 *              required: false
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
router.post("/add",CategoryController.addCategory);
/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *          tags : [Adimn-Panel]
 *          summary: Get All Parent Of Category
 *          description: Get Parent
 *          responses:
 *              200:
 *                  description: Success
 */
router.get("/parents",CategoryController.getAllParentCategory);
/**
 * @swagger
 * /admin/category/children/{parent}:
 *  get:
 *          tags : [Adimn-Panel]
 *          summary: Get All Children Of Parent
 *          description: Get Child
 *          parameters:
 *          -   name: parent
 *              description: enter parent
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */
 router.get("/children/:parent",CategoryController.getChlidOfParent);
 /**
 * @swagger
 * /admin/category/all-category:
 *  get:
 *          tags : [Adimn-Panel]
 *          summary: Get All Category
 *          description: Get Category
 *          responses:
 *              200:
 *                  description: Success
 */
router.get("/all-category",CategoryController.getAllCategory);
/**
 * @swagger
 * /admin/category/delete/{id}:
 *  delete:
 *          tags : [Adimn-Panel]
 *          summary: Delete Category By Id
 *          description: Delete
 *          parameters:
 *          -   name: id
 *              description: enter ID
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */
 router.delete("/delete/:id",CategoryController.removeCategory);
module.exports ={
    CategoryRoutes : router
}