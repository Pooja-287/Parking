const User = require('../models/User');

const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken')



const createSuperadmin = async (req, res) => {
  try {
    const { username, password,email } = req.body;

    // You can optionally check for duplicate usernames instead
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already taken' });

    const superadmin = new User({ username, password,email, role: 'superadmin' });
    await superadmin.save();

    res.status(201).json({ message: 'Superadmin created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create a client user
const createClient = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already taken' });

    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) return res.status(400).json({ message: 'Email already registered' });
    }

    // No password hashing here either
    const client = new User({ username, password, role: 'client', email });
    await client.save();

    res.status(201).json({ message: 'Client user created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// Login user with username, password, and role
const loginUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const user = await User.findOne({ username, role });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Plain text password comparison (consider using bcrypt in production)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDhkMmY2MjFkODkwMDcxZjFiMmJjOSIsInVzZXJuYW1lIjoiY2xpZW50Iiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTc0OTYwMzEzNSwiZXhwIjoxNzQ5NjA2NzM1fQ.gpl7A-QG105irJvvDAVthVZ1Xz8n8PPjfGtkrHqxq50',
      { expiresIn: '30d' } // token expiry (optional)
    );

    return res.status(200).json({
      message: 'Login successful',
      token, // send the token in response
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// READ - Get all users or filter by role (optional)
const getUsers = async (req, res) => {
  try {
    const { role } = req.query; // optional filter
    const filter = role ? { role } : {};
    // const users = await User.find(filter).select('-password'); // exclude passwords
    const users = await User.find(filter) // exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - Get user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update current logged-in user's details
// const updateUser = async (req, res) => {
//   try {
//     const userId = req.user.id; // ID from verified token
//     const { username, email, password } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (username) user.username = username;
//     if (email) user.email = email;
//     if (password) user.password = password;

//     await user.save();

//     res.status(200).json({ message: 'User updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const updateUser = async (req, res) => {
//   try {
//     const userId = req.user.id; // OR use req.params.id if you're passing ID in URL
//     const { username, email, password } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (username) user.username = username;

//     if (email) {
//       const emailExists = await User.findOne({ email, _id: { $ne: userId } });
//       if (emailExists) {
//         return res.status(400).json({ message: 'Email already in use' });
//       }
//       user.email = email;
//     }

//     if (password) user.password = password;

//     await user.save();

//     res.status(200).json({ message: 'User updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id; // From token or URL
    const { username, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check for duplicate email if email is changed
    if (email && email !== user.email) {
      const existingEmailUser = await User.findOne({ email });
      if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    // Check for duplicate username if username is changed
    if (username && username !== user.username) {
      const existingUsernameUser = await User.findOne({ username });
      if (existingUsernameUser && existingUsernameUser._id.toString() !== userId) {
        return res.status(400).json({ message: 'Username already in use' });
      }
      user.username = username;
    }

    if (password) user.password = password;

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE - Delete a user by id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const trashUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.isDeleted) {
      return res.status(404).json({ message: 'User not found or already trashed' });
    }

    user.isDeleted = true;
    await user.save();

    res.status(200).json({ message: 'User moved to trash successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const restoreUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.isDeleted) {
      return res.status(404).json({ message: 'User not found or not trashed' });
    }

    user.isDeleted = false;
    await user.save();

    res.status(200).json({ message: 'User restored successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrashedUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: true }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createSuperadmin,
  createClient,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  trashUser,
  restoreUser,
  getTrashedUsers
};



















