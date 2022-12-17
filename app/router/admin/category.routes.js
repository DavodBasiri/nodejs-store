const { CategoryController } = require("../../http/controllers/admin/category.controller");
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM3OTMwMDQzMiIsInVzZXJJRCI6IjYyZWE0MmMxNjZjNDRlMTgxYWFlNjE3NSIsImlhdCI6MTY3MDk0MDk5OCwiZXhwIjoxNjcxMDI3Mzk4fQ.FrjJe1mZNPVtKsBq7d9UI-Om5PMLnVWVGR3UVd5_NaQ
const router = require("express").Router();
router.post("/add",CategoryController.addCategory);
router.get("/parents",CategoryController.getAllParentCategory);
router.get("/children/:parent",CategoryController.getChlidOfParent);
router.get("/all-category",CategoryController.getAllCategory);
router.get("/all-category-aggregate",CategoryController.getAllCategoryWithOutPopulate);
router.delete("/delete/:id",CategoryController.removeCategory);
router.patch("/edit/:id",CategoryController.editCategory);
router.get("/:id",CategoryController.getCategoryById);
module.exports ={
    AdminApiCategoryRoutes : router
}