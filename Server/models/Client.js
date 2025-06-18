// const mongoose = require('mongoose');

// const clientSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   mailID: { type: String, required: true },
//   mobile: { type: String, required: true },
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   brandName: { type: String, required: true },
//   location: { type: String, required: true },
//   validity: { type: String, required: true },
//   role: { type: String, default: "SUPERADMIN" },
//   isDeleted: { type: Boolean, default: false } // for soft delete
// });

// module.exports = mongoose.model('Client', clientSchema);




// const mongoose = require('mongoose');

// const clientSchema = new mongoose.Schema({
//   fullName: String,
//   mailID: String,
//   mobile: String,
//   username: String,
//   password: String,
//   brandName: String,
//   location: String,
//   validity: String,
//   role: String,
//   deleted: { type: Boolean, default: false }
// });

// module.exports = mongoose.model('Client', clientSchema);




// const mongoose = require('mongoose');

// const clientSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   mailID: { type: String, required: true },
//   mobile: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   brandName: { type: String, required: true },
//   location: { type: String, required: true },
//   validity: { type: String, required: true },
//   role: { type: String, default: 'Client'},
//   deleted: { type: Boolean, default: false },
// }, { timestamps: true });

// module.exports = mongoose.model('Client', clientSchema);




const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  mobileNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  numberPlate: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
  parkingHistory: [{
    parkingSpotId: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpot' },
    entryTime: Date,
    exitTime: Date,
    totalAmountPaid: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);




// const mongoose = require('mongoose');

// const clientSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   mobileNumber: { type: String, required: true },
//   vehicleType: { type: String, required: true },
//   numberPlate: { type: String, required: true },
//   // Optional: link to parking history by ID
//   parkingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpot' }]
// });

// module.exports = mongoose.model('Client', clientSchema);
