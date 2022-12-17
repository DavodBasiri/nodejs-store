const { CourseModel } = require("../../../models/course");
//const { creatCourseSchema } = require("../../validators/admin/Course.schema");
const Controller = require("../controller");
const path = require("path");
const {
  deleteFileInPublic,
  listOfImagesFromRequest,
  copyObject,
} = require("../../../utils/function");
const { StatusCodes: HttpSatatus } = require("http-status-codes");
const { ObjectIdValidator } = require("../../validators/public.validator");
const createHttpError = require("http-errors");
const { creatCourseSchema } = require("../../validators/admin/course.schema");
let images;
class CourseController extends Controller {
  async createCourse(req, res, next) {
    try {
      const CourseBody = await creatCourseSchema.validateAsync(req.body);
      const { discount, price, title, text, short_text, tags, category, type } =
        CourseBody;
      const teacher = req.user._id;
      const images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      const Course = await CourseModel.create({
        discount,
        price,
        title,
        text,
        short_text,
        tags,
        type,
        category,
        images,
        teacher,
      });
      if (Course) {
        return res.status(HttpSatatus.CREATED).json({
          data: {
            statusCode: HttpSatatus.CREATED,
            success: true,
            message: "Course Create Successfully",
            data: Course,
          },
        });
      }
      return res.status(HttpSatatus.INTERNAL_SERVER_ERROR).json({
        data: {
          statusCode: HttpSatatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: "Registration failed",
        },
      });
    } catch (error) {
      if (images)
        for (let index = 0; index < images.length; index++) {
          deleteFileInPublic(images[index]);
        }
      next(error);
    }
  }
  async getListOfCourses(req, res, next) {
    try {
      const Courses = await CourseModel.find({});
      if (Courses)
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: "List Of Courses",
            data: Courses,
          },
        });
    } catch (error) {
      next(error);
    }
  }
  async getOneCourseByID(req, res, next) {
    try {
      const { id } = req.params;
      const Course = await this.findCourseById(id);
      console.log(Course);
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Course find Successfully",
          data: Course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCourseByID(req, res, next) {
    try {
      const { id } = req.params;
      //const resulte= await CourseModel.findOneAndDelete({_id:id})
      //await this.findCourse(id)
      //const result = await CourseModel.deleteOne({_id:id})
      const result = await CourseModel.findOneAndDelete({ _id: id });

      if (!result) throw createHttpError.InternalServerError("Delete failed");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Course Delete Successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCourseBySearch(req, res, next) {
    try {
      const search = req?.query?.search || "";
      if (search) {
        const Courses = await CourseModel.find({
          $text: {
            $search: search,
          },
        });
        if (Courses.length > 0)
          return res.status(HttpSatatus.OK).json({
            data: {
              statusCode: HttpSatatus.OK,
              success: true,
              message: "List Of Courses",
              data: Courses,
            },
          });
        throw createHttpError.NotFound("Can not found Course");
      }
      throw createHttpError.NotFound("Can not found Course");
    } catch (error) {
      next(error);
    }
  }
  async updateCourseByID(req, res, next) {
    try {
      const { id } = req.params;
      const supplier = req.user._id;
      const data = copyObject(req.body);
      data.feture = this.setFeatures(req.body);
      //req.protocol +"://" +req.get("host") +"/" +path.join(CourseDataBody.fileUploadPath,CourseDataBody.filename).replace(/[\\\\]/gm, "/");
      const nullisData = process.env.NULLisData;
      const blockList = [
        "fileUploadPath",
        "filename",
        "comments",
        "likes",
        "deslikes",
        "bookmarks",
        "width",
        "length",
        "wighth",
        "height",
      ];
      Object.keys(data).forEach((key) => {
        if (blockList.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0)
          data[key] = data[key].map((item) => item.trim());
        if (Array.isArray(data[key]) && data[key].length > 0) delete data[key];
        if (nullisData.includes(data[key])) delete data[key];
      });
      images = data.images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      console.log(data);
      const updateResult = await CourseModel.updateOne(
        { _id: id, supplier },
        { $set: data }
      );
      if (updateResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("Update failed");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "The Course update was done successfully",
        },
      });
    } catch (error) {
      if (images)
        for (let index = 0; index < images.length; index++) {
          deleteFileInPublic(images[index]);
        }
      next(error);
    }
  }
  async findCourseById(CourseID) {
    const { id } = await ObjectIdValidator.validateAsync({ id: CourseID });
    const Course = await CourseModel.findById({ _id: id }).populate([
      { path: "category", select: ["title"] },
      { path: "teacher", select: ["mobile"] },
    ]);
    if (!Course) {
      throw createHttpError.NotFound("Can not found Course");
    }
    console.log(Course);
    return Course;
  }
  setFeatures(body) {
    const { width, length, wighth, height } = body;
    let features = {};
    if (
      !isNaN(+width) ||
      !isNaN(+length) ||
      !isNaN(+wighth) ||
      !isNaN(+height)
    ) {
      if (!width) features.width = 0;
      else features.width = +width;
      if (!length) features.length = 0;
      else features.length = +length;
      if (!wighth) features.wighth = 0;
      else features.wighth = +wighth;
      if (!height) features.height = 0;
      else features.height = +height;
    }
    return features;
  }
}
module.exports = {
  CourseController: new CourseController(),
};
