const mongoose = require("mongoose");
const CommentsSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: new Date().getTime() },
  parent: { type: mongoose.Types.ObjectId, default: undefined }
});
const Schema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId,ref: "user", required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  short_text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId,ref:'category', required: true },
  comments: { type: [CommentsSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
  deslikes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
},{
    timestamps: true,versionKey:false ,toJSON :{
      virtuals :true
  }
});
Schema.virtual("user" , {
  ref : "user" ,
  localField : "_id" ,
  foreignField : "author"
})
Schema.virtual("category_details" , {
  ref : "category" ,
  localField : "_id" ,
  foreignField : "category"
})
module.exports = {
  BlogModel: mongoose.model("blog", Schema),
};
