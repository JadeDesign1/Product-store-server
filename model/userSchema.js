const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  console.log(this.password);

  try {
    const salt = await bcrypt.genSalt(10); // ✅ Generate salt
    this.password = await bcrypt.hash(this.password, salt); // ✅ Hash password properly
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing, cannot compare");

  try {
    const result = await bcrypt.compare(password, this.password);
    console.log("Password Match Result:", result); // ✅ Log comparison result
    return result;
  } catch (error) {
    console.log("Error while comparing password:", error.message);
    return false; // ✅ Explicitly return false on error
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error("invalid email");
  try {
    const user = await this.findOne({ email });
    if (user) {
      return true;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
