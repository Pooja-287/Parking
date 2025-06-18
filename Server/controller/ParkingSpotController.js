




const ParkingSpot = require('../models/parkingSpot');


const Price = require("../models/Price")
const User = require("../models/User")



// Utility to convert time to IST string (you should have this function implemented somewhere)
function convertToISTString(date) {
  // Example conversion logic - adjust as needed
  return new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}


// ✅ GET: Fetch Price Details by User ID
// exports.getPrices = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const prices = await Price.findOne({ userId }).populate({
//       path: "userId",
//       select: "username",
//     });

//     if (prices) {
//       res.status(200).json({ message: "Prices fetched successfully", prices });
//     } else {
//       res.status(404).json({ message: "No pricing data found for this user" });
//     }
//   } catch (err) {
//     console.error("Error in getPrices:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };


// ✅ GET: Get Prices by userId
exports.getPrices = async (req, res) => {
  try {
    const userId = req.params.id;

    const prices = await Price.findOne({ userId }).populate("userId", "username");

    if (prices) {
      res.status(200).json({
        message: "Prices fetched successfully",
        prices, // includes vehicle-wise prices
      });
    } else {
      res.status(404).json({ message: "No pricing data found for this user" });
    }
  } catch (err) {
    console.error("❌ Error in getPrices:", err);
    res.status(500).json({ error: "Server error" });
  }
};



// ✅ POST: Create Price (only once per user)
// exports.createPrices = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const existingPrice = await Price.findOne({ userId: user._id });
//     if (existingPrice) {
//       return res.status(400).json({ message: "Price already exists. Please update instead." });
//     }

//     // 🔽 Normalize priceType
//     const normalizedType = req.body.priceType.toLowerCase();

//     const newPrice = await Price.create({
//       userId: user._id,
//       priceType: normalizedType,
//       price: req.body.price,
//     });

//     res.status(201).json({ message: "Prices set successfully", data: newPrice });
//   } catch (err) {
//     console.error("Error in createPrices:", err);
//     res.status(500).json({ error: "Failed to set prices" });
//   }
// };


// exports.createPrices = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const existingPrice = await Price.findOne({ userId: user._id });
//     if (existingPrice) {
//       return res.status(400).json({ message: "Price already exists. Please update instead." });
//     }

//     const normalizedType = req.body.priceType.toLowerCase();

//     const newPrice = await Price.create({
//       userId: user._id,
//       priceType: normalizedType,
//       vehiclePrices: req.body.vehiclePrices // { car: 50, bike: 30, cycle: 10 }
//     });

//     res.status(201).json({ message: "Prices set successfully", prices: newPrice });
//   } catch (err) {
//     console.error("Error in createPrices:", err);
//     res.status(500).json({ error: "Failed to set prices" });
//   }
// };


// ✅ POST: Create Prices
exports.createPrices = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existing = await Price.findOne({ userId: user._id });
    if (existing) {
      return res.status(400).json({ message: "Prices already exist. Update instead." });
    }

    const normalizedType = req.body.priceType.toLowerCase();

    const newPrice = await Price.create({
      userId: user._id,
      priceType: normalizedType,
      prices: req.body.prices, // { car: 50, bike: 30, cycle: 20 }
    });

    res.status(201).json({ message: "Prices set successfully", data: newPrice });
  } catch (err) {
    console.error("❌ Error in createPrices:", err);
    res.status(500).json({ error: "Failed to create prices" });
  }
};




// // ✅ PUT: Update Price by Price ID
// exports.updatePrices = async (req, res) => {
//   try {
//     const { priceType, price } = req.body;

//     const updatePrice = await Price.findById(req.params.id);
//     if (!updatePrice) {
//       return res.status(404).json({ message: "Price not found" });
//     }

//     // 🔽 Normalize priceType when updating
//     if (priceType) updatePrice.priceType = priceType.toLowerCase();
//     if (price) updatePrice.price = price;

//     await updatePrice.save();

//     res.status(200).json({ message: "Prices updated successfully", data: updatePrice });
//   } catch (err) {
//     console.error("Error in updatePrices:", err);
//     res.status(500).json({ error: "Failed to update prices" });
//   }
// };


