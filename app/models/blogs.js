const mongoose = require("mongoose");
const CommentsSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: new Date.now() },
  parent: { type: mongoose.Types.ObjectId, default: undefined }
});
const Schema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  short_text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, required: true },
  comments: { type: [CommentsSchema], default: [] },
  like: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
  deslike: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
},{
    timestamps:ture,versionKey:false
});
module.exports = {
  BlogModel: mongoose.model("blog", Schema),
};
