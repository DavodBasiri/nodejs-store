const { string } = require("joi");
const {
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYyZWE0MmMxNjZjNDRlMTgxYWFlNjE3NSIsImlhdCI6MTY3MDk0MDk5OCwiZXhwIjoxNjcxMDI3Mzk4fQ.FrjJe1mZNPVtKsBq7d9UI-Om5PMLnVWVGR3UVd5_NaQ
const router = require("express").Router();
router.get("/", AdminBlogController.getListOfBlogs);
router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.createBlog
);
router.patch(
  "/update/:id",
  uploadFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.updateBlogByID
);
router.get("/:id", AdminBlogController.getOneBlogByID);
router.delete("/:id", AdminBlogController.deleteBlogByID);
module.exports = {
  AdminApiBlogRoutes: router,
};