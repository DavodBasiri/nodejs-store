const { creatBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");

class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      await creatBlogSchema.validateAsync(req.body);
      return res.status(201).json({
        data: {
          statusCode: 201,
          success: true,
          message: "Blog Create Successfully",
          data:req.body
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneBlogByID(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      console.log("first");
      return res.status(200).json({
        data: {
          statusCode: 200,
          success: true,
          message: "List Of Blogs",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCommentsOfBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async deleteBlogByID(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async updateBlogByID(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  AdminBlogController: new BlogController(),
};
