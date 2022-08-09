const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title :  {type : String,required :true},
    parent : {type : mongoose.Types.ObjectId , defult :undefined}
});
module.exports ={
    CategoryModel : mongoose.model("category",Schema)
}