import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: {
      type: String,
      trim: true,
    },
    categories: [{ type: String }],
    tags: [{ type: String }],
    featuredImage: { type: String },
    slug: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
