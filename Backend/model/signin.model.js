import mongoose from "mongoose";

const signinSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Signin = mongoose.model("Signin", signinSchema);

export default Signin;
