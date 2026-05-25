const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    fullName: "Super Admin",
    phone: "9999999991",
    email: "admin@sehatsetu.com",
    password: hashedPassword,
    permissions: ["all"],
  });

  console.log("Admin created");
  process.exit();
};

createAdmin();