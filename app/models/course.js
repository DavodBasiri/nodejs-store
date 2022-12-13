const mongoose = require("mongoose");
const { CommentsSchema } = require("./public.schema");
const Episodes = mongoose.Schema({
  titile: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, required: true, default: "free" }, //free - cash vip
  time: { type: String, default: "00:00:00" },
});
const Chapter = mongoose.Schema({
  titile: { type: String, required: true },
  text: { type: String, required: true },
  episodes: { type: [Episodes], default: [] },
});
const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
  comments: { type: [CommentsSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  deslikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  type: { type: String, required: true, default: "free" }, //free - cash vip
  format: { type: String },
  time: { type: String, default: "00:00:00" },
  teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  chapter: { type: [Chapter], default: [] },
  students: { type: [mongoose.Types.ObjectId], default: [] },
});
module.exports = {
  CoursesModel: mongoose.model("course", Schema),
};
