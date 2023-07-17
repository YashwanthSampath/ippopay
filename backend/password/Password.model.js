const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});

const Password = mongoose.model("Password", passwordSchema);

module.exports = Password;  
