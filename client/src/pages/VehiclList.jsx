


// import React, { useState, useEffect } from "react";
// import Navbar from "../pages/Navbar";
// import bg from "../assets/bg.jpg";

// const API_BASE = "http://localhost:4000/api";

// export default function VehicleList() {
//   const [tab, setTab] = useState("current");
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchPlate, setSearchPlate] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [filterDate, setFilterDate] = useState("");

//   useEffect(() => {
//     setError(null);
//     setSearchResult([]);
//     setFilterDate("");
//     if (tab === "current") fetchCurrentParked();
//     else if (tab === "exited") fetchExitedVehicles();
//     else if (tab === "history") fetchAllVehicleHistory();
//   }, [tab]);

//   async function fetchCurrentParked() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/getpark`);
//       if (!res.ok) throw new Error("Failed to fetch current parked vehicles");
//       const data = await res.json();
//       setVehicles(data);
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   async function fetchExitedVehicles() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/getexit`);
//       if (!res.ok) throw new Error("Failed to fetch exited vehicles");
//       const data = await res.json();
//       setVehicles(data);
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   async function fetchAllVehicleHistory() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/vehicleHistory`);
//       if (!res.ok) throw new Error("Failed to fetch vehicle history");
//       const data = await res.json();
//       setVehicles(data);
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   async function handleSearch(e) {
//     e.preventDefault();
//     if (!searchPlate.trim()) {
//       setError("Please enter a number plate");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setSearchResult([]);
//     try {
//       const res = await fetch(`${API_BASE}/getvehicle/${encodeURIComponent(searchPlate.trim())}`);
//       if (res.status === 404) {
//         setError("No parking history found for this number plate");
//         setSearchResult([]);
//       } else if (!res.ok) {
//         throw new Error("Failed to fetch vehicle history");
//       } else {
//         const data = await res.json();
//         setSearchResult(data.length ? data : [data]);
//       }
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   function formatDate(dateStr) {
//     if (!dateStr) return "-";
//     const d = new Date(dateStr);
//     return d.toLocaleString();
//   }

//   return (
//     <>
//       <Navbar />
//       <div
//         // className="min-h-screen bg-cover bg-center bg-no-repeat"
//          className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
//        style={{
//                        backgroundImage: `url(${bg})`,
//                        backgroundSize: "cover",
//                        backgroundPosition: "center",
//                      }}
//       >
//         <div className="backdrop-blur-sm bg-white/20 min-h-screen">
//           <div className="max-w-6xl mx-auto p-4">

//             {/* Sticky Header */}
//             <div className="sticky top-0 z-10 bg-white/30 backdrop-blur-md p-4 rounded shadow mb-4">
//               <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
//                 Vehicle List Details 
//               </h1>

//               {/* Tabs */}
//               <div className="flex flex-wrap justify-center gap-3 mb-4">
//                 {["current", "exited", "search", "history"].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => setTab(type)}
//                     className={`px-4 py-2 rounded-md font-semibold transition ${
//                       tab === type
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-200 text-gray-700 hover:bg-blue-300"
//                     }`}
//                   >
//                     {type === "current" && "Current Parked"}
//                     {type === "exited" && "Exited Vehicles"}
//                     {type === "search" && "Search History"}
//                     {type === "history" && "All History"}
//                   </button>
//                 ))}
//               </div>

//               {/* Date Filter */}
//               {(tab === "current" || tab === "exited" || tab === "history") && (
//                 <div className="flex justify-center items-center">
//                   <label className="mr-2 font-medium text-gray-800">Filter by Date:</label>
//                   <input
//                     type="date"
//                     value={filterDate}
//                     onChange={(e) => setFilterDate(e.target.value)}
//                     className="border border-gray-300 rounded px-3 py-1 text-sm"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Scrollable content area */}
//             <div className="h-[calc(100vh-240px)] overflow-y-auto px-1 pb-4">
//               {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
//               {loading && <div className="text-center text-gray-600 font-medium">Loading...</div>}

//               {/* Search */}
//               {tab === "search" && (
//                 <div className="max-w-md mx-auto mb-6">
//                   <form onSubmit={handleSearch} className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Enter number plate"
//                       className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={searchPlate}
//                       onChange={(e) => setSearchPlate(e.target.value)}
//                     />
//                     <button
//                       type="submit"
//                       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     >
//                       Search
//                     </button>
//                   </form>
//                 </div>
//               )}

//               {/* Search Results */}
//               {searchResult.length > 0 && (
//                 <div className="max-h-[400px] overflow-y-auto mb-8">
//                   {searchResult.map((veh, idx) => (
//                     <div
//                       key={idx}
//                       className="bg-white border border-gray-300 rounded-lg shadow-md p-5 mb-4"
//                     >
//                       <h2 className="text-xl font-bold text-blue-700 mb-2">{veh.name || "N/A"}</h2>
//                       <p><strong>Vehicle Type:</strong> {veh.vehicleType || "N/A"}</p>
//                       <p><strong>Number Plate:</strong> {veh.numberPlate || "N/A"}</p>
//                       <p><strong>Mobile Number:</strong> {veh.mobileNumber || "N/A"}</p>
//                       <p><strong>Entry Time:</strong> {formatDate(veh.entryTime)}</p>
//                       <p><strong>Exit Time:</strong> {formatDate(veh.exitTime)}</p>
//                       <p><strong>Days Parked:</strong> {veh.daysParked || "-"}</p>
//                       <p><strong>Total Amount:</strong> {veh.totalAmount || "-"}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Vehicle Cards */}
//               {(tab === "current" || tab === "exited" || tab === "history") && (
//                 <>
//                   {vehicles.length === 0 && !loading && (
//                     <p className="text-center text-gray-500 mt-10">No vehicles found.</p>
//                   )}
//                   {vehicles.length > 0 && (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {vehicles
//                         .filter((veh) => {
//                           if (!filterDate) return true;
//                           const entryDate = veh.entryTime
//                             ? new Date(veh.entryTime).toISOString().split("T")[0]
//                             : "";
//                           const exitDate = veh.exitTime
//                             ? new Date(veh.exitTime).toISOString().split("T")[0]
//                             : "";
//                           return entryDate === filterDate || exitDate === filterDate;
//                         })
//                         .map((veh) => (
//                           <div
//                             key={veh._id}
//                             className="bg-white/80 border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg transition"
//                           >
//                             <h2 className="text-lg font-bold text-blue-700 mb-2">{veh.name || "N/A"}</h2>
//                             <p><strong>Number Plate:</strong> {veh.numberPlate}</p>
//                             <p><strong>Mobile Number:</strong> {veh.mobileNumber || "N/A"}</p>
//                             <p><strong>Vehicle Type:</strong> {veh.vehicleType || "-"}</p>
//                             <p><strong>Entry Time:</strong> {formatDate(veh.entryTime)}</p>
//                             <p><strong>Exit Time:</strong> {formatDate(veh.exitTime)}</p>
//                             <p><strong>Days Parked:</strong> {veh.daysParked || "-"}</p>
//                             <p><strong>Total Amount:</strong> {veh.totalAmount || "-"}</p>
//                           </div>
//                         ))}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }







// import React, { useState, useEffect } from "react";
// import Navbar from "../pages/Navbar";
// import bg from "../assets/bg.jpg";

// const API_BASE = "http://localhost:4000/api";

// export default function VehicleList() {
//   const [tab, setTab] = useState("current");
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchPlate, setSearchPlate] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [filterDate, setFilterDate] = useState("");

//   useEffect(() => {
//     setError(null);
//     setSearchResult([]);
//     setFilterDate("");
//     if (tab === "current") fetchCurrentParked();
//     else if (tab === "exited") fetchExitedVehicles();
//     else if (tab === "history") fetchAllVehicleHistory();
//   }, [tab]);

//   async function fetchCurrentParked() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/getpark`);
//       if (!res.ok) throw new Error("Failed to fetch current parked vehicles");
//       const data = await res.json();
//       data.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime)); // Sort by latest first
//       setVehicles(data);
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   async function fetchExitedVehicles() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/getexit`);
//       if (!res.ok) throw new Error("Failed to fetch exited vehicles");
//       const data = await res.json();
//       data.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime));
//       setVehicles(data);
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   async function fetchAllVehicleHistory() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/vehicleHistory`);
//       if (!res.ok) throw new Error("Failed to fetch vehicle history");
//       const data = await res.json();
//       data.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime));
//       setVehicles(data);
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   async function handleSearch(e) {
//     e.preventDefault();
//     if (!searchPlate.trim()) {
//       setError("Please enter a number plate");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setSearchResult([]);
//     try {
//       const res = await fetch(`${API_BASE}/getvehicle/${encodeURIComponent(searchPlate.trim())}`);
//       if (res.status === 404) {
//         setError("No parking history found for this number plate");
//         setSearchResult([]);
//       } else if (!res.ok) {
//         throw new Error("Failed to fetch vehicle history");
//       } else {
//         const data = await res.json();
//         setSearchResult(data.length ? data : [data]);
//       }
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   function formatDate(dateStr) {
//     if (!dateStr) return "-";
//     const d = new Date(dateStr);
//     return d.toLocaleString();
//   }

//   return (
//     <>
//       <Navbar />
//       <div
//         className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${bg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="backdrop-blur-sm bg-white/20 min-h-screen w-full">
//           <div className="max-w-6xl mx-auto p-4">
//             {/* Sticky Header */}
//             <div className="sticky top-0 z-10 bg-white/30 backdrop-blur-md p-4 rounded shadow mb-4">
//               <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
//                 Vehicle List Details
//               </h1>

//               {/* Tabs */}
//               <div className="flex flex-wrap justify-center gap-3 mb-4">
//                 {["current", "exited", "search", "history"].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => setTab(type)}
//                     className={`px-4 py-2 rounded-md font-semibold transition ${
//                       tab === type
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-200 text-gray-700 hover:bg-blue-300"
//                     }`}
//                   >
//                     {type === "current" && "Current Parked"}
//                     {type === "exited" && "Exited Vehicles"}
//                     {type === "search" && "Search History"}
//                     {type === "history" && "All History"}
//                   </button>
//                 ))}
//               </div>

//               {/* Date Filter */}
//               {(tab === "current" || tab === "exited" || tab === "history") && (
//                 <div className="flex justify-center items-center">
//                   <label className="mr-2 font-medium text-gray-800">Filter by Date:</label>
//                   <input
//                     type="date"
//                     value={filterDate}
//                     onChange={(e) => setFilterDate(e.target.value)}
//                     className="border border-gray-300 rounded px-3 py-1 text-sm"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Scrollable content area */}
//             <div className="h-[calc(100vh-240px)] overflow-y-auto px-1 pb-4">
//               {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
//               {loading && <div className="text-center text-gray-600 font-medium">Loading...</div>}

//               {/* Search */}
//               {tab === "search" && (
//                 <div className="max-w-md mx-auto mb-6">
//                   <form onSubmit={handleSearch} className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Enter number plate"
//                       className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={searchPlate}
//                       onChange={(e) => setSearchPlate(e.target.value)}
//                     />
//                     <button
//                       type="submit"
//                       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     >
//                       Search
//                     </button>
//                   </form>
//                 </div>
//               )}

//               {/* Search Results */}
//               {searchResult.length > 0 && (
//                 <div className="max-h-[400px] overflow-y-auto mb-8">
//                   {searchResult.map((veh, idx) => (
//                     <div
//                       key={idx}
//                       className="bg-white border border-gray-300 rounded-lg shadow-md p-5 mb-4"
//                     >
//                       <h2 className="text-xl font-bold text-blue-700 mb-2">{veh.name || "N/A"}</h2>
//                       <p><strong>Vehicle Type:</strong> {veh.vehicleType || "N/A"}</p>
//                       <p><strong>Number Plate:</strong> {veh.numberPlate || "N/A"}</p>
//                       <p><strong>Mobile Number:</strong> {veh.mobileNumber || "N/A"}</p>
//                       <p><strong>Entry Time:</strong> {formatDate(veh.entryTime)}</p>
//                       <p><strong>Exit Time:</strong> {formatDate(veh.exitTime)}</p>
//                       <p><strong>Days Parked:</strong> {veh.daysParked || "-"}</p>
//                       <p><strong>Total Amount:</strong> {veh.totalAmount || "-"}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Vehicle Cards */}
//               {(tab === "current" || tab === "exited" || tab === "history") && (
//                 <>
//                   {vehicles.length === 0 && !loading && (
//                     <p className="text-center text-gray-500 mt-10">No vehicles found.</p>
//                   )}
//                   {vehicles.length > 0 && (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {vehicles
//                         .filter((veh) => {
//                           if (!filterDate) return true;
//                           const entryDate = veh.entryTime
//                             ? new Date(veh.entryTime).toISOString().split("T")[0]
//                             : "";
//                           const exitDate = veh.exitTime
//                             ? new Date(veh.exitTime).toISOString().split("T")[0]
//                             : "";
//                           return entryDate === filterDate || exitDate === filterDate;
//                         })
//                         .map((veh) => (
//                           <div
//                             key={veh._id}
//                             className="bg-white/80 border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg transition"
//                           >
//                             <h2 className="text-lg font-bold text-blue-700 mb-2">{veh.name || "N/A"}</h2>
//                             <p><strong>Number Plate:</strong> {veh.numberPlate}</p>
//                             <p><strong>Mobile Number:</strong> {veh.mobileNumber || "N/A"}</p>
//                             <p><strong>Vehicle Type:</strong> {veh.vehicleType || "-"}</p>
//                             <p><strong>Entry Time:</strong> {formatDate(veh.entryTime)}</p>
//                             <p><strong>Exit Time:</strong> {formatDate(veh.exitTime)}</p>
//                             <p><strong>Days Parked:</strong> {veh.daysParked || "-"}</p>
//                             <p><strong>Total Amount:</strong> {veh.totalAmount || "-"}</p>
//                           </div>
//                         ))}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }






// import React, { useState, useEffect } from "react";
// import Navbar from "../pages/Navbar";
// import bg from "../assets/bg.jpg";

// const API_BASE = "http://localhost:4000/api"; // ✅ As requested

// export default function VehicleList() {
//   const [tab, setTab] = useState("current");
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchPlate, setSearchPlate] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [filterDate, setFilterDate] = useState("");

//   useEffect(() => {
//     setError(null);
//     setSearchResult([]);
//     setFilterDate("");
//     if (tab === "current") fetchCurrentParked();
//     else if (tab === "exited") fetchExitedVehicles();
//     else if (tab === "history") fetchAllVehicleHistory();
//   }, [tab]);

//   async function fetchCurrentParked() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/getpark`);
//       if (!res.ok) throw new Error("Failed to fetch current parked vehicles");
//       const data = await res.json();
//       data.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime));
//       setVehicles(data);
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   async function fetchExitedVehicles() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/getexit`);
//       if (!res.ok) throw new Error("Failed to fetch exited vehicles");
//       const data = await res.json();
//       data.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime));
//       setVehicles(data);
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   async function fetchAllVehicleHistory() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/vehicleHistory`);
//       if (!res.ok) throw new Error("Failed to fetch vehicle history");
//       const data = await res.json();
//       data.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime));
//       setVehicles(data);
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   async function handleSearch(e) {
//     e.preventDefault();
//     if (!searchPlate.trim()) {
//       setError("Please enter a number plate");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setSearchResult([]);
//     try {
//       const res = await fetch(`${API_BASE}/getvehicle/${encodeURIComponent(searchPlate.trim())}`);
//       if (res.status === 404) {
//         setError("No parking history found for this number plate");
//         setSearchResult([]);
//       } else if (!res.ok) {
//         throw new Error("Failed to fetch vehicle history");
//       } else {
//         const data = await res.json();
//         setSearchResult(data.length ? data : [data]);
//       }
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   function formatDate(dateStr) {
//     if (!dateStr) return "-";
//     const d = new Date(dateStr);
//     return d.toLocaleString();
//   }

//   return (
//     <>
//       <Navbar />
//       <div
//         className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${bg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="backdrop-blur-sm bg-white/20 min-h-screen w-full">
//           <div className="max-w-6xl mx-auto p-4">
//             <div className="sticky top-0 z-10 bg-white/30 backdrop-blur-md p-4 rounded shadow mb-4">
//               <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
//                 Vehicle List Details
//               </h1>

//               {/* ✅ Tab Buttons */}
//               <div className="flex flex-wrap justify-center gap-3 mb-4">
//                 {["current", "exited", "search", "history"].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => setTab(type)}
//                     className={`px-4 py-2 rounded-md font-semibold transition ${
//                       tab === type
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-200 text-gray-700 hover:bg-blue-300"
//                     }`}
//                   >
//                     {type === "current" && "Current Parked"}
//                     {type === "exited" && "Exited Vehicles"}
//                     {type === "search" && "Search History"}
//                     {type === "history" && "All History"}
//                   </button>
//                 ))}
//               </div>

//               {/* Date Filter */}
//               {(tab === "current" || tab === "exited" || tab === "history") && (
//                 <div className="flex justify-center items-center">
//                   <label className="mr-2 font-medium text-gray-800">Filter by Date:</label>
//                   <input
//                     type="date"
//                     value={filterDate}
//                     onChange={(e) => setFilterDate(e.target.value)}
//                     className="border border-gray-300 rounded px-3 py-1 text-sm"
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="h-[calc(100vh-240px)] overflow-y-auto px-1 pb-4">
//               {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
//               {loading && <div className="text-center text-gray-600 font-medium">Loading...</div>}

//               {/* Search Tab */}
//               {tab === "search" && (
//                 <div className="max-w-md mx-auto mb-6">
//                   <form onSubmit={handleSearch} className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Enter number plate"
//                       className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={searchPlate}
//                       onChange={(e) => setSearchPlate(e.target.value)}
//                     />
//                     <button
//                       type="submit"
//                       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     >
//                       Search
//                     </button>
//                   </form>
//                 </div>
//               )}

//               {/* Search Result */}
//               {searchResult.length > 0 && (
//                 <div className="max-h-[400px] overflow-y-auto mb-8">
//                   {searchResult.map((veh, idx) => (
//                     <div
//                       key={idx}
//                       className="bg-white border border-gray-300 rounded-lg shadow-md p-5 mb-4"
//                     >
//                       <h2 className="text-xl font-bold text-blue-700 mb-2">{veh.name || "N/A"}</h2>
//                       <p><strong>Vehicle Type:</strong> {veh.vehicleType || "N/A"}</p>
//                       <p><strong>Number Plate:</strong> {veh.numberPlate || "N/A"}</p>
//                       <p><strong>Mobile Number:</strong> {veh.mobileNumber || "N/A"}</p>
//                       <p><strong>Entry Time:</strong> {formatDate(veh.entryTime)}</p>
//                       <p><strong>Exit Time:</strong> {formatDate(veh.exitTime)}</p>
//                       <p><strong>Days Parked:</strong> {veh.daysParked || "-"}</p>
//                       <p><strong>Total Amount:</strong> {veh.totalAmount || "-"}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Vehicle List for Current/Exited/History */}
//               {(tab === "current" || tab === "exited" || tab === "history") && (
//                 <>
//                   {vehicles.length === 0 && !loading && (
//                     <p className="text-center text-gray-500 mt-10">No vehicles found.</p>
//                   )}
//                   {vehicles.length > 0 && (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {vehicles
//                         .filter((veh) => {
//                           if (!filterDate) return true;
//                           const entryDate = veh.entryTime
//                             ? new Date(veh.entryTime).toISOString().split("T")[0]
//                             : "";
//                           const exitDate = veh.exitTime
//                             ? new Date(veh.exitTime).toISOString().split("T")[0]
//                             : "";
//                           return entryDate === filterDate || exitDate === filterDate;
//                         })
//                         .map((veh) => (
//                           <div
//                             key={veh._id}
//                             className="bg-white/80 border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg transition"
//                           >
//                             <h2 className="text-lg font-bold text-blue-700 mb-2">{veh.name || "N/A"}</h2>
//                             <p><strong>Number Plate:</strong> {veh.numberPlate}</p>
//                             <p><strong>Mobile Number:</strong> {veh.mobileNumber || "N/A"}</p>
//                             <p><strong>Vehicle Type:</strong> {veh.vehicleType || "-"}</p>
//                             <p><strong>Entry Time:</strong> {formatDate(veh.entryTime)}</p>
//                             <p><strong>Exit Time:</strong> {formatDate(veh.exitTime)}</p>
//                             <p><strong>Days Parked:</strong> {veh.daysParked || "-"}</p>
//                             <p><strong>Total Amount:</strong> {veh.totalAmount || "-"}</p>
//                           </div>
//                         ))}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }












import React, { useState, useEffect } from "react";
import Navbar from "../pages/Navbar";
import bg from "../assets/bg.jpg";



export default function VehicleList() {
  const [tab, setTab] = useState("current");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPlate, setSearchPlate] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    setError(null);
    setSearchResult([]);
    setFilterDate("");
    if (tab === "current") fetchCurrentParked();
    else if (tab === "exited") fetchExitedVehicles();
    else if (tab === "history") fetchAllVehicleHistory();
  }, [tab]);

  async function fetchCurrentParked() {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/getpark`);
      if (!res.ok) throw new Error("Failed to fetch current parked vehicles");
      const data = await res.json();
      data.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime));
      setVehicles(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  async function fetchExitedVehicles() {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/getexit`);
      if (!res.ok) throw new Error("Failed to fetch exited vehicles");
      const data = await res.json();
      data.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime));
      setVehicles(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  async function fetchAllVehicleHistory() {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/vehicleHistory`);
      if (!res.ok) throw new Error("Failed to fetch vehicle history");
      const data = await res.json();
      data.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime));
      setVehicles(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchPlate.trim()) {
      setError("Please enter a number plate");
      return;
    }
    setLoading(true);
    setError(null);
    setSearchResult([]);
    try {
      const res = await fetch(`http://localhost:4000/api/getvehicle/${encodeURIComponent(searchPlate.trim())}`);
      if (res.status === 404) {
        setError("No parking history found for this number plate");
        setSearchResult([]);
      } else if (!res.ok) {
        throw new Error("Failed to fetch vehicle history");
      } else {
        const data = await res.json();
        setSearchResult(data.length ? data : [data]);
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  function formatDate(dateStr) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleString();
  }

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="backdrop-blur-sm bg-white/20 min-h-screen w-full">
          <div className="max-w-6xl mx-auto p-4">
            <div className="sticky top-0 z-10 bg-white/30 backdrop-blur-md p-4 rounded shadow mb-4">
              <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
                Vehicle List Details
              </h1>

              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {["current", "exited", "search", "history"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTab(type)}
                    className={`px-4 py-2 rounded-md font-semibold transition ${
                      tab === type
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-blue-300"
                    }`}
                  >
                    {type === "current" && "Current Parked"}
                    {type === "exited" && "Exited Vehicles"}
                    {type === "search" && "Search History"}
                    {type === "history" && "All History"}
                  </button>
                ))}
              </div>

              {(tab === "current" || tab === "exited" || tab === "history") && (
                <div className="flex justify-center items-center">
                  <label className="mr-2 font-medium text-gray-800">Filter by Date:</label>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                  />
                </div>
              )}
            </div>

            <div className="h-[calc(100vh-240px)] overflow-y-auto px-1 pb-4">
              {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
              {loading && <div className="text-center text-gray-600 font-medium">Loading...</div>}

              {tab === "search" && (
                <div className="max-w-md mx-auto mb-6">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter number plate"
                      className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchPlate}
                      onChange={(e) => setSearchPlate(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Search
                    </button>
                  </form>
                </div>
              )}

              {searchResult.length > 0 && (
                <div className="max-h-[400px] overflow-y-auto mb-8">
                  {searchResult.map((veh, idx) => (
                    <div
                      key={idx}
                      className="bg-white text-gray-900 border border-gray-300 rounded-lg shadow-md p-5 mb-4 relative"
                    >
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${
                          veh.exitTime
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {veh.exitTime ? "Exited" : "Parked"}
                      </div>
                      <h2 className="text-xl font-bold mb-2">{veh.name || "N/A"}</h2>
                      <p><strong>Vehicle Type:</strong> {veh.vehicleType || "N/A"}</p>
                      <p><strong>Number Plate:</strong> {veh.numberPlate || "N/A"}</p>
                      <p><strong>Mobile Number:</strong> {veh.mobileNumber || "N/A"}</p>
                      <p><strong>Entry Time:</strong> {formatDate(veh.entryTime)}</p>
                      <p><strong>Exit Time:</strong> {formatDate(veh.exitTime)}</p>
                      <p><strong>Days Parked:</strong> {veh.daysParked || "-"}</p>
                      <p><strong>Total Amount:</strong> {veh.totalAmount || "-"}</p>
                    </div>
                  ))}
                </div>
              )}

              {(tab === "current" || tab === "exited" || tab === "history") && (
                <>
                  {vehicles.length === 0 && !loading && (
                    <p className="text-center text-gray-500 mt-10">No vehicles found.</p>
                  )}
                  {vehicles.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {vehicles
                        .filter((veh) => {
                          if (!filterDate) return true;
                          const entryDate = veh.entryTime
                            ? new Date(veh.entryTime).toISOString().split("T")[0]
                            : "";
                          const exitDate = veh.exitTime
                            ? new Date(veh.exitTime).toISOString().split("T")[0]
                            : "";
                          return entryDate === filterDate || exitDate === filterDate;
                        })
                        .map((veh) => (
                          <div
                            key={veh._id}
                            className="relative rounded-lg shadow-md p-5 border border-gray-300 bg-white text-gray-900"
                          >
                            <div
                              className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${
                                (tab === "current" || (!veh.exitTime && tab === "history"))
                                  ? "bg-green-600 text-white"
                                  : "bg-red-600 text-white"
                              }`}
                            >
                              {(tab === "current" || (!veh.exitTime && tab === "history"))
                                ? "Parked"
                                : "Exited"}
                            </div>
                            <h2 className="text-lg font-bold mb-2">{veh.name || "N/A"}</h2>
                            <p><strong>Number Plate:</strong> {veh.numberPlate}</p>
                            <p><strong>Mobile Number:</strong> {veh.mobileNumber || "N/A"}</p>
                            <p><strong>Vehicle Type:</strong> {veh.vehicleType || "-"}</p>
                            <p><strong>Entry Time:</strong> {formatDate(veh.entryTime)}</p>
                            <p><strong>Exit Time:</strong> {formatDate(veh.exitTime)}</p>
                            <p><strong>Days Parked:</strong> {veh.daysParked || "-"}</p>
                            <p><strong>Total Amount:</strong> {veh.totalAmount || "-"}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
