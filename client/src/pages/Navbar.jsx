



// // Navbar.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import PriceForm from "./PriceForm";
// import AdminProfile from "./AdminProfile";
// import {
//   FaSignOutAlt,
//   FaListAlt,
//   FaSignInAlt,
//   FaParking,
//   FaUserCircle,
// } from "react-icons/fa";

// function NavLink({ to, label, icon }) {
//   return (
//     <Link
//       to={to}
//       className="hover:text-gray-300 font-semibold transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
//     >
//       <span className="text-xl">{icon}</span>
//       <span>{label}</span>
//     </Link>
//   );
// }

// function MenuItem({ icon, label }) {
//   return (
//     <div
//       tabIndex={0}
//       className="flex items-center space-x-4 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-teal-600 focus:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white select-none"
//     >
//       <div className="text-xl">{icon}</div>
//       <span className="text-base font-semibold">{label}</span>
//     </div>
//   );
// }

// function AdminActionItem({ icon, label, onClick, hoverColor = "hover:bg-teal-600", ringColor = "focus:ring-teal-400" }) {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClick}
//       className={`flex items-center w-full space-x-3 px-4 py-2 rounded-lg bg-teal-700 text-white transition duration-300 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 ${hoverColor} ${ringColor}`}
//     >
//       <div className="text-xl">{icon}</div>
//       <span>{label}</span>
//     </motion.button>
//   );
// }

// function SidebarMenu({ menuOpen, setMenuOpen, onAdminClick, onProfileClick, navigate, admin }) {
//   const [adminMenuOpen, setAdminMenuOpen] = useState(false);

//   return (
//     <>
//       {menuOpen && (
//         <div
//           onClick={() => setMenuOpen(false)}
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
//         />
//       )}
//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-teal-800 to-teal-600 text-white p-6 space-y-6 z-50 rounded-r-3xl shadow-xl transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"} sm:hidden`}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold select-none">Menu</h2>
//           <button onClick={() => setMenuOpen(false)} className="text-white text-3xl font-bold focus:outline-none">×</button>
//         </div>

//         <div className="mb-6">
//           <div onClick={() => setAdminMenuOpen(!adminMenuOpen)} className="flex items-center space-x-4 cursor-pointer">
//             <FaUserCircle className="text-4xl" />
//             <div>
//               <p className="text-white font-semibold select-none">
//                 {admin?.username ? `Hello, ${admin.username}` : "Hello, Admin!"}
//               </p>
//               <p className="text-sm text-teal-300 select-none">{admin?.role}</p>
//             </div>
//           </div>

//           {adminMenuOpen && (
//             <div className="mt-4 ml-10 space-y-2">
//               <AdminActionItem icon={<FaListAlt />} label="Price Details" onClick={() => { onAdminClick(); setMenuOpen(false); setAdminMenuOpen(false); }} hoverColor="hover:bg-yellow-500" ringColor="focus:ring-yellow-400" />
//               <AdminActionItem icon={<FaUserCircle />} label="Profile" onClick={() => { onProfileClick(); setMenuOpen(false); setAdminMenuOpen(false); }} hoverColor="hover:bg-blue-500" ringColor="focus:ring-blue-400" />
//               <AdminActionItem icon={<FaSignOutAlt />} label="Logout" onClick={() => { localStorage.removeItem("admin"); alert("Logged out successfully!"); setMenuOpen(false); setAdminMenuOpen(false); navigate("/login"); }} hoverColor="hover:bg-red-500" ringColor="focus:ring-red-400" />
//             </div>
//           )}
//         </div>

//         <nav className="space-y-3">
//           <Link to="/entry" onClick={() => setMenuOpen(false)}>
//             <MenuItem icon={<FaSignInAlt />} label="Entry" />
//           </Link>
//           <Link to="/exit" onClick={() => setMenuOpen(false)}>
//             <MenuItem icon={<FaSignOutAlt />} label="Exit" />
//           </Link>
//           <Link to="/vehiclelist" onClick={() => setMenuOpen(false)}>
//             <MenuItem icon={<FaListAlt />} label="Vehicle List" />
//           </Link>
//         </nav>
//       </aside>
//     </>
//   );
// }

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showPriceForm, setShowPriceForm] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [admin, setAdmin] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedAdmin = localStorage.getItem("admin");
//     if (storedAdmin) {
//       setAdmin(JSON.parse(storedAdmin));
//     }
//   }, []);

