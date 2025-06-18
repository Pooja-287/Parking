



// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import bg from "../assets/bg.jpg";




// const VehicleInfo = ({ data, exited }) => {
//   if (!data) return null;

//   const priceType = data.priceType || data.rateType || "-";
//   const unitPrice = data.unitPrice || data.unitprice || 0;
//   const totalAmount = data.totalAmount?.replace("₹", "") || "0.00";

//   // ✅ Convert decimal parked hours to hh:mm:ss
//   const formatParkedTime = (decimalHours) => {
//     if (!decimalHours || isNaN(decimalHours)) return "-";
//     const totalSeconds = Math.floor(decimalHours * 3600);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     return `${hours}h ${minutes}m ${seconds}s`;
//   };

//   return (
//     <div className="mt-6 bg-white p-5 rounded shadow max-w-md mx-auto text-black">
//       {exited ? (
//         <p className="text-green-700 font-bold text-center mb-4">
//            Vehicle exited successfully
//         </p>
//       ) : (
//         <p className="text-blue-600 font-semibold text-center mb-4">
//           Vehicle data loaded — not yet exited
//         </p>
//       )}

//       <p><strong>Name:</strong> {data.name || "-"}</p>
//       <p><strong>Status:</strong> {exited ? "Exited" : "Parked"}</p>
//       <p><strong>Vehicle Type:</strong> {data.vehicleType || "-"}</p>
//       <p><strong>Plate:</strong> {data.numberPlate || "-"}</p>
//       <p><strong>Mobile:</strong> {data.mobileNumber || "-"}</p>
//       <p><strong>Entry Time:</strong> {data.entryTimeIST || "-"}</p>
//       <p><strong>Exit Time:</strong> {data.exitTimeIST || "-"}</p>
//       <p><strong>Parked Time:</strong> {formatParkedTime(data.totalParkedHours)}</p>
//       <p><strong>Price Type:</strong> {priceType}</p>
//       <p><strong>Unit Price:</strong> ₹{unitPrice}</p>

//       <p className="text-red-700 font-bold text-lg mt-3">
//         <strong>Total Fee:</strong> ₹{totalAmount}
//       </p>

//       {/* {exited && (
//         <div className="text-center mt-4">
//           <button
//             onClick={() => window.print()}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
//           >
//             🧾 Print Bill
//           </button>
//         </div>
//       )} */}
//     </div>
//   );
// };


// const ExitVehicleForm = () => {
//   const [numberPlate, setNumberPlate] = useState("");
//   const [vehicleData, setVehicleData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [exited, setExited] = useState(false);
//   const [error, setError] = useState("");
//   const [priceDetails, setPriceDetails] = useState([]);

//   const navigate = useNavigate();

//   // 🔽 Fetch vehicle data when plate number changes
//   useEffect(() => {
//     if (!numberPlate) {
//       setVehicleData(null);
//       setExited(false);
//       setError("");
//       return;
//     }

//     const fetchVehicle = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         setExited(false);
//         const userId = localStorage.getItem("userid");

//         const response = await fetch(
//           `http://localhost:4000/api/vehicle/${userId}?vehicleNo=${numberPlate}`
//         );
//         const data = await response.json();

//         if (!response.ok) {
//           setVehicleData(null);
//           setError(data.message || "Vehicle not found");
//         } else {
//           setVehicleData(data);
//         }
//       } catch {
//         setError("Failed to fetch vehicle data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicle();
//   }, [numberPlate]);

//   // 🔽 Fetch price details on component load
//   useEffect(() => {
//     const fetchPrice = async () => {
//       try {
//         const userId = localStorage.getItem("userid");
//         const res = await fetch(`http://localhost:4000/api/getprices/${userId}`);
//         const result = await res.json();
//         setPriceDetails(result.prices);
//       } catch (err) {
//         console.error("Failed to load price:", err);
//       }
//     };
//     fetchPrice();
//   }, []);

//   // 🔽 Handle Exit button click
//   const handleExit = async (e) => {
//     e.preventDefault();
//     if (!numberPlate) return;

//     const token = localStorage.getItem("token");

//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch("http://localhost:4000/api/exit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({ numberPlate }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Failed to exit vehicle");
//       } else {
//         setVehicleData(data);
//         setExited(true);
//         toast.success("✅ Vehicle exited successfully");

//         setTimeout(() => {
//           navigate("/billreceipt", { state: { data } });
//         }, 3000);
//       }
//     } catch (err) {
//       setError("Network error during exit");
//     } finally {
//       setLoading(false);
//     }
//   };

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
//         <div className="bg-white/20 p-6 rounded shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-4">Exit Vehicle</h2>

//           <form onSubmit={handleExit} className="space-y-4">
//             <div className="flex justify-center">
//               <input
//                 type="text"
//                 placeholder="Enter Number Plate"
//                 value={numberPlate}
//                 onChange={(e) => {
//                   setNumberPlate(e.target.value.toUpperCase());
//                   setError("");
//                   setExited(false);
//                 }}
//                 className="w-56 border p-2 rounded"
//                 required
//               />
//             </div>
//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="w-32 bg-red-600 text-white py-2 rounded hover:bg-red-700"
//                 disabled={loading || !vehicleData}
//               >
//                 {loading ? "Processing..." : "Exit Vehicle"}
//               </button>
//             </div>
//           </form>

//           {error && (
//             <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
//           )}

