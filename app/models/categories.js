const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title :  {type : String,required :true},
    parent : {type : mongoose.Types.ObjectId , ref : "category" , defult :undefined}
},{
    id : false ,
    toJSON :{
        virtuals :true
    },
    timestamps: true
});
Schema.virtual("childern" , {
    ref : "category" ,
    localField : "_id" ,
    foreignField : "parent"
})
function autoPopulate(next){
    this.populate([{ path : "childern" , select : {__v : 0 , id : 0}}])
    next();
}
Schema.pre("findOne" , autoPopulate).pre("find" , autoPopulate);
module.exports ={
    CategoryModel : mongoose.model("category",Schema)
}