//   const handleOpenPriceForm = () => {
//     setShowPriceForm(true);
//     setShowProfile(false);
//   };

//   const handleClosePriceForm = () => {
//     setShowPriceForm(false);
//   };

//   const handleOpenProfile = () => {
//     navigate("/admin-profile");
//     // setShowProfile(true);
//     // setShowPriceForm(false);
//   };

//   const handleCloseProfile = () => {
//     setShowProfile(false);
//   };

//   return (
//     <>
//       <nav className="flex items-center justify-between p-4 bg-teal-700 text-white flex-wrap sm:flex-nowrap shadow-md">
//         <div className="flex items-center justify-between w-full sm:w-auto">
//           <h1 className="text-xl font-bold flex items-center space-x-2 select-none">
//             <FaParking className="text-yellow-400" />
//             <span>Parking Management</span>
//           </h1>
//           <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-3xl focus:outline-none ml-4">☰</button>
//         </div>

//         <div className="hidden sm:flex items-center space-x-8 mt-4 sm:mt-0 text-lg font-medium">
//           <NavLink to="/entry" label={<span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">Entry</span>} icon={<FaSignInAlt />} />
//           <NavLink to="/exit" label={<span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">Exit</span>} icon={<FaSignOutAlt />} />
//           <NavLink to="/vehiclelist" label={<span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">Vehicle List</span>} icon={<FaListAlt />} />
//         </div>
//       </nav>

//       <div className="flex flex-grow relative">
//         <div className="sm:hidden">
//           <SidebarMenu
//             menuOpen={menuOpen}
//             setMenuOpen={setMenuOpen}
//             onAdminClick={handleOpenPriceForm}
//             onProfileClick={handleOpenProfile}
//             navigate={navigate}
//             admin={admin}
//           />
//         </div>

//         {showPriceForm && <PriceForm onClose={handleClosePriceForm} />}
//         {showProfile && <AdminProfile onClose={handleCloseProfile} />}
//       </div>
//     </>
//   );
// }



















// // Navbar.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import PriceForm from "./PriceForm";
// import AdminProfile from "./AdminProfile";
// import {
//   FaSignOutAlt,
//   FaListAlt,
//   FaSignInAlt,
//   FaParking,
//   FaUserCircle,
// } from "react-icons/fa";

// function NavLink({ to, label, icon }) {
//   return (
//     <Link
//       to={to}
//       className="hover:text-gray-300 font-semibold transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
//     >
//       <span className="text-xl">{icon}</span>
//       <span>{label}</span>
//     </Link>
//   );
// }

// function MenuItem({ icon, label }) {
//   return (
//     <div
//       tabIndex={0}
//       className="flex items-center space-x-4 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-teal-600 focus:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white select-none"
//     >
//       <div className="text-xl">{icon}</div>
//       <span className="text-base font-semibold">{label}</span>
//     </div>
//   );
// }

// function AdminActionItem({ icon, label, onClick, hoverColor = "hover:bg-teal-600", ringColor = "focus:ring-teal-400" }) {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClick}
//       className={`flex items-center w-full space-x-3 px-4 py-2 rounded-lg bg-teal-700 text-white transition duration-300 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 ${hoverColor} ${ringColor}`}
//     >
//       <div className="text-xl">{icon}</div>
//       <span>{label}</span>
//     </motion.button>
//   );
// }

// function SidebarMenu({ menuOpen, setMenuOpen, onAdminClick, onProfileClick, navigate, admin }) {
//   const [adminMenuOpen, setAdminMenuOpen] = useState(false);

//   return (
//     <>
//       {menuOpen && (
//         <div
//           onClick={() => setMenuOpen(false)}
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
//         />
//       )}
//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-teal-800 to-teal-600 text-white p-6 space-y-6 z-50 rounded-r-3xl shadow-xl transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"} sm:hidden`}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold select-none">Menu</h2>
//           <button onClick={() => setMenuOpen(false)} className="text-white text-3xl font-bold focus:outline-none">×</button>
//         </div>