exports.updatePrices = async (req, res) => {
  try {
    const price = await Price.findById(req.params.id);
    if (!price) {
      return res.status(404).json({ message: "Price not found" });
    }

    // Fix field names here
    price.priceType = req.body.priceType || price.priceType;
    price.prices = req.body.prices || price.prices;

    await price.save();

    res.status(200).json({ message: "Prices updated successfully", prices: price });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update prices", error: error.message });
  }
};




// // Helper to convert to IST time string
// function convertToISTString(date) {
//   return new Date(date).toLocaleString("en-IN", {
//     timeZone: "Asia/Kolkata",
//     hour12: true,
//   });
// }

// const validRTOs = {
//   // Tamil Nadu
//   TN: ["01", "02", "03", "04", "05", "06", "07", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "28", "29", "30", "31", "32", "33", "34", "37", "38"],

//   // Karnataka
//   KA: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],

//   // Kerala
//   KL: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"],

//   // Andhra Pradesh
//   AP: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26"],

//   // Telangana
//   TS: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33"],

// };

// // 🔠 Validate format function
// function validateNumberPlateFormat(numberPlate) {
//   const newFormat = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/; // TN23AB1234
//   const oldFormat = /^[A-Z]{2}\d{6}$/;             // TN231234
//   if (newFormat.test(numberPlate)) return "new";
//   if (oldFormat.test(numberPlate)) return "old";
//   return null;
// }





// exports.parkVehicle = async (req, res) => {
//   try {
//     const { name, vehicleType, numberPlate, mobileNumber } = req.body;
//     const userId = req.user._id;

//     if (!vehicleType || !numberPlate) {
//       return res.status(400).json({ message: "vehicleType and numberPlate are required" });
//     }

//     const cleanedPlate = numberPlate.replace(/\s/g, '').toUpperCase();

//     // 🔠 Block lowercase input
//     if (/[a-z]/.test(numberPlate)) {
//       return res.status(400).json({
//         message: "Number plate must be in UPPERCASE only."
//       });
//     }

//     const formatType = validateNumberPlateFormat(cleanedPlate);
//     if (!formatType) {
//       return res.status(400).json({
//         message: "Invalid number plate format. Use 'TN23AB1234' or 'TN231234'."
//       });
//     }

//     // ✅ Extract state and district codes
//     const stateCode = cleanedPlate.slice(0, 2);
//     const districtCode = cleanedPlate.slice(2, 4); // TN**23**

//   if (!validRTOs[stateCode]) {
//   return res.status(400).json({ 
//     message: `Invalid state code '${stateCode}'. Allowed: ${Object.keys(validRTOs).join(", ")}` });
// }
// if (!validRTOs[stateCode].includes(districtCode)) {
//   return res.status(400).json({ 
//     message: `Invalid district code '${districtCode}' for state '${stateCode}'.` });
// }


//     // ✅ Check if already parked
//     const activeSession = await ParkingSpot.findOne({ numberPlate: cleanedPlate, isParked: true });
//     if (activeSession) {
//       return res.status(400).json({
//         message: `Vehicle ${cleanedPlate} is already parked since ${convertToISTString(activeSession.entryTime)}. Exit before re-parking.`
//       });
//     }

//     // ✅ Save new parking
//     const newParking = new ParkingSpot({
//       name,
//       vehicleType,
//       numberPlate: cleanedPlate,
//       mobileNumber,
//       entryTime: new Date(),
//       isParked: true,
//       userId,
//       plateFormat: formatType
//     });

//     await newParking.save();

//     res.status(201).json({
//       message: "✅ Vehicle parked successfully",
//       vehicleDetails: {
//         name,
//         vehicleType,
//         numberPlate: cleanedPlate,
//         mobileNumber,
//         entryTimeIST: convertToISTString(newParking.entryTime),
//         formatType
//       }
//     });

//   } catch (error) {
//     console.error("❌ Error parking vehicle:", error);
//     res.status(500).json({ message: "Error parking vehicle", error: error.message });
//   }
// };

