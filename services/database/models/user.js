import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema, "user");
