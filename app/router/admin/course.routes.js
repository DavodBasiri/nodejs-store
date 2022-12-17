const {
  CourseController,
} = require("../../http/controllers/admin/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post(
  "/add",
  uploadFile.array("images", 10),
  stringToArray("tags"),
  CourseController.createCourse
);
router.patch('/update/:id',uploadFile.array('images',10),stringToArray('tags'),CourseController.updateCourseByID);
router.get('/searchs',CourseController.getCourseBySearch);
router.delete("/delete/:id",CourseController.deleteCourseByID);
router.get("/", CourseController.getListOfCourses);
router.get("/:id", CourseController.getOneCourseByID);
module.exports = {
    AdminApiCourseRouter: router,
  };