exports.parkVehicle = async (req, res) => {
  try {
    const { name, vehicleType, numberPlate, mobileNumber } = req.body;
    const userId = req.user._id;

    if (!vehicleType || !numberPlate) {
      return res.status(400).json({ message: "vehicleType and numberPlate are required" });
    }

    const cleanedPlate = numberPlate.replace(/\s/g, '').toUpperCase();

    // 🔠 Block lowercase input
    if (/[a-z]/.test(numberPlate)) {
      return res.status(400).json({
        message: "Number plate must be in UPPERCASE only."
      });
    }

    // ✅ Check if already parked
    const activeSession = await ParkingSpot.findOne({ numberPlate: cleanedPlate, isParked: true });
    if (activeSession) {
      return res.status(400).json({
        message: `Vehicle ${cleanedPlate} is already parked since ${convertToISTString(activeSession.entryTime)}. Exit before re-parking.`
      });
    }

    // ✅ Save new parking
    const newParking = new ParkingSpot({
      name,
      vehicleType,
      numberPlate: cleanedPlate,
      mobileNumber,
      entryTime: new Date(),
      isParked: true,
      userId
    });

    await newParking.save();

    res.status(201).json({
      message: "Vehicle parked successfully",
      vehicleDetails: {
        name,
        vehicleType,
        numberPlate: cleanedPlate,
        mobileNumber,
        entryTimeIST: convertToISTString(newParking.entryTime)
      }
    });

  } catch (error) {
    console.error("Error parking vehicle:", error);
    res.status(500).json({ message: "Error parking vehicle", error: error.message });
  }
};



// exports.exitVehicle = async (req, res) => {
//   try {
//     const { numberPlate } = req.body;

//     if (!numberPlate) {
//       return res.status(400).json({ message: "numberPlate is required" });
//     }

//     const cleanedPlate = numberPlate.replace(/\s/g, '').toUpperCase();
//     const formatType = validateNumberPlateFormat(cleanedPlate);
//     if (!formatType) {
//       return res.status(400).json({
//         message: "Invalid number plate format. Use 'TN23AB1234' (new) or 'TN231234' (old)."
//       });
//     }

//     const parkingRecord = await ParkingSpot.findOne({
//       numberPlate: cleanedPlate,
//       isParked: true
//     }).sort({ entryTime: -1 });

//     if (!parkingRecord) {
//       return res.status(404).json({ message: "No active parking found for this vehicle." });
//     }

//     const userId = parkingRecord.userId;
//     const priceData = await Price.findOne({ userId });

//     if (!priceData || !priceData.priceType || !priceData.price) {
//       return res.status(400).json({ message: "Pricing not configured for this user" });
//     }

//     const { priceType, price } = priceData;
//     const normalizedType = priceType.toLowerCase();

//     const exitTime = new Date();
//     const entryTime = parkingRecord.entryTime;
//     const durationMs = exitTime - entryTime;
//     const totalHours = durationMs / (1000 * 60 * 60);
//     const hours = Math.floor(totalHours);
//     const minutes = Math.floor((totalHours - hours) * 60);
//     const calculatedHours = `${hours} hour(s) ${minutes} minute(s)`;

//     let totalAmount = 0;
//     if (normalizedType === "hour" || normalizedType === "hourly") {
//       totalAmount = totalHours * price;
//     } else if (normalizedType === "day" || normalizedType === "daily") {
//       const totalDays = Math.ceil(totalHours / 24);
//       totalAmount = totalDays * price;
//       parkingRecord.daysParked = totalDays;
//     } else {
//       return res.status(400).json({ message: "Invalid price type" });
//     }

//     parkingRecord.exitTime = exitTime;
//     parkingRecord.isParked = false;
//     parkingRecord.totalAmount = `₹${totalAmount.toFixed(2)}`;
//     parkingRecord.totalParkedHours = calculatedHours;
//     parkingRecord.priceType = normalizedType;
//     parkingRecord.unitPrice = price;

//     await parkingRecord.save();

//     res.status(200).json({
//       message: "Vehicle exited successfully",
//       name: parkingRecord.name,
//       vehicleType: parkingRecord.vehicleType,
//       numberPlate: parkingRecord.numberPlate,
//       mobileNumber: parkingRecord.mobileNumber,
//       entryTimeIST: convertToISTString(entryTime),
//       exitTimeIST: convertToISTString(exitTime),
//       totalParkedHours: calculatedHours,
//       priceType: normalizedType,
//       unitPrice: price,
//       totalAmount: `₹${totalAmount.toFixed(2)}`,
//       formatType
//     });

//   } catch (error) {
//     console.error("Error in exitVehicle:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// };



// exports.parkVehicle = async (req, res) => {
//   try {
//     const { name, vehicleType, numberPlate, mobileNumber } = req.body;
//     const userId = req.user._id; // ✅ from verified token

