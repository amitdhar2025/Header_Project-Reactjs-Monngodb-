import mongoose from "mongoose";

const subMenuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String }
});

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String },
  subMenu: [subMenuSchema]
});

const navigationMenuSchema = new mongoose.Schema({
  menuItems: [menuSchema]
});

const NavigationMenu = mongoose.model("NavigationMenu", navigationMenuSchema);

export default NavigationMenu;
