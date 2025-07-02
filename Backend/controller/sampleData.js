import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const seedAdminUser = async () => {
  try {
    const email = "abc@gmail.com";
    console.log("Seeding admin user check for email:", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Seed user already exists");
      return;
    }
    const password = "0011";
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      fullname: "Admin User",
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("Seed admin user created");
  } catch (error) {
    console.error("Error creating seed admin user:", error);
  }
};
