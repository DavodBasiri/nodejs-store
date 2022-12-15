const { ProductController } = require('../../http/controllers/admin/product.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadFile } = require('../../utils/multer');

const router = require("express").Router();
router.get('/',ProductController.getListOfProducts);
router.get('/:id',ProductController.getOneProductByID);
router.post('/add',uploadFile.array('images',10),stringToArray('tags'),ProductController.createProduct);
// router.patch();
// router.delete();

// router.get();
//-------------------------- Components Schema 

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the titile of Product
 *                  short_text:
 *                      type: string
 *                      description: Parent of Product
 *                  text:
 *                      type: string
 *                      description: the titile of Product
 *                  tags:
 *                      type: array
 *                      description: Parent of Product
 *                  category:
 *                      type: string
 *                      description: the titile of Product
 *                  price:
 *                      type: string
 *                      description: Parent of Product
 *                  count:
 *                      type: string
 *                      description: the titile of Product
 *                  discount:
 *                      type: string
 *                      description: Parent of Product
 *                  height:
 *                      type: string
 *                      description: Parent of Product
 *                  width:
 *                      type: string
 *                      description: Parent of Product
 *                  wighth:
 *                      type: string
 *                      description: Parent of Product
 *                  length:
 *                      type: string
 *                      description: Parent of Product 
 *                  images:
 *                      type: array
 *                      description: Parent of 
 *                      items:
 *                          type: string
 *                          format: binary
 *        
 */

//-------------------------- product/add

/**
 * @swagger
 * /admin/product/add:
 *  post:
 *          tags : [Adimn-Panel(Product)]
 *          summary: Create New Product Title
 *          description: Add An Product eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYyZWE0MmMxNjZjNDRlMTgxYWFlNjE3NSIsImlhdCI6MTY3MDk0MDk5OCwiZXhwIjoxNjcxMDI3Mzk4fQ.FrjJe1mZNPVtKsBq7d9UI-Om5PMLnVWVGR3UVd5_NaQ
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
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
/**
 * @swagger
 *  /admin/product:
 *    get:
 *      tags: [Adimn-Panel(Product)]
 *      sammary: get All Product
 *      responses:
 *              200:
 *                  description: Success - get arry of Product
 */
 /**
 * @swagger
 * /admin/product/{id}:
 *   get:
 *          tags : [Adimn-Panel(Product)]
 *          summary: Find Product By Id
 *          description: Find
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
module.exports={
    AdminApiProductRouter: router
}