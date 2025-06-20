


// const mongoose = require('mongoose');


// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   //email: { type: String, unique: true, sparse: true }, // sparse index allows multiple docs without email
//   email: { type: String, required: true, unique: true },

//   role: { type: String, required: true },
//   isDeleted: {
//   type: Boolean,
//   default: false,
// }

// });


// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
