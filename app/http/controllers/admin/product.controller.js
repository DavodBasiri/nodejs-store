const { ProductModel } = require("../../../models/products");
const { creatProductSchema } = require("../../validators/admin/product.schema");
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
let images;
class ProductController extends Controller {
  async createProduct(req, res, next) {
    try {
      const productBody = await creatProductSchema.validateAsync(req.body);
      const {
        discount,
        width,
        length,
        wighth,
        height,
        price,
        title,
        text,
        count,
        short_text,
        tags,
        category,
      } = productBody;
      let feture = {},
        type = "physical";
      if (width || length || wighth || height) {
        console.log(1);
      } else type = "virtual";
      feture.width = width;
      feture.length = length;
      feture.wighth = wighth;
      feture.height = height;
      const images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      const supplier = req.user._id;
      const product = await ProductModel.create({
        discount,
        feture,
        price,
        title,
        text,
        count,
        short_text,
        tags,
        type,
        category,
        images,
        supplier,
      });
      if (product) {
        return res.status(HttpSatatus.CREATED).json({
          data: {
            statusCode: HttpSatatus.CREATED,
            success: true,
            message: "product Create Successfully",
            data: product,
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
      if (req.body.images) deleteFileInPublic(req.body.images);
      next(error);
    }
  }
  async getListOfProducts(req, res, next) {
    try {
      const Products = await ProductModel.find({});
      if (Products)
        return res.status(HttpSatatus.OK).json({
          data: {
            statusCode: HttpSatatus.OK,
            success: true,
            message: "List Of Products",
            data: Products,
          },
        });
    } catch (error) {
      next(error);
    }
  }
  async getOneProductByID(req, res, next) {
    try {
      const { id } = req.params;
      const Product = await this.findProductById(id);
      console.log(Product);
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Product find Successfully",
          data: Product,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteProductByID(req, res, next) {
    try {
      const { id } = req.params;
      //const resulte= await ProductModel.findOneAndDelete({_id:id})
      //await this.findProduct(id)
      //const result = await ProductModel.deleteOne({_id:id})
      const result = await ProductModel.findOneAndDelete({ _id: id });

      if (!result) throw createHttpError.InternalServerError("Delete failed");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "Product Delete Successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getProductBySearch(req, res, next) {
    try {
      const search = req?.query?.search || "";
      if (search) {
        const Products = await ProductModel.find({
          $text: {
            $search: search,
          },
        });
        console.log(Products);
        if (Products.length > 0)
          return res.status(HttpSatatus.OK).json({
            data: {
              statusCode: HttpSatatus.OK,
              success: true,
              message: "List Of Products",
              data: Products,
            },
          });
        throw createHttpError.NotFound("Can not found Product");
      }
      throw createHttpError.NotFound("Can not found Product");
    } catch (error) {
      next(error);
    }
  }
  async updateProductByID(req, res, next) {
    try {
      const { id } = req.params;
      const supplier = req.user._id;
      const data = copyObject(req.body);
      data.feture = this.setFeatures(req.body);
      //req.protocol +"://" +req.get("host") +"/" +path.join(ProductDataBody.fileUploadPath,ProductDataBody.filename).replace(/[\\\\]/gm, "/");
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
      const updateResult = await ProductModel.updateOne(
        { _id: id, supplier },
        { $set: data }
      );
      if (updateResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("Update failed");
      return res.status(HttpSatatus.OK).json({
        data: {
          statusCode: HttpSatatus.OK,
          success: true,
          message: "The Product update was done successfully",
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
  async findProductById(productID) {
    const { id } = await ObjectIdValidator.validateAsync({ id: productID });
    const Product = await ProductModel.findById({ _id: id }).populate([
      { path: "category", select: ["title"] },
      { path: "supplier", select: ["mobile"] },
    ]);
    if (!Product) {
      throw createHttpError.NotFound("Can not found Product");
    }
    console.log(Product);
    return Product;
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
  ProductController: new ProductController(),
};
