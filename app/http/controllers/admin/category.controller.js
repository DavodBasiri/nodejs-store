const createError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const { addCetegorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");
class CategoryController extends Controller{
     async addCategory(req,res,next){
       try {
            const {title,parent} = req.body;
            await addCetegorySchema.validateAsync(req.body);
            const category = await CategoryModel.create({title,parent});
            if(!category) throw createError.InternalServerError("Inernal Error");
            return res.status(201).json({
                data : {
                    statusCode : 201 ,
                    success : true ,
                    message : "category added"
                }
            })
       } catch (error) {
                next(error)
        
       }
    }
     async editCategory(req,res,next){
        try {
             return res.status(200).send("index Page Store");
        } catch (error) {
                 next(error)
         
        }
     }
     async removeCategory(req,res,next){
        try {
            const {id} = req.params;
            const category =await this.checkExistCategory(id);
            const deleteResult = await CategoryModel.deleteOne({_id : category._id});
            if(deleteResult.deletedCount == 0 ) throw createError.InternalServerError("Can Not Delete Category");
            return res.status(200).json({
               data :{
                    statusCode : 200 , 
                    message : "Delete Categoty"
               }
            })
        } catch (error) {
                 next(error)
         
        }
     }
     async getAllCategory(req,res,next){
        try {
             const category = await CategoryModel.aggregate([
               {
               $lookup : {
                    from : "categories" ,
                    localField : "_id" ,
                    foreignField : "parent" ,
                    as : "childeren"
               }
               },{
                    $project :{
                         __v : 0 ,
                         "childeren.__v" : 0 ,
                         "childeren.parent" : 0
                    }
               },
               {
                    $match :{
                         parent : undefined
                    }
               }
          ])
             return res.status(200).json({
               data : {
                    statusCode : 200 , 
                    category
               }
             })
        } catch (error) {
                 next(error)
         
        }
     }
     async getCategoryById(req,res,next){
        try {
             return res.status(200).send("index Page Store");
        } catch (error) {
                 next(error)
         
        }
     }
     async getAllParentCategory(req,res,next){
        try {
             const parents = await CategoryModel.find({parent : undefined});
             return res.status(200).json({
               data : {
                    statusCode : 200 , 
                    parents
               }
             })
        } catch (error) {
                 next(error)
         
        }
     }
     async getChlidOfParent(req,res,next){
        try {
             const {parent} = req.params;
             const childeren = await CategoryModel.find({parent},{__v:0 ,parent:0});
             return res.status(200).json({
               data : {
                    statusCode : 200 , 
                    childeren
               }
             })
        } catch (error) {
                 next(error)
         
        }
     }
     async checkExistCategory(id){
          const category = await CategoryModel.findById(id);
          if(!category) throw createError.NotFound("Category Not Found");
          return category

     }
}

module.exports = {
     CategoryController : new CategoryController() 
}