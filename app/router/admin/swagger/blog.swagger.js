
/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the titile of Category
 *                  text:
 *                      type: string
 *                      description: text of blog
 *                  short_text:
 *                      type: string
 *                      description: summery of text of blog
 *                  category:
 *                      type: string
 *                      description: id of category for foreinField in blog
 *                  tags:
 *                      type: string
 *                      description: list of tags tag#tag2
 *                  image:
 *                      type: file
 *                      description: index picture of blo\g
 *
 */

/**
 * @swagger
 *  /admin/blog:
 *    get:
 *      tags: [Blogs(Admin-Panel)]
 *      sammary: get All Blogs
 *      responses:
 *              200:
 *                  description: Success - get arry of blogs
 */

/**
 * @swagger
 *  /admin/blog/add:
 *    post:
 *      tags: [Blogs(Admin-Panel)]
 *      summary : Create Blog
 *      requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *
 *      responses:
 *        201:
 *           description: Created - Success
 */


/**
 * @swagger
 *  /admin/blog/update/{id}:
 *    patch:
 *      tags: [Blogs(Admin-Panel)]
 *      summary : update Blog By Id
 *      customes:
 *          - multipart/form-data
 *      parameters:
 *          -   in: header
 *              name: accesstoken
 *              value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYyZWE0MmMxNjZjNDRlMTgxYWFlNjE3NSIsImlhdCI6MTY3MDk0MDk5OCwiZXhwIjoxNjcxMDI3Mzk4fQ.FrjJe1mZNPVtKsBq7d9UI-Om5PMLnVWVGR3UVd5_NaQ
 *              required: true
 *              type: string
 *          -   name: id
 *              description: enter ID
 *              in: path
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: title
 *              type: string
 *          -   in: formData
 *              name: text
 *              type: string
 *          -   in: formData
 *              name: text
 *              type: string
 *          -   in: formData
 *              name: short_text
 *              type: string
 *          -   in: formData
 *              name: category
 *              type: string
 *              value : 62ee90905bd49f88d5622c34
 *          -   in: formData
 *              name: tags
 *              required: false
 *              type: string
 *          -   in: formData
 *              name: image
 *              type: file
 *      responses:
 *        201:
 *           description: Created - Success
 */

/**
 * @swagger
 * /admin/blog/{id}:
 *   get:
 *          tags : [Blogs(Admin-Panel)]
 *          summary: Find blog By Id
 *          description: Find
 *          parameters:
 *          -   in: header
 *              name: accesstoken
 *              value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYyZWE0MmMxNjZjNDRlMTgxYWFlNjE3NSIsImlhdCI6MTY3MDk0MDk5OCwiZXhwIjoxNjcxMDI3Mzk4fQ.FrjJe1mZNPVtKsBq7d9UI-Om5PMLnVWVGR3UVd5_NaQ
 *              required: true
 *              type: string
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
 * /admin/blog/{id}:
 *   delete:
 *          tags : [Blogs(Admin-Panel)]
 *          summary: Find delete By Id
 *          description: Find
 *          parameters:
 *          -   in: header
 *              name: accesstoken
 *              value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYyZWE0MmMxNjZjNDRlMTgxYWFlNjE3NSIsImlhdCI6MTY3MDk0MDk5OCwiZXhwIjoxNjcxMDI3Mzk4fQ.FrjJe1mZNPVtKsBq7d9UI-Om5PMLnVWVGR3UVd5_NaQ
 *              required: true
 *              type: string
 *          -   name: id
 *              description: enter ID
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success
 */