//           {/* 🔽 Price info display */}
//           {priceDetails.length > 0 && (
//             <div className="bg-white p-3 mt-4 rounded shadow text-black">
//               <h3 className="font-bold text-center mb-2 text-lg text-gray-700">💰 Parking Rates</h3>
//               {priceDetails.map((item, idx) => (
//                 <p key={idx} className="text-sm text-gray-800">
//                   • <strong>{item.priceType.toUpperCase()}:</strong> ₹{item.price}
//                 </p>
//               ))}
//             </div>
//           )}

//           <VehicleInfo data={vehicleData} exited={exited} />
//         </div>
//       </div>

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme="colored"
//       />
//     </>
//   );
// };

// export default ExitVehicleForm;









import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "../assets/bg.jpg";

// ✅ Vehicle Info Sub-component
const VehicleInfo = ({ data, exited }) => {
  if (!data) return null;

  const priceType = data.priceType || data.rateType || "-";
  const unitPrice = data.unitPrice || data.unitprice || 0;
  const totalAmount = data.totalAmount?.replace("₹", "") || "0.00";

  return (
    <div className="mt-6 bg-white p-5 rounded shadow max-w-md mx-auto text-black">
      {exited ? (
        <p className="text-green-700 font-bold text-center mb-4">
          ✅ Vehicle exited successfully
        </p>
      ) : (
        <p className="text-blue-600 font-semibold text-center mb-4">
          Vehicle data loaded — not yet exited
        </p>
      )}

      <p><strong>Name:</strong> {data.name || "-"}</p>
      <p><strong>Status:</strong> {exited ? "Exited" : "Parked"}</p>
      <p><strong>Vehicle Type:</strong> {data.vehicleType || "-"}</p>
      <p><strong>Plate:</strong> {data.numberPlate || "-"}</p>
      <p><strong>Mobile:</strong> {data.mobileNumber || "-"}</p>
      <p><strong>Entry Time:</strong> {data.entryTimeIST || "-"}</p>
      <p><strong>Exit Time:</strong> {data.exitTimeIST || "-"}</p>
      <p><strong>Parked Time:</strong> {data.totalParkedHours || "-"}</p>
      <p><strong>Price Type:</strong> {priceType}</p>
      <p><strong>Unit Price:</strong> ₹{unitPrice}</p>

      <p className="text-red-700 font-bold text-lg mt-3">
        <strong>Total Fee:</strong> ₹{totalAmount}
      </p>

      {exited && (
        <div className="text-center mt-4">
          <button
            onClick={() => window.print()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            🧾 Print Bill
          </button>
        </div>
      )}
    </div>
  );
};

// ✅ Main ExitVehicleForm Component
const ExitVehicleForm = () => {
  const [numberPlate, setNumberPlate] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exited, setExited] = useState(false);
  const [error, setError] = useState("");
  const [priceDetails, setPriceDetails] = useState([]);
  const navigate = useNavigate();

  // 🔽 Fetch vehicle data when plate number changes
  useEffect(() => {
    if (!numberPlate) {
      setVehicleData(null);
      setExited(false);
      setError("");
      return;
    }

    const fetchVehicle = async () => {
      try {
        setLoading(true);
        setError("");
        setExited(false);
        const userId = localStorage.getItem("userid");

        const response = await fetch(
          `http://localhost:4000/api/vehicle/${userId}?vehicleNo=${numberPlate}`
        );
        const data = await response.json();

        if (!response.ok) {
          setVehicleData(null);
          setError(data.message || "Vehicle not found");
        } else {
          setVehicleData(data);
        }
      } catch {
        setError("Failed to fetch vehicle data");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [numberPlate]);

  // 🔽 Fetch price details on component load
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const userId = localStorage.getItem("userid");
        const res = await fetch(`http://localhost:4000/api/getprices/${userId}`);
        const result = await res.json();
        setPriceDetails(result.prices);
      } catch (err) {
        console.error("Failed to load price:", err);
      }
    };
    fetchPrice();
  }, []);

  // 🔽 Handle Exit button click
  const handleExit = async (e) => {
    e.preventDefault();
    if (!numberPlate) return;

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:4000/api/exit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ numberPlate }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to exit vehicle");
      } else {
        setVehicleData(data);
        setExited(true);
        toast.success("✅ Vehicle exited successfully");

        setTimeout(() => {
          navigate("/billreceipt", { state: { data } });
        }, 3000);
      }
    } catch (err) {
      setError("Network error during exit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/20 p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Exit Vehicle</h2>

          <form onSubmit={handleExit} className="space-y-4">
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Enter Number Plate"
                value={numberPlate}
                onChange={(e) => {
                  setNumberPlate(e.target.value.toUpperCase());
                  setError("");
                  setExited(false);
                }}
                className="w-56 border p-2 rounded"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-32 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                disabled={loading || !vehicleData}
              >
                {loading ? "Processing..." : "Exit Vehicle"}
              </button>
            </div>
          </form>

          {error && (
            <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
          )}

          {/* 🔽 Price info display */}
          {priceDetails.length > 0 && (
            <div className="bg-white p-3 mt-4 rounded shadow text-black">
              <h3 className="font-bold text-center mb-2 text-lg text-gray-700">
                💰 Parking Rates
              </h3>
              {priceDetails.map((item, idx) => (
                <p key={idx} className="text-sm text-gray-800">
                  • <strong>{item.priceType.toUpperCase()}:</strong> ₹{item.price}
                </p>
              ))}
            </div>
          )}

          <VehicleInfo data={vehicleData} exited={exited} />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default ExitVehicleForm;