//         <div className="mb-6">
//           <div onClick={() => setAdminMenuOpen(!adminMenuOpen)} className="flex items-center space-x-4 cursor-pointer">
//             <FaUserCircle className="text-4xl" />
//             <div>
//               <p className="text-white font-semibold select-none">
//                 {admin?.username ? `Hello, ${admin.username}` : "Hello, Admin!"}
//               </p>
//               <p className="text-sm text-teal-300 select-none">{admin?.role}</p>
//             </div>
//           </div>

//           {adminMenuOpen && (
//             <div className="mt-4 ml-10 space-y-2">
//               <AdminActionItem icon={<FaListAlt />} label="Price Details" onClick={() => { onAdminClick(); setMenuOpen(false); setAdminMenuOpen(false); }} hoverColor="hover:bg-yellow-500" ringColor="focus:ring-yellow-400" />
//               <AdminActionItem icon={<FaUserCircle />} label="Profile" onClick={() => { onProfileClick(); setMenuOpen(false); setAdminMenuOpen(false); }} hoverColor="hover:bg-blue-500" ringColor="focus:ring-blue-400" />
//               <AdminActionItem icon={<FaSignOutAlt />} label="Logout" onClick={() => { localStorage.removeItem("admin"); alert("Logged out successfully!"); setMenuOpen(false); setAdminMenuOpen(false); navigate("/login"); }} hoverColor="hover:bg-red-500" ringColor="focus:ring-red-400" />
//             </div>
//           )}
//         </div>

//         <nav className="space-y-3">
//           <Link to="/entry" onClick={() => setMenuOpen(false)}>
//             <MenuItem icon={<FaSignInAlt />} label="Entry" />
//           </Link>
//           <Link to="/exit" onClick={() => setMenuOpen(false)}>
//             <MenuItem icon={<FaSignOutAlt />} label="Exit" />
//           </Link>
//           <Link to="/vehiclelist" onClick={() => setMenuOpen(false)}>
//             <MenuItem icon={<FaListAlt />} label="Vehicle List" />
//           </Link>
//         </nav>
//       </aside>
//     </>
//   );
// }

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showPriceForm, setShowPriceForm] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [admin, setAdmin] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedAdmin = localStorage.getItem("admin");
//     if (storedAdmin) {
//       setAdmin(JSON.parse(storedAdmin));
//     }
//   }, []);

//   const handleOpenPriceForm = () => {
//     setShowPriceForm(true);
//     setShowProfile(false);
//   };

//   const handleClosePriceForm = () => {
//     setShowPriceForm(false);
//   };

//   const handleOpenProfile = () => {
//     navigate("/admin-profile");
//     // setShowProfile(true);
//     // setShowPriceForm(false);
//   };

//   const handleCloseProfile = () => {
//     setShowProfile(false);
//   };

//   return (
//     <>
//       <nav className="flex items-center justify-between p-4 bg-teal-700 text-white flex-wrap sm:flex-nowrap shadow-md">
//         <div className="flex items-center justify-between w-full sm:w-auto">
//           <h1 className="text-xl font-bold flex items-center space-x-2 select-none">
//             <FaParking className="text-yellow-400" />
//             <span>Parking Management</span>
//           </h1>
//           <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-3xl focus:outline-none ml-4">☰</button>
//         </div>

//         {/* Desktop Nav Links + Admin Dropdown */}
//         <div className="hidden sm:flex items-center space-x-8 mt-4 sm:mt-0 text-lg font-medium ml-auto">
//           <NavLink to="/entry" label={<span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">Entry</span>} icon={<FaSignInAlt />} />
//           <NavLink to="/exit" label={<span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">Exit</span>} icon={<FaSignOutAlt />} />
//           <NavLink to="/vehiclelist" label={<span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">Vehicle List</span>} icon={<FaListAlt />} />

//           {/* Admin Dropdown */}
//           <div className="relative group">
//             <button className="flex items-center space-x-2 bg-teal-600 px-3 py-1 rounded hover:bg-teal-800 focus:outline-none">
//               <FaUserCircle className="text-xl" />
//               <span>{admin?.username || "Admin"}</span>
//             </button>

