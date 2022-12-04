const { creatBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const path = require("path");
const { BlogModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/function");
const createHttpError = require("http-errors");
class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await creatBlogSchema.validateAsync(req.body);
      //req.protocol +"://" +req.get("host") +"/" +path.join(blogDataBody.fileUploadPath,blogDataBody.filename).replace(/[\\\\]/gm, "/");
      req.body.image = path
        .join(blogDataBody.fileUploadPath, blogDataBody.filename)
        .replace(/[\\\\]/gm, "/");
      const image = req.body.image;
      const { text, title, tags, short_text, category } = req.body;
      const author = req.user._id;
      const blog = await BlogModel.create({
        title,
        tags,
        short_text,
        category,
        image,
        author,
        text,
      });
      if (blog) {
        return res.status(201).json({
          data: {
            statusCode: 201,
            success: true,
            message: "Blog Create Successfully",
            data: blog,
          },
        });
      }
      return res.status(500).json({
        data: {
          statusCode: 500,
          success: false,
          message: "Registration failed",
        },
      });
    } catch (error) {
      if (req.body.image) deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getOneBlogByID(req, res, next) {
    try {
      const { id } = req.params;
      console.log("inja");
      const blog = await this.findBlog({ _id: id });
      console.log(blog);
      return res.status(200).json({
        data: {
          statusCode: 200,
          success: true,
          message: "Blog find Successfully",
          data: blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      const blogs = await BlogModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            "author.roles": 0,
            "author.otp": 0,
            "author.bills": 0,
            "author.__v": 0,
            "category.__v": 0,
          },
        },
      ]);
      if (blogs)
        return res.status(200).json({
          data: {
            statusCode: 200,
            success: true,
            message: "List Of Blogs",
            data: blogs,
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
      const { id } = req.params;
      //const resulte= await BlogModel.findOneAndDelete({_id:id})
      //await this.findBlog(id)
      //const result = await BlogModel.deleteOne({_id:id})
      const result = await BlogModel.findOneAndDelete({ _id: id });
      if (!result) throw createHttpError.InternalServerError("Delete failed");
      return res.status(200).json({
        data: {
          statusCode: 200,
          success: true,
          message: "Blog Delete Successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBlogByID(req, res, next) {
    try {
      const { id } = req.params;
      const author = req.user._id;
      console.log(author)
      //req.protocol +"://" +req.get("host") +"/" +path.join(blogDataBody.fileUploadPath,blogDataBody.filename).replace(/[\\\\]/gm, "/");
      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path
          .join(req.body.fileUploadPath, req.body.filename)
          .replace(/[\\\\]/gm, "/");
      }
      const data = req.body;
      const nullisData = process.env.NULLisData;
      const blockList = ["comments", "likes", "deslikes", "bookmarks"];
      Object.keys(data).forEach((key) => {
        if (blockList.includes(data[key])) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && Array.length > 0)
          data[key] = data[key].map((item) => item.trim());
        if (nullisData.includes(data[key])) delete data[key];
      });
      const updateResult = await BlogModel.updateOne(
        { _id: id ,author},
        { $set: data }
      );
      if (updateResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("Update failed");
      return res.status(200).json({
        data: {
          statusCode: 200,
          success: true,
          message: "The blog update was done successfully"
        },
      });
    } catch (error) {
      if (req.body.image) deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async findBlog(_id) {
    const blog = await BlogModel.findById({ _id }).populate([
      { path: "category", select: ["title"] },
      { path: "author", select: ["mobile"] },
    ]);
    if (!blog) {
      throw createHttpError.NotFound("Can not found Blog");
    }
    console.log(blog);
    return blog;
  }
}
module.exports = {
  AdminBlogController: new BlogController(),
};
