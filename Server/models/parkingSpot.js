





// const parkingSpotSchema = new mongoose.Schema({
//   name: String,
//   vehicleType: { type: String, required: true },
//   numberPlate: { type: String, required: true },  // Not unique
//   mobileNumber: String,
//   entryTime: { type: Date, default: Date.now },
//   exitTime: Date,
//   // pricePerHour: { type: Number},
//   // pricePerDay: { type: Number },
//   isParked: { type: Boolean, default: true },
//   totalAmount: Number,
// rateType: String,
// unitPrice: Number,
// totalParkedHours: String,

//   totalAmount: String,
//   daysParked: Number
// }, { timestamps: true });


// const parkingSpotSchema = new mongoose.Schema({
//   name: String,
//   vehicleType: { type: String, required: true },
//   numberPlate: { type: String, required: true },
//   mobileNumber: String,
//   entryTime: { type: Date, default: Date.now },
//   exitTime: Date,
//   isParked: { type: Boolean, default: true },
  
//   // Pricing related fields
//   priceType: String,         // "hour" or "day"
//   unitPrice: Number,         // The price value per unit
//   totalAmount: String,       // Final amount with currency symbol, like ₹50.00
//   totalParkedHours: String,  // e.g., "2 hour(s) 15 minute(s)"
//   daysParked: Number,        // Only if type is "day"
  
//   // Reference to user who parked
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

// }, { timestamps: true });



// const mongoose = require('mongoose');


// const parkingSpotSchema = new mongoose.Schema({
//   name: String,
//   vehicleType: { type: String, required: true },
//   numberPlate: { type: String, required: true },
//   mobileNumber: String,
//   entryTime: { type: Date, default: Date.now },
//   exitTime: Date,
//   isParked: { type: Boolean, default: true },

//   // ✅ New field for plate format
//   plateFormat: {
//     type: String,
//     enum: ['old', 'new'],
//     required: false
//   },

//   // Pricing related fields
//   priceType: String,         // "hour" or "day"
  
//   unitPrice: Number,         // The price value per unit
//   totalAmount: String,       // Final amount with currency symbol, like ₹50.00
//   totalParkedHours: String,  // e.g., "2 hour(s) 15 minute(s)"
//   daysParked: Number,        // Only if type is "day"

//   // Reference to user who parked
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

// }, { timestamps: true });



const mongoose = require('mongoose');
const parkingSpotSchema = new mongoose.Schema({
  name: String,
  vehicleType: { type: String, required: true },
  numberPlate: { type: String, required: true },
  mobileNumber: String,
  entryTime: { type: Date, default: Date.now },
  exitTime: Date,
  isParked: { type: Boolean, default: true },

  // ✅ New field for plate format
  plateFormat: {
    type: String,
    enum: ['old', 'new'],
    required: false
  },

  // Pricing related fields
  priceType: String,  // "hour" or "day"

  vehiclePrices: {
    car: { type: Number, default: 0 },
    bike: { type: Number, default: 0 },
    cycle: { type: Number, default: 0 }
  },

  unitPrice: Number,               // Price per hour/day
  totalAmount: String,             // e.g., ₹50.00
  totalParkedHours: String,        // e.g., "2 hour(s) 15 minute(s)"
  daysParked: Number,              // If priceType is "day"

  // Reference to user
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, { timestamps: true });

module.exports = mongoose.model('ParkingSpot', parkingSpotSchema);