//     if (!vehicleType || !numberPlate) {
//       return res.status(400).json({ message: "vehicleType and numberPlate are required" });
//     }

//     const activeSession = await ParkingSpot.findOne({ numberPlate, isParked: true });
//     if (activeSession) {
//       return res.status(400).json({
//         message: `Vehicle ${numberPlate} is already parked since ${convertToISTString(activeSession.entryTime)}. Exit before re-parking.`
//       });
//     }

//     const newParking = new ParkingSpot({
//       name,
//       vehicleType,
//       numberPlate,
//       mobileNumber,
//       entryTime: new Date(),
//       isParked: true,
//       userId // ✅ automatically from token
//     });

//     await newParking.save();

//     res.status(201).json({
//       message: "Vehicle parked successfully",
//       vehicleDetails: {
//         name,
//         vehicleType,
//         numberPlate,
//         mobileNumber,
//         entryTimeIST: convertToISTString(newParking.entryTime)
//       }
//     });

//   } catch (error) {
//     console.error("Error parking vehicle:", error);
//     res.status(500).json({ message: "Error parking vehicle", error: error.message });
//   }
// };
// exports.exitVehicle = async (req, res) => {
//   try {
//     const { numberPlate } = req.body;

//     if (!numberPlate) {
//       return res.status(400).json({ message: "numberPlate is required" });
//     }

//     // Step 1: Find the active parking record
//     const parkingRecord = await ParkingSpot.findOne({
//       numberPlate,
//       isParked: true
//     }).sort({ entryTime: -1 });

//     if (!parkingRecord) {
//       return res.status(404).json({ message: "No active parking found for this vehicle." });
//     }

//     const userId = parkingRecord.userId;

//     // Step 2: Get user-specific price
//     const priceData = await Price.findOne({ userId });

//     if (!priceData || !priceData.priceType || !priceData.price) {
//       return res.status(400).json({ message: "Pricing not configured for this user" });
//     }

//     const { priceType, price } = priceData;
//     const normalizedType = priceType.toLowerCase();

//     // Step 3: Calculate parking duration
//     const exitTime = new Date();
//     const entryTime = parkingRecord.entryTime;
//     const durationMs = exitTime - entryTime;
//     const totalHours = durationMs / (1000 * 60 * 60);
//     const hours = Math.floor(totalHours);
//     const minutes = Math.floor((totalHours - hours) * 60);
//     const calculatedHours = `${hours} hour(s) ${minutes} minute(s)`;

//     // Step 4: Calculate total amount based on pricing type
//     let totalAmount = 0;

//     if (normalizedType === "hour" || normalizedType === "hourly") {
//       totalAmount = totalHours * price;
//     } else if (normalizedType === "day" || normalizedType === "daily") {
//       const totalDays = Math.ceil(totalHours / 24);
//       totalAmount = totalDays * price;
//       parkingRecord.daysParked = totalDays;
//     } else {
//       return res.status(400).json({ message: "Invalid price type" });
//     }

//     // Step 5: Update the parking record
//     parkingRecord.exitTime = exitTime;
//     parkingRecord.isParked = false;
//     parkingRecord.totalAmount = `₹${totalAmount.toFixed(2)}`;
//     parkingRecord.totalParkedHours = calculatedHours;
//     parkingRecord.priceType = normalizedType;
//     parkingRecord.unitPrice = price;

//     await parkingRecord.save();

//     // Step 6: Respond with parking summary
//     res.status(200).json({
//       message: "Vehicle exited successfully",
//       name: parkingRecord.name,
//       vehicleType: parkingRecord.vehicleType,
//       numberPlate: parkingRecord.numberPlate,
//       mobileNumber: parkingRecord.mobileNumber,
//       entryTimeIST: convertToISTString(entryTime),
//       exitTimeIST: convertToISTString(exitTime),
//       totalParkedHours: calculatedHours,
//       priceType: normalizedType,
//       unitPrice: price,
//       totalAmount: `₹${totalAmount.toFixed(2)}`
//     });

//   } catch (error) {
//     console.error("Error in exitVehicle:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// };




// exports.exitVehicle = async (req, res) => {
//   try {
//     const { numberPlate } = req.body;

//     if (!numberPlate) {
//       return res.status(400).json({ message: "numberPlate is required" });
//     }

