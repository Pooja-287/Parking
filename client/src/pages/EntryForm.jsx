



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../pages/Navbar";
// import { toast, ToastContainer} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import bg from "../assets/bg.jpg";

// function EntryForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     vehicleType: "",
//     numberPlate: "",
//     mobileNumber: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token"); // 🔐 fetch token stored after login

//     try {
//       const res = await fetch("http://localhost:4000/api/park", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // ✅ token added here
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success(data.message || "Vehicle parked successfully!");
//         setFormData({
//           name: "",
//           vehicleType: "",
//           numberPlate: "",
//           mobileNumber: "",
//         });
//       } else {
//         toast.error(data.message || "Failed to park vehicle.");
//       }
//     } catch (err) {
//       toast.error("❌ Failed to park vehicle.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div
//         className="min-h-screen flex bg-white/20 backdrop-blur-md items-center justify-center px-4 py-10 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${bg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-lg bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 text-white border border-gray-400/30"
//         >
//           <h2 className="text-3xl font-extrabold text-center mb-4 drop-shadow-lg">
//             Park Your Vehicle
//           </h2>

//           <input
//             type="text"
//             name="name"
//             placeholder="Owner Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-gray-600 bg-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//           />

//           <select
//             name="vehicleType"
//             onChange={handleChange}
//             value={formData.vehicleType}
//             className="w-full p-3 rounded-md bg-gray-800 bg-opacity-30 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
//             required
//           >
//             <option value="">Choose Vehicle</option>
//             <option value="bike">🛵 Bike</option>
//             <option value="car">🚗 Car</option>
//             <option value="cycle">🚲 Cycle</option>
//           </select>

//           <input
//             type="text"
//             name="numberPlate"
//             placeholder="Number Plate"
//             required
//             value={formData.numberPlate}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-gray-600 bg-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//           />

//           <input
//             type="text"
//             name="mobileNumber"
//             placeholder="Mobile Number"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-gray-600 bg-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//           />

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="w-32 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//   <ToastContainer
//     position="top-right"
//     autoClose={3000}               
//     hideProgressBar={false}
//     pauseOnHover
//     theme="colored"
//     style={{ marginLeft: "20px" }}  
//   />
//     </>
//   );
// }

// export default EntryForm;










// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../pages/Navbar";
// import bg from "../assets/bg.jpg";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // ✅ RTO codes map
// const validRTOs = {
//   TN: ["01", "02", "03", "04", "05", "06", "07", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "28", "29", "30", "31", "32", "33", "34", "37", "38"],
//   KA: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
//   KL: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"],
//   AP: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26"],
//   TS: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33"],
// };

// function validateNumberPlateFormat(numberPlate) {
//   const newFormat = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/; // TN23AB1234
//   const oldFormat = /^[A-Z]{2}\d{6}$/;              // TN231234
//   if (newFormat.test(numberPlate)) return "new";
//   if (oldFormat.test(numberPlate)) return "old";
//   return null;
// }

