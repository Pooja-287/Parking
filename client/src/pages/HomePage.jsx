



import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import parkingImage from "../assets/Parking.jpeg";

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="min-h-screen w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${parkingImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      
        {/* Centered Content and Features */}
        <div className="relative z-10 flex flex-col py-20 items-center justify-center h-full px-4 sm:px-8 md:px-16 text-white text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-xl mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🚗 Welcome to Our Parking Management System
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl py-4 text-2xl font-light drop-shadow-md mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Manage your vehicle parking securely and efficiently.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mb-10"
          >
            <Link
              to="/login"
              className="inline-block bg-green-500 hover:bg-green-600 text-white text-lg font-medium px-6 py-3 rounded-md shadow-md transition duration-300"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Features Over Background */}
          <div className="relative z-10 px-4 sm:px-8 pb-20">
            <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-12">
              Our Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <motion.div
                className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2">🔒 Secure Parking</h3>
                <p>
                  All your vehicle data and parking details are encrypted and safe.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2">📊 Real-time Monitoring</h3>
                <p>
                  Track vehicle status and availability in real-time across locations.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2">🔑 Easy Access</h3>
                <p>
                  Access your parking info anytime with a responsive dashboard.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