//             <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg hidden group-hover:block z-50">
//               <button
//                 onClick={handleOpenPriceForm}
//                 className="w-full text-left px-4 py-2 hover:bg-yellow-100 border-b border-gray-200"
//               >
//                 <span className="flex items-center space-x-2">
//                   <FaListAlt />
//                   <span>Price Details</span>
//                 </span>
//               </button>
//               <button
//                 onClick={handleOpenProfile}
//                 className="w-full text-left px-4 py-2 hover:bg-blue-100 border-b border-gray-200"
//               >
//                 <span className="flex items-center space-x-2">
//                   <FaUserCircle />
//                   <span>Profile</span>
//                 </span>
//               </button>
//               <button
//                 onClick={() => {
//                   localStorage.removeItem("admin");
//                   alert("Logged out successfully!");
//                   navigate("/login");
//                 }}
//                 className="w-full text-left px-4 py-2 hover:bg-red-100"
//               >
//                 <span className="flex items-center space-x-2 text-red-600">
//                   <FaSignOutAlt />
//                   <span>Logout</span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="flex flex-grow relative">
//         <div className="sm:hidden">
//           <SidebarMenu
//             menuOpen={menuOpen}
//             setMenuOpen={setMenuOpen}
//             onAdminClick={handleOpenPriceForm}
//             onProfileClick={handleOpenProfile}
//             navigate={navigate}
//             admin={admin}
//           />
//         </div>

//         {showPriceForm && <PriceForm onClose={handleClosePriceForm} />}
//         {showProfile && <AdminProfile onClose={handleCloseProfile} />}
//       </div>
//     </>
//   );
// }












// // Navbar.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import PriceForm from "./PriceForm";
// import AdminProfile from "./AdminProfile";
// import {
//   FaSignOutAlt,
//   FaListAlt,
//   FaSignInAlt,
//   FaParking,
//   FaUserCircle,
// } from "react-icons/fa";

// function NavLink({ to, label, icon }) {
//   return (
//     <Link
//       to={to}
//       className="hover:text-gray-300 font-semibold transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
//     >
//       <span className="text-xl">{icon}</span>
//       <span>{label}</span>
//     </Link>
//   );
// }

// function MenuItem({ icon, label }) {
//   return (
//     <div
//       tabIndex={0}
//       className="flex items-center space-x-4 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-teal-600 focus:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white select-none"
//     >
//       <div className="text-xl">{icon}</div>
//       <span className="text-base font-semibold">{label}</span>
//     </div>
//   );
// }

// function AdminActionItem({ icon, label, onClick, hoverColor = "hover:bg-teal-600", ringColor = "focus:ring-teal-400" }) {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClick}
//       className={`flex items-center w-full space-x-3 px-4 py-2 rounded-lg bg-teal-700 text-white transition duration-300 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 ${hoverColor} ${ringColor}`}
//     >
//       <div className="text-xl">{icon}</div>
//       <span>{label}</span>
//     </motion.button>
//   );
// }

// function SidebarMenu({ menuOpen, setMenuOpen, onAdminClick, onProfileClick, navigate, admin }) {
//   const [adminMenuOpen, setAdminMenuOpen] = useState(false);

//   return (
//     <>
//       {menuOpen && (
//         <div
//           onClick={() => setMenuOpen(false)}
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
//         />
//       )}
//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-teal-800 to-teal-600 text-white p-6 space-y-6 z-50 rounded-r-3xl shadow-xl transform transition-transform duration-300 ease-in-out ${
//           menuOpen ? "translate-x-0" : "-translate-x-full"
//         } sm:hidden`}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold select-none">Menu</h2>
//           <button
//             onClick={() => setMenuOpen(false)}
//             className="text-white text-3xl font-bold focus:outline-none"
//           >
//             ×
//           </button>
//         </div>