//     const cleanedPlate = numberPlate.replace(/\s/g, '').toUpperCase();
//     const formatType = validateNumberPlateFormat(cleanedPlate);
//     if (!formatType) {
//       return res.status(400).json({
//         message: "Invalid number plate format. Use 'TN23AB1234' or 'TN231234'."
//       });
//     }

//     const parkingRecord = await ParkingSpot.findOne({
//       numberPlate: cleanedPlate,
//       isParked: true
//     }).sort({ entryTime: -1 });

//     if (!parkingRecord) {
//       return res.status(404).json({ message: "No active parking found for this vehicle." });
//     }

//     const userId = parkingRecord.userId;
//     const priceData = await Price.findOne({ userId });

//     if (!priceData || !priceData.priceType || !priceData.prices) {
//       return res.status(400).json({ message: "Pricing not configured for this user" });
//     }

//     const { priceType, prices } = priceData;
//     const normalizedType = priceType.toLowerCase();
//     const vehicleType = parkingRecord.vehicleType.toLowerCase();

//     // Check price for vehicle type
//     const unitPrice = prices[vehicleType];
//     if (!unitPrice) {
//       return res.status(400).json({
//         message: `No pricing configured for vehicle type '${vehicleType}'`
//       });
//     }

//     const exitTime = new Date();
//     const entryTime = parkingRecord.entryTime;
//     const durationMs = exitTime - entryTime;
//     const totalHours = durationMs / (1000 * 60 * 60);
//     const hours = Math.floor(totalHours);
//     const minutes = Math.floor((totalHours - hours) * 60);
//     const calculatedHours = `${hours} hour(s) ${minutes} minute(s)`;

//     let totalAmount = 0;
//     if (normalizedType === "hour" || normalizedType === "hourly") {
//       totalAmount = totalHours * unitPrice;
//     } else if (normalizedType === "day" || normalizedType === "daily") {
//       const totalDays = Math.ceil(totalHours / 24);
//       totalAmount = totalDays * unitPrice;
//       parkingRecord.daysParked = totalDays;
//     } else {
//       return res.status(400).json({ message: "Invalid price type" });
//     }

//     parkingRecord.exitTime = exitTime;
//     parkingRecord.isParked = false;
//     parkingRecord.totalAmount = `₹${totalAmount.toFixed(2)}`;
//     parkingRecord.totalParkedHours = calculatedHours;
//     parkingRecord.priceType = normalizedType;
//     parkingRecord.unitPrice = unitPrice;

//     await parkingRecord.save();

//     res.status(200).json({
//       message: "Vehicle exited successfully",
//       name: parkingRecord.name,
//       vehicleType: parkingRecord.vehicleType,
//       numberPlate: parkingRecord.numberPlate,
//       mobileNumber: parkingRecord.mobileNumber,
//       entryTimeIST: convertToISTString(entryTime),
//       exitTimeIST: convertToISTString(exitTime),
//       totalParkedHours: calculatedHours,
//       priceType: normalizedType,
//       unitPrice,
//       totalAmount: `₹${totalAmount.toFixed(2)}`,
//       formatType
//     });

//   } catch (error) {
//     console.error("❌ Error in exitVehicle:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// };



// exports.exitVehicle = async (req, res) => {
//   try {
//     const { numberPlate } = req.body;

//     if (!numberPlate) {
//       return res.status(400).json({ message: "numberPlate is required" });
//     }

//     const cleanedPlate = numberPlate.replace(/\s/g, '').toUpperCase();
//     const formatType = validateNumberPlateFormat(cleanedPlate);
//     if (!formatType) {
//       return res.status(400).json({
//         message: "Invalid number plate format. Use 'TN23AB1234' or 'TN231234'."
//       });
//     }

//     const parkingRecord = await ParkingSpot.findOne({
//       numberPlate: cleanedPlate,
//       isParked: true
//     }).sort({ entryTime: -1 });

//     if (!parkingRecord) {
//       return res.status(404).json({ message: "No active parking found for this vehicle." });
//     }

//     const userId = parkingRecord.userId;
//     const priceData = await Price.findOne({ userId });

//     if (!priceData || !priceData.priceType || !priceData.prices) {
//       return res.status(400).json({ message: "Pricing not configured for this user" });
//     }

//     const { priceType, prices } = priceData;
//     const normalizedType = priceType.toLowerCase();
//     const vehicleType = parkingRecord.vehicleType.toLowerCase();

