const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,  //This means createdBy will store a MongoDB ObjectId (the unique _id of another document).
      ref: "user",    //createdBy links the blog to the User who created it.
    },
  },
  { timestamps: true }
);

const Blog = model("blog", blogSchema);

module.exports = Blog;
