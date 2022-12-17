const { ProductController } = require('../../http/controllers/admin/product.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadFile } = require('../../utils/multer');

const router = require("express").Router();
router.post('/add',uploadFile.array('images',10),stringToArray('tags'),ProductController.createProduct);
router.patch('/update/:id',uploadFile.array('images',10),stringToArray('tags'),ProductController.updateProductByID);
router.get('/searchs',ProductController.getProductBySearch);
router.delete("/delete/:id",ProductController.deleteProductByID);
router.get('/',ProductController.getListOfProducts);
router.get('/:id',ProductController.getOneProductByID);
module.exports={
    AdminApiProductRouter: router
}