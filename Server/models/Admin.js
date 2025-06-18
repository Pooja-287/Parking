// const mongoose = require('mongoose');

// const adminSchema = new mongoose.Schema({
//   fullName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   mailID: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//   },
//   mobile: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     default: 'admin',
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Admin', adminSchema);



// admin.model.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  fullName: String,
  mailID: String,
  mobile: String,
  username: { type: String, required: true, unique: true },
  password: String,
  brandName: String,
  location: String,
  validity: String,
  role: { type: String, default: "admin" },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('SuperAdmin', adminSchema);