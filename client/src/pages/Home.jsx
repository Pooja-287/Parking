






import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaListAlt,
  FaHome,
  FaSignInAlt,
  FaUserCircle,
  FaLightbulb,
  FaParking,
} from "react-icons/fa";

import PriceForm from "../pages/PriceForm";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPriceForm, setShowPriceForm] = useState(false); // control modal visibility

  // Handler to open the modal
  const handleOpenPriceForm = () => {
    setShowPriceForm(true);
    setMenuOpen(false); // optional: close sidebar menu if open
  };

  // Handler to close the modal
  const handleClosePriceForm = () => {
    setShowPriceForm(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-vector/abstract-machine-background_41981-192.jpg?uid=R186192783&ga=GA1.1.1130756120.1745920439&semt=ais_hybrid&w=740')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-teal-700 text-white flex-wrap sm:flex-nowrap shadow-md">
        {/* Heading and hamburger button container */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          {/* Heading */}
          <h1 className="text-xl font-bold flex items-center space-x-2 select-none">
            <FaParking className="text-yellow-400" />
            <span>Parking Management</span>
          </h1>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-3xl focus:outline-none ml-4"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center space-x-8 mt-4 sm:mt-0 text-lg font-medium">
          {/* <NavLink to="/" label="Home" icon={<FaHome />} /> */}
          <NavLink to="/entry" label="Entry" icon={<FaSignInAlt />} />
          <NavLink to="/exit" label="Exit" icon={<FaSignOutAlt />} />
          <NavLink to="/vehiclelist" label="Vehicle List" icon={<FaListAlt />} />
        </div>
      </nav>

      <div className="flex flex-grow relative">
        {/* Sidebar mobile menu */}
        <div className="sm:hidden">
          <SidebarMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onAdminClick={handleOpenPriceForm} // pass handler here
          />
        </div>

          {/* Main Content */}
         {/* <main className="relative z-20 max-w-3xl w-full bg-white bg-opacity-10 rounded-xl p-6 sm:p-10 shadow-2xl text-center text-white backdrop-blur-md animate-fadeInScale select-none mx-4 sm:mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg leading-tight sm:leading-snug">
             Welcome to the Parking Management System
          </h1>

           <p className="text-base sm:text-lg leading-relaxed tracking-wide mb-8 sm:mb-10 drop-shadow-md max-w-xl mx-auto px-2 sm:px-0">
             Efficiently monitor and control vehicle movements in your facility. View daily activity summaries, manage
             records, and navigate key actions right from this dashboard. Stay informed with real-time updates,
             optimize parking space usage, and ensure smooth vehicle flow throughout your premises.
           </p>

           <div className="inline-flex items-center justify-center bg-teal-600 bg-opacity-90 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold shadow-lg max-w-max mx-auto cursor-pointer hover:bg-teal-700 transition duration-300 animate-pulse select-none">
             <FaLightbulb className="mr-2 sm:mr-3 text-yellow-300 text-lg sm:text-xl" />
              <span className="text-sm sm:text-base">
                Tip: Regularly update vehicle exit records to keep the system accurate.
              </span>
            </div>
          </main> */}

        {/* Render PriceForm modal when showPriceForm is true */}
        {showPriceForm && <PriceForm onClose={handleClosePriceForm} />}
      </div>
    </div>
  );
}

function NavLink({ to, label, icon }) {
  return (
    <Link
      to={to}
      className="hover:text-gray-300 font-semibold transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function SidebarMenu({ menuOpen, setMenuOpen, onAdminClick }) {
  return (
    <>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-teal-800 to-teal-600 text-white p-6 space-y-6 z-50 rounded-r-3xl shadow-xl transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden`}
        aria-label="Sidebar menu"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold select-none">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white text-3xl font-bold focus:outline-none"
            aria-label="Close sidebar menu"
          >
            ×
          </button>
        </div>

        {/* Admin clickable area */}
        <div
          onClick={onAdminClick}
          className="mb-6 flex items-center space-x-4 cursor-pointer"
        >
          <FaUserCircle className="text-4xl" />
          <div>
            <p className="text-white font-semibold select-none">Hello, Admin!</p>
            <p className="text-sm text-teal-300 select-none">
              Manage your parking
            </p>
          </div>
        </div>

        <nav className="space-y-3" aria-label="Sidebar navigation">
          {/* <Link to="/" onClick={() => setMenuOpen(false)}>
            <MenuItem icon={<FaHome />} label="Home" />
          </Link> */}
          <Link to="/entry" onClick={() => setMenuOpen(false)}>
            <MenuItem icon={<FaSignInAlt />} label="Entry" />
          </Link>
          <Link to="/exit" onClick={() => setMenuOpen(false)}>
            <MenuItem icon={<FaSignOutAlt />} label="Exit" />
          </Link>
          <Link to="/vehiclelist" onClick={() => setMenuOpen(false)}>
            <MenuItem icon={<FaListAlt />} label="Vehicle List" />
          </Link>
        </nav>
      </aside>
    </>
  );
}

function MenuItem({ icon, label }) {
  return (
    <div
      tabIndex={0}
      className="flex items-center space-x-4 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-teal-600 focus:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white select-none"
    >
      <div className="text-xl">{icon}</div>
      <span className="text-base font-semibold">{label}</span>
    </div>
  );
}
