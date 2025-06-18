const Client = require('../models/Client');

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, vehicleType, numberPlate } = req.body;

    if (!fullName || !email || !mobileNumber || !vehicleType || !numberPlate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await Client.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Client with this email already exists' });
    }

    const client = new Client({ fullName, email, mobileNumber, vehicleType, numberPlate });
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// Update a client by ID
exports.updateClient = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, vehicleType, numberPlate } = req.body;

    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    // Update fields if provided
    if (fullName) client.fullName = fullName;
    if (email) client.email = email;
    if (mobileNumber) client.mobileNumber = mobileNumber;
    if (vehicleType) client.vehicleType = vehicleType;
    if (numberPlate) client.numberPlate = numberPlate;

    await client.save();
    res.status(200).json({ message: 'Client updated successfully', client });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Delete a client by ID
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    await client.deleteOne(); // ✅ Updated line
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








