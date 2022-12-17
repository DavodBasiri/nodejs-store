
  
//-------------------------- Components Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          TypesSchema:
 *              type:   string
 *              enum:
 *                  -   free
 *                  -   vip
 *                  -   cip
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   price
 *                  -   discount
 *                  -   category
 *                  -   images
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the titile of Course
 *                      example: title 1
 *                  short_text:
 *                      type: string
 *                      description: Parent of Course
 *                      example: short_text 1
 *                  text:
 *                      type: string
 *                      description: the titile of Course
 *                      example: text 1
 *                  tags:
 *                      type: array
 *                      description: Parent of Course
 *                  category:
 *                      type: string
 *                      description: the titile of Course
 *                      example: 62f135f2c84a39295fcf9302
 *                  price:
 *                      type: string
 *                      description: Parent of Course
 *                      example: 1000
 *                  discount:
 *                      type: string
 *                      description: Parent of Course
 *                      example: 10
 *                  type:
 *                      $ref:  '#/components/schemas/TypesSchema'
 *                  images:
 *                      type: array
 *                      description: Parent of
 *                      items:
 *                          type: string
 *                          format: binary
 *          CoursesEdit:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the titile of courses
 *                  short_text:
 *                      type: string
 *                      description: Parent of courses
 *                  text:
 *                      type: string
 *                      description: the titile of courses
 *                  tags:
 *                      type: array
 *                      description: Parent of courses
 *                  category:
 *                      type: string
 *                      description: the titile of courses
 *                  price:
 *                      type: string
 *                      description: Parent of courses
 *                  discount:
 *                      type: string
 *                      description: Parent of courses
 *                  images:
 *                      type: array
 *                      description: Parent of
 *                      items:
 *                          type: string
 *                          format: binary
 *
 */

//-------------------------- courses/add

/**
 * @swagger
 * /admin/courses/add:
 *      post:
 *          tags : [Adimn-Panel(Course)]
 *          summary: Create New courses Title
 *          description: Add An courses eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYyZWE0MmMxNjZjNDRlMTgxYWFlNjE3NSIsImlhdCI6MTY3MTMwNTM0MywiZXhwIjoxNjcxMzkxNzQzfQ.JemIYi6Dg5IUCmIGj7Yng7ZjCd6pknErcWYayLxVd-E
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                       schema:
 *                          $ref: '#/components/schemas/Course'
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
 * /admin/courses/update/{id}:
 *  patch:
 *          tags : [Adimn-Panel(Course)]
 *          summary: Create New courses Title
 *          description: Add An courses eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYyZWE0MmMxNjZjNDRlMTgxYWFlNjE3NSIsImlhdCI6MTY3MTA5NTcxOSwiZXhwIjoxNjcxMTgyMTE5fQ.ep2o2TU-_gYs5Ty3XF7nN6LaROgVVP9MiDEUdmQ87qs
 *          parameters:
 *          -   name: id
 *              in: path
 *              required: true
 *              type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                         $ref: '#/components/schemas/Course'
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
 *  /admin/courses:
 *    get:
 *      tags: [Adimn-Panel(Course)]
 *      sammary: get All courses
 *      responses:
 *              200:
 *                  description: Success - get arry of courses
 */

/**
 * @swagger
 * /admin/courses/{id}:
 *   get:
 *          tags : [Adimn-Panel(Course)]
 *          summary: Find courses By Id
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

/**
 * @swagger
 * /admin/courses/delete/{id}:
 *   delete:
 *          tags : [Adimn-Panel(Course)]
 *          summary: Delete courses By Id
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
 *  /admin/courses/searchs:
 *    get:
 *      tags: [Adimn-Panel(Course)]
 *      sammary: get All coursess By search
 *      description: text for search in title text short-text eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYyZWE0MmMxNjZjNDRlMTgxYWFlNjE3NSIsImlhdCI6MTY3MTA5NTcxOSwiZXhwIjoxNjcxMTgyMTE5fQ.ep2o2TU-_gYs5Ty3XF7nN6LaROgVVP9MiDEUdmQ87qs
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *      responses:
 *              200:
 *                  description: Success - get arry of courses
 */
