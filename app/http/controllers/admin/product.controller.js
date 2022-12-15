const { ProductModel } = require("../../../models/products");
const { creatProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");
const {
  deleteFileInPublic,
  listOfImagesFromRequest,
} = require("../../../utils/function");
const { ObjectIdValidator } = require("../../validators/public.validator");
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
        return res.status(201).json({
          data: {
            statusCode: 201,
            success: true,
            message: "product Create Successfully",
            data: product,
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
      if (req.body.images) deleteFileInPublic(req.body.images);
      next(error);
    }
  }
  async getListOfProducts(req, res, next) {
    try {
      const Products = await ProductModel.find({});
      if (Products)
        return res.status(200).json({
          data: {
            statusCode: 200,
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
      console.log("inja");
      const Product = await this.findProductById(id);
      console.log(Product);
      return res.status(200).json({
        data: {
          statusCode: 200,
          success: true,
          message: "Product find Successfully",
          data: Product,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  //   async getCommentsOfProduct(req, res, next) {
  //     try {
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  //   async deleteProductByID(req, res, next) {
  //     try {
  //       const { id } = req.params;
  //       //const resulte= await ProductModel.findOneAndDelete({_id:id})
  //       //await this.findProduct(id)
  //       //const result = await ProductModel.deleteOne({_id:id})
  //       const result = await ProductModel.findOneAndDelete({ _id: id });
  //       if (!result) throw createHttpError.InternalServerError("Delete failed");
  //       return res.status(200).json({
  //         data: {
  //           statusCode: 200,
  //           success: true,
  //           message: "Product Delete Successfully",
  //         },
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  //   async updateProductByID(req, res, next) {
  //     try {
  //       const { id } = req.params;
  //       const author = req.user._id;
  //       console.log(author);
  //       //req.protocol +"://" +req.get("host") +"/" +path.join(ProductDataBody.fileUploadPath,ProductDataBody.filename).replace(/[\\\\]/gm, "/");
  //       if (req?.body?.fileUploadPath && req?.body?.filename) {
  //         req.body.image = path
  //           .join(req.body.fileUploadPath, req.body.filename)
  //           .replace(/[\\\\]/gm, "/");
  //       }
  //       const data = req.body;
  //       const nullisData = process.env.NULLisData;
  //       const blockList = ["comments", "likes", "deslikes", "bookmarks"];
  //       Object.keys(data).forEach((key) => {
  //         if (blockList.includes(data[key])) delete data[key];
  //         if (typeof data[key] == "string") data[key] = data[key].trim();
  //         if (Array.isArray(data[key]) && Array.length > 0)
  //           data[key] = data[key].map((item) => item.trim());
  //         if (nullisData.includes(data[key])) delete data[key];
  //       });
  //       const updateResult = await ProductModel.updateOne(
  //         { _id: id, author },
  //         { $set: data }
  //       );
  //       if (updateResult.modifiedCount == 0)
  //         throw createHttpError.InternalServerError("Update failed");
  //       return res.status(200).json({
  //         data: {
  //           statusCode: 200,
  //           success: true,
  //           message: "The Product update was done successfully",
  //         },
  //       });
  //     } catch (error) {
  //       if (req.body.image) deleteFileInPublic(req.body.image);
  //       next(error);
  //     }
  //   }
  async findProductById(productID) {
    const { id } = await ObjectIdValidator.validateAsync({ id: productID });
    const Product = await ProductModel.findById({ _id:id }).populate([
      { path: "category", select: ["title"] },
      { path: "supplier", select: ["mobile"] },
    ]);
    if (!Product) {
      throw createHttpError.NotFound("Can not found Product");
    }
    console.log(Product);
    return Product;
  }
}
module.exports = {
  ProductController: new ProductController(),
};
