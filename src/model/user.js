import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "nome obrigatório"],
  },
  email: {
    type: String,
    required: [true, "email é obrigatório"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "senha é obrigatório"],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const model = mongoose.model("User", schema);
export default model;
