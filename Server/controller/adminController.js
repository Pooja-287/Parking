const User = require('../models/User');
const Employee = require('../models/Employee');
const LeaveRequest = require('../models/LeaveRequest');
const PermissionRequest = require('../models/PermissionRequest');
const Attendance = require('../models/Attendance');

// Create Employee (Employee profile + User login)
const createEmployee = async (req, res) => {
  try {
    const { fullName, mailID, mobile, username, password } = req.body;

    const existingUser = await User.findOne({ officeId: username });
    if (existingUser) {
      return res.status(400).json({ message: 'Employee with this username already exists' });
    }

    const employeeProfile = new Employee({
      fullName,
      mailID,
      mobile,
      username,
      password, // Hash in production
      deleted: false,
      role: 'employee',
    });
    await employeeProfile.save();

    const userLogin = new User({
      officeId: username,
      password,
      name: fullName,
      email: mailID,
      role: 'employee',
      isDeleted: false,
    });
    await userLogin.save();

    res.status(201).json({ message: 'Employee created successfully', employeeProfile, userLogin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all employees (excluding deleted)
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ deleted: false });
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single employee details by ID
const getSingleEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeProfile = await Employee.findById(id);

    if (!employeeProfile || employeeProfile.deleted) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const userLogin = await User.findOne({ officeId: employeeProfile.username });

    if (!userLogin || userLogin.isDeleted) {
      return res.status(404).json({ message: 'User login not found' });
    }

    res.json({ employeeProfile, userLogin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update employee (profile + user login)
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, mailID, mobile, password } = req.body;

    const employeeProfile = await Employee.findById(id);
    if (!employeeProfile || employeeProfile.deleted) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (fullName) employeeProfile.fullName = fullName;
    if (mailID) employeeProfile.mailID = mailID;
    if (mobile) employeeProfile.mobile = mobile;
    await employeeProfile.save();

    if (password) {
      await User.findOneAndUpdate(
        { officeId: employeeProfile.username },
        { password }
      );
    }

    res.json({ message: 'Employee updated successfully', employeeProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete employee (permanent)
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeProfile = await Employee.findById(id);

    if (!employeeProfile) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await Employee.findByIdAndDelete(id);
    await User.deleteOne({ officeId: employeeProfile.username });

    res.json({ message: 'Employee permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all leave requests
const fetchLeaveRequest = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.json({ leaveRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all permission requests
const fetchPermissionRequest = async (req, res) => {
  try {
    const permissionRequests = await PermissionRequest.find();
    res.json({ permissionRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept or reject leave request
const respondLeaveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const request = await LeaveRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    request.status = status;
    await request.save();

    res.json({ message: `Leave request ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept or reject permission request
const respondPermissionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const request = await PermissionRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Permission request not found' });
    }

    request.status = status;
    await request.save();

    res.json({ message: `Permission request ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employee statistics
const getStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments({ deleted: false });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const presentCount = await Attendance.countDocuments({
      date: today,
      status: 'present',
    });

    const absentCount = await Attendance.countDocuments({
      date: today,
      status: 'absent',
    });

    res.json({
      totalEmployees,
      presentToday: presentCount,
      absentToday: absentCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
  respondLeaveRequest,
  respondPermissionRequest,
  getStats,
  fetchLeaveRequest,
  fetchPermissionRequest,
};