//         <div className="mb-6">
//           <div
//             onClick={() => setAdminMenuOpen(!adminMenuOpen)}
//             className="flex items-center space-x-4 cursor-pointer"
//           >
//             <FaUserCircle className="text-4xl" />
//             <div>
//               <p className="text-white font-semibold select-none">
//                 {admin?.username ? `Hello, ${admin.username}` : "Hello, Admin!"}
//               </p>
//               <p className="text-sm text-teal-300 select-none">{admin?.role}</p>
//             </div>
//           </div>

//           {adminMenuOpen && (
//             <div className="mt-4 ml-10 space-y-2">
//               <AdminActionItem
//                 icon={<FaListAlt />}
//                 label="Price Details"
//                 onClick={() => {
//                   onAdminClick();
//                   setMenuOpen(false);
//                   setAdminMenuOpen(false);
//                 }}
//                 hoverColor="hover:bg-yellow-500"
//                 ringColor="focus:ring-yellow-400"
//               />
//               <AdminActionItem
//                 icon={<FaUserCircle />}
//                 label="Profile"
//                 onClick={() => {
//                   onProfileClick();
//                   setMenuOpen(false);
//                   setAdminMenuOpen(false);
//                 }}
//                 hoverColor="hover:bg-blue-500"
//                 ringColor="focus:ring-blue-400"
//               />
//               <AdminActionItem
//                 icon={<FaSignOutAlt />}
//                 label="Logout"
//                 onClick={() => {
//                   localStorage.removeItem("admin");
//                   alert("Logged out successfully!");
//                   setMenuOpen(false);
//                   setAdminMenuOpen(false);
//                   navigate("/login");
//                 }}
//                 hoverColor="hover:bg-red-500"
//                 ringColor="focus:ring-red-400"
//               />
//             </div>
//           )}
//         </div>

//         <nav className="space-y-3">
//           <Link to="/entry" onClick={() => setMenuOpen(false)}>
//             <MenuItem icon={<FaSignInAlt />} label="Entry" />
//           </Link>
//           <Link to="/exit" onClick={() => setMenuOpen(false)}>
//             <MenuItem icon={<FaSignOutAlt />} label="Exit" />
//           </Link>
//           <Link to="/vehiclelist" onClick={() => setMenuOpen(false)}>
//             <MenuItem icon={<FaListAlt />} label="Vehicle List" />
//           </Link>
//         </nav>
//       </aside>
//     </>
//   );
// }

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showPriceForm, setShowPriceForm] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [admin, setAdmin] = useState({});
//   const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const storedAdmin = localStorage.getItem("admin");
//     if (storedAdmin) {
//       setAdmin(JSON.parse(storedAdmin));
//     }
//   }, []);

//   // Close dropdown if click outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setAdminDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleOpenPriceForm = () => {
//     setShowPriceForm(true);
//     setShowProfile(false);
//     setAdminDropdownOpen(false);
//   };

//   const handleClosePriceForm = () => {
//     setShowPriceForm(false);
//   };

//   const handleOpenProfile = () => {
//     setShowProfile(true);
//     setShowPriceForm(false);
//     setAdminDropdownOpen(false);
//     navigate("/admin-profile");
//   };

//   const handleCloseProfile = () => {
//     setShowProfile(false);
//   };

//   return (
//     <>
//       <nav className="flex items-center justify-between p-4 bg-teal-700 text-white flex-wrap sm:flex-nowrap shadow-md">
//         <div className="flex items-center justify-between w-full sm:w-auto">
//           <h1 className="text-xl font-bold flex items-center space-x-2 select-none">
//             <FaParking className="text-yellow-400" />
//             <span>Parking Management</span>
//           </h1>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="sm:hidden text-3xl focus:outline-none ml-4"
//           >
//             ☰
//           </button>
//         </div>

//         {/* Desktop Nav Links + Admin Dropdown */}
//         <div className="hidden sm:flex items-center space-x-8 mt-4 sm:mt-0 text-lg font-medium ml-auto">
//           <NavLink
//             to="/entry"
//             label={
//               <span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">
//                 Entry
//               </span>
//             }
//             icon={<FaSignInAlt />}
//           />
//           <NavLink
//             to="/exit"
//             label={
//               <span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">
//                 Exit
//               </span>
//             }
//             icon={<FaSignOutAlt />}
//           />
//           <NavLink
//             to="/vehiclelist"
//             label={
//               <span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">
//                 Vehicle List
//               </span>
//             }
//             icon={<FaListAlt />}
//           />

