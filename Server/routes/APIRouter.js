const express = require('express');
const router = express.Router();



const {createSuperadmin, loginUser, createClient, getUsers,getUserById, updateUser, deleteUser,
  trashUser,
  restoreUser,
  getTrashedUsers
  } = require('../controller/userController');

const  { parkVehicle, 
  exitVehicle,
  getAllBookings, 
  getAllExits,
   getPrices,
    createPrices,
     updatePrices,
     getVehicleHistory,
     getAllVehicleHistory,
     getVehicleByPlate
 } = require('../controller/ParkingSpotController');
 

const clientController = require('../controller/clientController');

// const verifyToken = require('../middleware/verifyToken');
const { authenticate } = require('../middleware/verifyToken'); // adjust path

router.post('/api/create', clientController.createClient);
router.get('/api/allClient', clientController.getAllClients);
router.get('/api/client/:id', clientController.getClientById);
router.put('/api/update/:id', clientController.updateClient);
router.delete('/api/delete/:id', clientController.deleteClient);



// Route to park a vehicle
router.post('/api/park',  authenticate,parkVehicle);

// Route to exit a vehicle
router.post('/api/exit', authenticate,exitVehicle);
router.get('/api/getpark', getAllBookings);
router.get('/api/getexit', getAllExits);
router.get("/api/getvehicle/:numberPlate", getVehicleHistory);
router.get('/api/vehicle/:id', getVehicleByPlate);

router.get('/api/vehicleHistory', getAllVehicleHistory);

router.get('/api/getprices/:id',getPrices);
router.post('/api/prices/:id', createPrices)
router.put('/api/setPrices/:id',updatePrices);

router.get('/', (req, res) => {
    res.send('Hello, this is Express JS!');
});


router.post('/api/createSuperadmin', createSuperadmin);
router.post('/api/client', createClient);
router.post('/api/login', loginUser);

// Get all users or filter by role (GET /users?role=...)
router.get('/api/users', getUsers);

// Get user by ID (GET /users/:id)
router.get('/api/userid/:id', getUserById);

// Update user by ID (PUT /users/:id)
router.put('/api/updateuser/:id', authenticate,updateUser);

// Delete user by ID (DELETE /users/:id)

router.delete('/api/deleteuser/:id', deleteUser);
router.put('/api/trash/:id', trashUser);
router.put('/api/restore/:id', restoreUser);
router.get('/api/trashed',getTrashedUsers);

module.exports = router;
