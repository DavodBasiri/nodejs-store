const mongoose = require("mongoose");
const CommentsSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    comment: { type: String, required: true },
    timestamp: { type: Date, default: new Date().getTime() },
    parent: { type: mongoose.Types.ObjectId,ref:'comment', default: undefined }
  });

module.exports={
    CommentsSchema
}