//     // Check price for vehicle type
//     const unitPrice = prices[vehicleType];
//     if (!unitPrice) {
//       return res.status(400).json({
//         message: `No pricing configured for vehicle type '${vehicleType}'`
//       });
//     }

//     const exitTime = new Date();
//     const entryTime = parkingRecord.entryTime;
//     const durationMs = exitTime - entryTime;
//     const totalHours = durationMs / (1000 * 60 * 60);
//     const hours = Math.floor(totalHours);
//     const minutes = Math.floor((totalHours - hours) * 60);
//     const calculatedHours = `${hours} hour(s) ${minutes} minute(s)`;

//     let totalAmount = 0;
//     if (normalizedType === "hour" || normalizedType === "hourly") {
//       totalAmount = totalHours * unitPrice;
//     } else if (normalizedType === "day" || normalizedType === "daily") {
//       const totalDays = Math.ceil(totalHours / 24);
//       totalAmount = totalDays * unitPrice;
//       parkingRecord.daysParked = totalDays;
//     } else {
//       return res.status(400).json({ message: "Invalid price type" });
//     }

//     parkingRecord.exitTime = exitTime;
//     parkingRecord.isParked = false;
//     parkingRecord.totalAmount = `₹${totalAmount.toFixed(2)}`;
//     parkingRecord.totalParkedHours = calculatedHours;
//     parkingRecord.priceType = normalizedType;
//     parkingRecord.unitPrice = unitPrice;

//     await parkingRecord.save();

//     res.status(200).json({
//       message: "Vehicle exited successfully",
//       name: parkingRecord.name,
//       vehicleType: parkingRecord.vehicleType,
//       numberPlate: parkingRecord.numberPlate,
//       mobileNumber: parkingRecord.mobileNumber,
//       entryTimeIST: convertToISTString(entryTime),
//       exitTimeIST: convertToISTString(exitTime),
//       totalParkedHours: calculatedHours,
//       priceType: normalizedType,
//       unitPrice,
//       totalAmount: `₹${totalAmount.toFixed(2)}`,
//       formatType
//     });

//   } catch (error) {
//     console.error("❌ Error in exitVehicle:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// };



