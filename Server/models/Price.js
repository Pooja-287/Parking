const mongoose = require('mongoose');

// const priceSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     priceType: { type: String, required: true },
//     price: { type: Number, required: true },
// }, { timestamps: true });
const priceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  priceType: { type: String, enum: ["hourly", "daily"], required: true },

  // 👇 Store price per vehicle type
  prices: {
    car: { type: Number, required: false },
    bike: { type: Number, required: false },
    cycle: { type: Number, required: false }
  }
}, { timestamps: true });

// const priceSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   priceType: { type: String, required: true, enum: ['hour', 'day'] },
//   price: { type: Number, required: true, min: 0 },
// }, { timestamps: true });
module.exports = mongoose.model('Price', priceSchema);