//           {/* Admin Dropdown */}
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
//               className="flex items-center space-x-2 bg-teal-600 px-3 py-1 rounded hover:bg-teal-800 focus:outline-none"
//               aria-expanded={adminDropdownOpen}
//             >
//               <FaUserCircle className="text-xl" />
//               <span>{admin?.username || "Admin"}</span>
//             </button>

//             {adminDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg z-50">
//                 <button
//                   onClick={handleOpenPriceForm}
//                   className="w-full text-left px-4 py-2 hover:bg-yellow-100 border-b border-gray-200"
//                 >
//                   <span className="flex items-center space-x-2">
//                     <FaListAlt />
//                     <span>Price Details</span>
//                   </span>
//                 </button>
//                 <button
//                   onClick={handleOpenProfile}
//                   className="w-full text-left px-4 py-2 hover:bg-blue-100 border-b border-gray-200"
//                 >
//                   <span className="flex items-center space-x-2">
//                     <FaUserCircle />
//                     <span>Profile</span>
//                   </span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem("admin");
//                     alert("Logged out successfully!");
//                     setAdminDropdownOpen(false);
//                     navigate("/login");
//                   }}
//                   className="w-full text-left px-4 py-2 hover:bg-red-100"
//                 >
//                   <span className="flex items-center space-x-2 text-red-600">
//                     <FaSignOutAlt />
//                     <span>Logout</span>
//                   </span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       <div className="flex flex-grow relative">
//         <div className="sm:hidden">
//           <SidebarMenu
//             menuOpen={menuOpen}
//             setMenuOpen={setMenuOpen}
//             onAdminClick={handleOpenPriceForm}
//             onProfileClick={handleOpenProfile}
//             navigate={navigate}
//             admin={admin}
//           />
//         </div>

//         {showPriceForm && <PriceForm onClose={handleClosePriceForm} />}
//         {showProfile && <AdminProfile onClose={handleCloseProfile} />}
//       </div>
//     </>
//   );
// }









// Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PriceForm from "./PriceForm";
import AdminProfile from "./AdminProfile";
import {
  FaSignOutAlt,
  FaListAlt,
  FaSignInAlt,
  FaParking,
  FaUserCircle,
} from "react-icons/fa";

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

function MenuItem({ icon, label }) {
  return (
    <div
      tabIndex={0}
      className="flex items-center space-x-4 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-teal-600 focus:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white select-none"
    >
      <div className="text-xl">{icon}</div>
      <span className="text-base font-semibold">{label}</span>
    </div>
  );
}

