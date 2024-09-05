import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortURL: {
    type: String,
    required: true,
  },
  originalURL: {
    type: String,
    required: true,
  },
});

export const urlModel = mongoose.model("urls", urlSchema);
