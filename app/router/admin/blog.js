const { string } = require("joi");
const {
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
/**
 * @swagger
 *  /admin/blog:
 *      get:
 *          tags: [Blogs(Admin-Panel)]
 *          sammary: get All Blogs
 *          responses:
 *              200:
 *                  description: Success - get arry of blogs
 */
router.get("/", AdminBlogController.getListOfBlogs);
/**
 * @swagger
 *  /admin/blog/add:
 *    post: 
 *      tags: [Blogs(Admin-Panel)]
 *      summary : Create Blog 
 *      customes:
 *          - multipart/form-data
 *          - application/x-www-form-data-urlencoded
 *      parameters:
 *          -   in: formData
 *              name: title
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: text
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: short_text
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: category
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: tags
 *              required: false
 *              type: string
 *          -   in: formData
 *              name: image
 *              required: true
 *              type: file
 *      responses: 
 *        201:
 *           description: Created - Success
 */
router.post('/add',uploadFile.single('image'),stringToArray('tags'),AdminBlogController.createBlog);
module.exports = {
  BlogAdminApiRoutes: router,
};