exports.exitVehicle = async (req, res) => {
  try {
    const { numberPlate } = req.body;

    if (!numberPlate) {
      return res.status(400).json({ message: "numberPlate is required" });
    }

    // Step 1: Find the active parking record
    const parkingRecord = await ParkingSpot.findOne({
      numberPlate,
      isParked: true
    }).sort({ entryTime: -1 });

    if (!parkingRecord) {
      return res.status(404).json({ message: "No active parking found for this vehicle." });
    }

    const userId = parkingRecord.userId;

    // Step 2: Get user-specific pricing based on vehicleType
    const priceData = await Price.findOne({ userId });

    if (!priceData || !priceData.priceType || !priceData.prices) {
      return res.status(400).json({ message: "Pricing not configured for this user" });
    }

    const { priceType, prices } = priceData;
    const normalizedType = priceType.toLowerCase();
    const vehicleType = parkingRecord.vehicleType.toLowerCase();
    const unitPrice = prices[vehicleType];

    if (!unitPrice) {
      return res.status(400).json({ message: `No pricing set for vehicle type '${parkingRecord.vehicleType}'` });
    }

    // Step 3: Calculate parking duration
    const exitTime = new Date();
    const entryTime = parkingRecord.entryTime;
    const durationMs = exitTime - entryTime;
    const totalHours = durationMs / (1000 * 60 * 60);
    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - hours) * 60);
    const calculatedHours = `${hours} hour(s) ${minutes} minute(s)`;

    // Step 4: Calculate total amount
    let totalAmount = 0;
    if (normalizedType === "hour" || normalizedType === "hourly") {
      totalAmount = totalHours * unitPrice;
    } else if (normalizedType === "day" || normalizedType === "daily") {
      const totalDays = Math.ceil(totalHours / 24);
      totalAmount = totalDays * unitPrice;
      parkingRecord.daysParked = totalDays;
    } else {
      return res.status(400).json({ message: "Invalid price type" });
    }

    // Step 5: Update the parking record
    parkingRecord.exitTime = exitTime;
    parkingRecord.isParked = false;
    parkingRecord.totalAmount = `₹${totalAmount.toFixed(2)}`;
    parkingRecord.totalParkedHours = calculatedHours;
    parkingRecord.priceType = normalizedType;
    parkingRecord.unitPrice = unitPrice;

    await parkingRecord.save();

    // Step 6: Send summary
    res.status(200).json({
      message: "Vehicle exited successfully",
      name: parkingRecord.name,
      numberPlate: parkingRecord.numberPlate,
      vehicleType: parkingRecord.vehicleType,
      mobileNumber: parkingRecord.mobileNumber,
      entryTimeIST: convertToISTString(entryTime),
      exitTimeIST: convertToISTString(exitTime),
      totalParkedHours: calculatedHours,
      priceType: normalizedType,
      unitPrice,
      totalAmount: `₹${totalAmount.toFixed(2)}`
    });

  } catch (error) {
    console.error("❌ Error in exitVehicle:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


// Update park manually (emergency exit)
exports.updatePark = async (req, res) => {
  try {
    const { numberPlate } = req.body;

    if (!numberPlate) {
      return res.status(400).json({ message: "numberPlate is required" });
    }

    const activeParking = await ParkingSpot.findOne({ numberPlate, isParked: true });

    if (!activeParking) {
      return res.status(404).json({ message: "No active parking record found for this vehicle" });
    }

    const exitTime = new Date();
    const durationMs = exitTime - activeParking.entryTime;
    const totalHours = durationMs / (1000 * 60 * 60);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours - days * 24;

    const amount = (days * activeParking.pricePerDay) + (hours * activeParking.pricePerHour);

    activeParking.exitTime = exitTime;
    activeParking.isParked = false;
    activeParking.daysParked = days;
    activeParking.totalAmount = `₹${amount.toFixed(2)}`;

    await activeParking.save();

    res.status(200).json({
      message: "Vehicle exit recorded successfully",
      parkingRecord: activeParking
    });

  } catch (error) {
    console.error("Error updating parking record:", error);
    res.status(500).json({ message: "Error updating parking record", error: error.message });
  }
};




// exports.getVehicleByPlate = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { vehicleNo } = req.query;

//     if (!vehicleNo) {
//       return res.status(400).json({ message: "Vehicle number is required" });
//     }

//     // 1. Find the latest parked vehicle for this user and vehicle number
//     const vehicle = await ParkingSpot.findOne({
//       numberPlate: { $regex: vehicleNo, $options: "i" },
//       isParked: true
//     }).sort({ entryTime: -1 });

//     if (!vehicle) {
//       return res.status(404).json({ message: "Vehicle not found or already exited" });
//     }

//     // 2. Fetch pricing data for that user
//     const prices = await Price.find({ userId });

//     if (!prices || prices.length === 0) {
//       return res.status(400).json({ message: "Pricing not configured for this user." });
//     }

//     // 3. Calculate duration in milliseconds
//     const now = new Date();
//     const durationMs = now - vehicle.entryTime;

//     // 4. Convert to fractional hours
//     const totalParkedHours = durationMs / (1000 * 60 * 60);

//     // 5. Dynamically select valid pricing type
//     const validTypes = ['per_hour', 'per_day', 'hourly', 'daily'];
//     let unitPrice = 0;
//     let rateType = '';

//     for (let i = 0; i < prices.length; i++) {
//       const type = prices[i].priceType?.toLowerCase();
//       if (validTypes.includes(type)) {
//         unitPrice = prices[i].price;
//         rateType = type;
//         break;
//       }
//     }

//     if (!rateType || unitPrice === 0) {
//       return res.status(400).json({ message: "Valid pricing not found for user." });
//     }

//     // 6. Calculate total amount
//     let totalAmount = 0;
//     if (rateType === 'per_hour' || rateType === 'hourly') {
//       totalAmount = totalParkedHours * unitPrice;
//     } else if (rateType === 'per_day' || rateType === 'daily') {
//       const totalDays = Math.ceil(totalParkedHours / 24);
//       totalAmount = totalDays * unitPrice;
//     }

//     // 7. Update vehicle record temporarily (not changing DB)
//     vehicle.totalParkedHours = totalParkedHours.toFixed(2);
//     vehicle.totalAmount = `₹${totalAmount.toFixed(2)}`;
//     await vehicle.save();

//     // 8. Send response
//     res.json({
//       name: vehicle.name || "-",
//       numberPlate: vehicle.numberPlate,
//       mobileNumber: vehicle.mobileNumber || "-",
//       vehicleType: vehicle.vehicleType,
//       entryTimeIST: convertToISTString(vehicle.entryTime),
//       exitTimeIST: convertToISTString(now),
//       totalParkedHours: totalParkedHours.toFixed(2),
//       rateType,
//       unitPrice,
//       totalAmount: vehicle.totalAmount
//     });

//   } catch (error) {
//     console.error("Error fetching vehicle:", error);
//     res.status(500).json({ message: "Error fetching vehicle", error: error.message });
//   }
// };



exports.getVehicleByPlate = async (req, res) => {
  try {
    const userId = req.params.id;
    const { vehicleNo } = req.query;

    if (!vehicleNo) {
      return res.status(400).json({ message: "Vehicle number is required in query" });
    }

    // Clean and format number plate
    const cleanedPlate = vehicleNo.replace(/\s/g, "").toUpperCase();

    // 1. Find the latest active parked vehicle
    const vehicle = await ParkingSpot.findOne({
      numberPlate: { $regex: cleanedPlate, $options: "i" },
      isParked: true,
      userId,
    }).sort({ entryTime: -1 });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found or already exited" });
    }

    // 2. Fetch price data for this user
    const priceData = await Price.findOne({ userId });

    if (!priceData || !priceData.priceType || !priceData.prices) {
      return res.status(400).json({ message: "Pricing not configured for this user." });
    }

    const { priceType, prices } = priceData;
    const normalizedType = priceType.toLowerCase();
    const vehicleType = vehicle.vehicleType.toLowerCase();
    const unitPrice = prices[vehicleType];

    if (!unitPrice) {
      return res.status(400).json({
        message: `No pricing set for vehicle type '${vehicle.vehicleType}'`
      });
    }

    // 3. Calculate time difference
    const now = new Date();
    const durationMs = now - vehicle.entryTime;
    const totalHours = durationMs / (1000 * 60 * 60);
    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - hours) * 60);
    const calculatedHours = `${hours} hour(s) ${minutes} minute(s)`;

    // 4. Calculate amount
    let totalAmount = 0;
    if (normalizedType === 'hour' || normalizedType === 'hourly') {
      totalAmount = totalHours * unitPrice;
    } else if (normalizedType === 'day' || normalizedType === 'daily') {
      const totalDays = Math.ceil(totalHours / 24);
      totalAmount = totalDays * unitPrice;
    } else {
      return res.status(400).json({ message: "Unsupported price type" });
    }

    // 5. Temporarily attach calculation to object (no DB save)
    vehicle.totalParkedHours = calculatedHours;
    vehicle.totalAmount = `₹${totalAmount.toFixed(2)}`;

    // 6. Send response
    res.json({
      name: vehicle.name || "-",
      numberPlate: vehicle.numberPlate,
      mobileNumber: vehicle.mobileNumber || "-",
      vehicleType: vehicle.vehicleType,
      entryTimeIST: convertToISTString(vehicle.entryTime),
      exitTimeIST: convertToISTString(now),
      totalParkedHours: calculatedHours,
      priceType: normalizedType,
      unitPrice,
      totalAmount: vehicle.totalAmount
    });

  } catch (error) {
    console.error("❌ Error in getVehicleByPlate:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all currently parked vehicles
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await ParkingSpot.find({ isParked: true }).select('-__v').lean();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all exited vehicles
exports.getAllExits = async (req, res) => {
  try {
    const exits = await ParkingSpot.find({ isParked: false }).select('-__v').lean();
    res.status(200).json(exits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get full history for a specific number plate
exports.getVehicleHistory = async (req, res) => {
  try {
    const { numberPlate } = req.params;
    const history = await ParkingSpot.find({ numberPlate }).sort({ entryTime: -1 });

    if (!history.length) {
      return res.status(404).json({ message: "No parking history found for this number plate" });
    }

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching vehicle history:", error);
    res.status(500).json({ message: "Error fetching history", error: error.message });
  }
};

// Get ALL vehicle history
exports.getAllVehicleHistory = async (req, res) => {
  try {
    const allHistory = await ParkingSpot.find().sort({ entryTime: -1 });

    if (!allHistory.length) {
      return res.status(404).json({ message: "No vehicle history found" });
    }

    res.status(200).json(allHistory);
  } catch (error) {
    console.error("Error fetching all vehicle history:", error);
    res.status(500).json({ message: "Error fetching vehicle history", error: error.message });
  }
};
