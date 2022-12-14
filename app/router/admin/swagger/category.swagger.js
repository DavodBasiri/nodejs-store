
/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the titile of Category
 *                  parent:
 *                      type: string
 *                      description: Parent of Category
 *        
 */
/**
 * @swagger
 * /admin/category/add:
 *  post:
 *          tags : [Category(Adimn-Panel)]
 *          summary: Create New Category Title
 *          description: Add An Category
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
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
 * /admin/category/parents:
 *  get:
 *          tags : [Category(Adimn-Panel)]
 *          summary: Get All Parent Of Category
 *          description: Get Parent
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/category/children/{parent}:
 *  get:
 *          tags : [Category(Adimn-Panel)]
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

 /**
 * @swagger
 * /admin/category/all-category:
 *  get:
 *          tags : [Category(Adimn-Panel)]
 *          summary: Get All Category
 *          description: Get Category
 *          responses:
 *              200:
 *                  description: Success
 */

 /**
 * @swagger
 * /admin/category/all-category-aggregate:
 *  get:
 *          tags : [Category(Adimn-Panel)]
 *          summary: Get All Category
 *          description: Get Category
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 * /admin/category/delete/{id}:
 *  delete:
 *          tags : [Category(Adimn-Panel)]
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

/**
 * @swagger
 * /admin/category/edit/{id}:
 *  patch:
 *          tags : [Category(Adimn-Panel)]
 *          summary: Edit Category By Id
 *          description: Edit
 *          parameters:
 *          -   name: id
 *              description: enter ID
 *              in: path
 *              required: true
 *              type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              200:
 *                  description: Success
 *              500:
 *                  description: Internal Server Error
 */

 /**
 * @swagger
 * /admin/category/{id}:
 *  get:
 *          tags : [Category(Adimn-Panel)]
 *          summary: Find Category By Id
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