// function EntryForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     vehicleType: "",
//     numberPlate: "",
//     mobileNumber: "",
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const validateInputs = () => {
//     const newErrors = {};
//     const plate = formData.numberPlate.replace(/\s/g, "").toUpperCase();
//     const formatType = validateNumberPlateFormat(plate);

//     if (!formData.name.trim()) newErrors.name = "Name is required.";
//     if (!formData.vehicleType) newErrors.vehicleType = "Select a vehicle type.";
//     if (!formatType) newErrors.numberPlate = "Invalid plate format (e.g. TN23AB1234 or TN231234).";

//     const state = plate.slice(0, 2);
//     const district = plate.slice(2, 4);
//     if (formatType && (!validRTOs[state] || !validRTOs[state].includes(district))) {
//       newErrors.numberPlate = "Invalid state/district RTO code.";
//     }

//     if (!/^\d{10}$/.test(formData.mobileNumber)) {
//       newErrors.mobileNumber = "Mobile number must be exactly 10 digits.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateInputs()) return;

//     const token = localStorage.getItem("token");
//     const plate = formData.numberPlate.replace(/\s/g, "").toUpperCase();

//     try {
//       const res = await fetch("http://localhost:4000/api/park", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ ...formData, numberPlate: plate }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success(" Vehicle parked successfully!", {
//           position: "top-right",
//           autoClose: 5000, // 🕔 stays for 5 seconds
//         });
//         setFormData({
//           name: "",
//           vehicleType: "",
//           numberPlate: "",
//           mobileNumber: "",
//         });
//       } else {
//         toast.error(data.message || "Failed to park vehicle", {
//           position: "top-right",
//           autoClose: 2000, // 🕔 stays for 5 seconds
//         });
//       }
//     } catch (err) {
//       toast.error(" Server error. Try again later.", {
//         position: "top-right",
//         autoClose: 5000, // 🕔 stays for 5 seconds
//       });
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       {/* <ToastContainer /> */}
//       <div
//         className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${bg})`,
//         }}
//       >
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-lg bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 text-white border border-gray-400/30"
//         >
//           <h2 className="text-3xl font-extrabold text-center mb-4">Park Your Vehicle</h2>

//           <div>
//             <input
//               type="text"
//               name="name"
//               placeholder="Owner Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-3 rounded-md bg-gray-600 bg-opacity-30 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
//           </div>

//           <div>
//             <select
//               name="vehicleType"
//               value={formData.vehicleType}
//               onChange={handleChange}
//               className="w-full p-3 rounded-md bg-gray-800 bg-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="">Choose Vehicle</option>
//               <option value="bike">🛵 Bike</option>
//               <option value="car">🚗 Car</option>
//               <option value="cycle">🚲 Cycle</option>
//             </select>
//             {errors.vehicleType && <p className="text-red-400 text-sm mt-1">{errors.vehicleType}</p>}
//           </div>

//           <div>
//             <input
//               type="text"
//               name="numberPlate"
//               placeholder="Number Plate"
//               value={formData.numberPlate}
//               onChange={handleChange}
//               className="w-full p-3 rounded-md bg-gray-600 bg-opacity-30 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.numberPlate && <p className="text-red-400 text-sm mt-1">{errors.numberPlate}</p>}
//           </div>

//           <div>
//             <input
//               type="text"
//               name="mobileNumber"
//               placeholder="Mobile Number"
//               value={formData.mobileNumber}
//               onChange={handleChange}
//               className="w-full p-3 rounded-md bg-gray-600 bg-opacity-30 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//               maxLength="10"
//             />
//             {errors.mobileNumber && <p className="text-red-400 text-sm mt-1">{errors.mobileNumber}</p>}
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="w-32 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-md transition hover:scale-105"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default EntryForm;













import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";
import bg from "../assets/bg.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EntryForm() {
  const [formData, setFormData] = useState({
    name: "",
    vehicleType: "",
    numberPlate: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateInputs = () => {
    const newErrors = {};
    const plate = formData.numberPlate.replace(/\s/g, "").toUpperCase();

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.vehicleType) newErrors.vehicleType = "Select a vehicle type.";
    if (!plate) newErrors.numberPlate = "Number plate is required.";

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const token = localStorage.getItem("token");
    const plate = formData.numberPlate.replace(/\s/g, "").toUpperCase();

    try {
      const res = await fetch("http://localhost:4000/api/park", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, numberPlate: plate }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Vehicle parked successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setFormData({
          name: "",
          vehicleType: "",
          numberPlate: "",
          mobileNumber: "",
        });
      } else {
        toast.error(data.message || "Failed to park vehicle", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error("Server error. Try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 text-white border border-gray-400/30"
        >
          <h2 className="text-3xl font-extrabold text-center mb-4">Park Your Vehicle</h2>

          <div>
            <input
              type="text"
              name="name"
              placeholder="Owner Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-600 bg-opacity-30 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 bg-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Choose Vehicle</option>
              <option value="bike">🛵 Bike</option>
              <option value="car">🚗 Car</option>
              <option value="cycle">🚲 Cycle</option>
            </select>
            {errors.vehicleType && <p className="text-red-400 text-sm mt-1">{errors.vehicleType}</p>}
          </div>

          <div>
            <input
              type="text"
              name="numberPlate"
              placeholder="Number Plate"
              value={formData.numberPlate}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-600 bg-opacity-30 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.numberPlate && <p className="text-red-400 text-sm mt-1">{errors.numberPlate}</p>}
          </div>

          <div>
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-600 bg-opacity-30 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              maxLength="10"
            />
            {errors.mobileNumber && <p className="text-red-400 text-sm mt-1">{errors.mobileNumber}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-32 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-md transition hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EntryForm;
