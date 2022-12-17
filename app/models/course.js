const mongoose = require("mongoose");
const { CommentsSchema } = require("./public.schema");
const Episodes = new mongoose.Schema({
  titile: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, required: true, default: "free" }, //free - cash vip
  time: { type: String, default: "00:00:00" },
});
const Chapter = new mongoose.Schema({
  titile: { type: String, required: true },
  text: { type: String, required: true },
  episodes: { type: [Episodes], default: [] },
});
const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    comments: { type: [CommentsSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    deslikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    type: { type: String, required: true, default: "free" }, //free - cash vip
    format: { type: String },
    time: { type: String, default: "00:00:00" },
    status: { type: String, default: "Not Started" },
    teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    chapters: { type: [Chapter], default: [] },
    students: { type: [mongoose.Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
  }
);
CourseSchema.index({ title: "text", short_text: "text", text: "text" });
module.exports = {
  CourseModel: mongoose.model("course", CourseSchema),
};
