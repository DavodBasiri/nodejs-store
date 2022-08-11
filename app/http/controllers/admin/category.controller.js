const createError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { CategoryModel } = require("../../../models/categories");
const { addCetegorySchema, updateCetegorySchema } = require("../../validators/admin/category.schema");
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
             const {id} = req.params ;
             const {title} = req.body ;
             await this.checkExistCategory(id);
             await updateCetegorySchema.validateAsync(req.body);
             const result = await CategoryModel.updateOne({_id : id} , {$set : {title}});
             if(result.modifiedCount == 0) throw createError.InternalServerError("Can Not Update Category");
             return res.status(200).json({
               data : {
                   statusCode : 200 ,
                   success : true ,
                   message : "Updated"
               }
           })
        } catch (error) {
                 next(error)
         
        }
     }
     async removeCategory(req,res,next){
        try {
            const {id} = req.params;
            const category =await this.checkExistCategory(id);
            const deleteResult = await CategoryModel.deleteMany({
               $or :[
                    {_id : category._id} ,
                    {parent : category._id}
               ]
               });
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
/*           const categories = await CategoryModel.aggregate([
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
          */
/*           const categories = await CategoryModel.aggregate([
               {
               $graphLookup : {
                    from : "categories" ,
                    startWith : "$_id" ,
                    connectFromField : "_id" ,
                    connectToField : "parent" ,
                    maxDepth : 5 ,
                    depthField : "depth" ,
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
          ]) */
             const categories = await CategoryModel.find({parent : undefined})
             return res.status(200).json({
               data : {
                    statusCode : 200 , 
                    categories
               }
             })
        } catch (error) {
                 next(error)
         
        }
     }
     async getAllCategoryWithOutPopulate(req,res,next){
          try {
               const categories = await CategoryModel.aggregate([
                    {
                    $match : {}
               },{
                    $project :{
                         __v : 0 }
                    }]);
               return res.status(200).json({
                 data : {
                      statusCode : 200 , 
                      categories
                 }
               })
          } catch (error) {
                   next(error)
           
          }
       }
     async getCategoryById(req,res,next){
        try {
               const {id : _id} = req.params ;
               await this.checkExistCategory(_id);
               const category = await CategoryModel.aggregate([
               {
               $match :{
                _id : mongoose.Types.ObjectId(_id)
                         }
               },{
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