function AdminActionItem({ icon, label, onClick, hoverColor = "hover:bg-teal-600", ringColor = "focus:ring-teal-400" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center w-full space-x-3 px-4 py-2 rounded-lg bg-teal-700 text-white transition duration-300 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 ${hoverColor} ${ringColor}`}
    >
      <div className="text-xl">{icon}</div>
      <span>{label}</span>
    </motion.button>
  );
}

function SidebarMenu({ menuOpen, setMenuOpen, onAdminClick, onProfileClick, navigate, admin }) {
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-teal-800 to-teal-600 text-white p-6 space-y-6 z-50 rounded-r-3xl shadow-xl transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold select-none">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white text-3xl font-bold focus:outline-none"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <div
            onClick={() => setAdminMenuOpen(!adminMenuOpen)}
            className="flex items-center space-x-4 cursor-pointer"
          >
            <FaUserCircle className="text-4xl" />
            <div>
              <p className="text-white font-semibold select-none">
                {admin?.username ? `Hello, ${admin.username}` : "Hello, Admin!"}
              </p>
              <p className="text-sm text-teal-300 select-none">{admin?.role}</p>
            </div>
          </div>

          {adminMenuOpen && (
            <div className="mt-4 ml-10 space-y-2">
              <AdminActionItem
                icon={<FaListAlt />}
                label="Price Details"
                onClick={() => {
                  onAdminClick();
                  setMenuOpen(false);
                  setAdminMenuOpen(false);
                }}
                hoverColor="hover:bg-yellow-500"
                ringColor="focus:ring-yellow-400"
              />
              <AdminActionItem
                icon={<FaUserCircle />}
                label="Profile"
                onClick={() => {
                  onProfileClick();
                  setMenuOpen(false);
                  setAdminMenuOpen(false);
                }}
                hoverColor="hover:bg-blue-500"
                ringColor="focus:ring-blue-400"
              />
              <AdminActionItem
                icon={<FaSignOutAlt />}
                label="Logout"
                onClick={() => {
                  localStorage.removeItem("admin");
                  toast.success("Logged out successfully!");
                  setMenuOpen(false);
                  setAdminMenuOpen(false);
                  setTimeout(() => {
                    navigate("/login");
                  }, 1500); // Delay for toast to show
                }}
                hoverColor="hover:bg-red-500"
                ringColor="focus:ring-red-400"
              />
            </div>
          )}
        </div>

        <nav className="space-y-3">
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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [admin, setAdmin] = useState({});
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  // Close dropdown if click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAdminDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenPriceForm = () => {
    setShowPriceForm(true);
    setShowProfile(false);
    setAdminDropdownOpen(false);
  };

  const handleClosePriceForm = () => {
    setShowPriceForm(false);
  };

  const handleOpenProfile = () => {
    setShowProfile(true);
    setShowPriceForm(false);
    setAdminDropdownOpen(false);
    navigate("/admin-profile");
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-teal-700 text-white flex-wrap sm:flex-nowrap shadow-md">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <h1 className="text-xl font-bold flex items-center space-x-2 select-none">
            <FaParking className="text-yellow-400" />
            <span>Parking Management</span>
          </h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-3xl focus:outline-none ml-4"
          >
            ☰
          </button>
        </div>

        {/* Desktop Nav Links + Admin Dropdown */}
        <div className="hidden sm:flex items-center space-x-8 mt-4 sm:mt-0 text-lg font-medium ml-auto">
          <NavLink
            to="/entry"
            label={
              <span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">
                Entry
              </span>
            }
            icon={<FaSignInAlt />}
          />
          <NavLink
            to="/exit"
            label={
              <span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">
                Exit
              </span>
            }
            icon={<FaSignOutAlt />}
          />
          <NavLink
            to="/vehiclelist"
            label={
              <span className="bg-teal-600 px-2 py-1 rounded hover:bg-gray-700">
                Vehicle List
              </span>
            }
            icon={<FaListAlt />}
          />

          {/* Admin Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
              className="flex items-center space-x-2 bg-teal-600 px-3 py-1 rounded hover:bg-teal-800 focus:outline-none"
              aria-expanded={adminDropdownOpen}
            >
              <FaUserCircle className="text-xl" />
              <span>{admin?.username || "Admin"}</span>
            </button>

            {adminDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-lg z-50">
                <button
                  onClick={handleOpenPriceForm}
                  className="w-full text-left px-4 py-2 hover:bg-yellow-100 border-b border-gray-200"
                >
                  <span className="flex items-center space-x-2">
                    <FaListAlt />
                    <span>Price Details</span>
                  </span>
                </button>
                <button
                  onClick={handleOpenProfile}
                  className="w-full text-left px-4 py-2 hover:bg-blue-100 border-b border-gray-200"
                >
                  <span className="flex items-center space-x-2">
                    <FaUserCircle />
                    <span>Profile</span>
                  </span>
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("admin");
                    toast.success("Logged out successfully!");
                    setAdminDropdownOpen(false);
                    setTimeout(() => {
                      navigate("/login");
                    }, 1500);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-100"
                >
                  <span className="flex items-center space-x-2 text-red-600">
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex flex-grow relative">
        <div className="sm:hidden">
          <SidebarMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onAdminClick={handleOpenPriceForm}
            onProfileClick={handleOpenProfile}
            navigate={navigate}
            admin={admin}
          />
        </div>

        {showPriceForm && <PriceForm onClose={handleClosePriceForm} />}
        {showProfile && <AdminProfile onClose={handleCloseProfile} />}
      </div>

      {/* Toast container for notifications */}
      <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
