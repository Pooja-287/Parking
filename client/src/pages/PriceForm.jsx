

// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function PriceForm({ onClose }) {
//   const [priceType, setPriceType] = useState("per_hour");
//   const [price, setPrice] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//   const [prices, setPrices] = useState({});

//   const getNormalizedPriceType = (type) => {
//     return type === "per_day" ? "daily" : "hourly";
//   };

//   useEffect(() => {
//     async function fetchPrices() {
//       try {
//         const userId = localStorage.getItem("userid");
//         const response = await fetch(`http://localhost:4000/api/getprices/${userId}`);
//         if (response.ok) {
//           const data = await response.json();
//           if (data?.prices) {
//             setPrices(data);
//             setPrice(data.prices.price);
//             const uiPriceType = data.prices.priceType === "daily" ? "per_day" : "per_hour";
//             setPriceType(uiPriceType);
//           }
//         } else {
//           toast.error("Failed to fetch prices.");
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//         toast.error("Error while fetching prices.");
//       }
//     }

//     fetchPrices();
//   }, []);

//   const savePrices = async () => {
//     if (price === "") {
//       toast.warn("Please enter a price.");
//       return;
//     }

//     const bodyData = {
//       priceType: getNormalizedPriceType(priceType),
//       price: Number(price),
//     };

//     try {
//       setIsSaving(true);
//       const userId = localStorage.getItem("userid");
//       const isUpdate = prices?.prices && prices?.prices?._id;
//       const url = isUpdate
//         ? `http://localhost:4000/api/setPrices/${prices.prices._id}`
//         : `http://localhost:4000/api/prices/${userId}`;
//       const method = isUpdate ? "PUT" : "POST";

//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bodyData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message);
//         setPrices({ prices: { ...prices.prices, ...bodyData } });
//       } else {
//         toast.error(data.message || "Failed to save prices.");
//       }
//     } catch (error) {
//       console.error("Save error:", error);
//       toast.error("Something went wrong while saving prices.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
//         <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md">
//           <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
//             Add Price Details
//           </h2>
//           <form
//             className="space-y-5"
//             onSubmit={(e) => {
//               e.preventDefault();
//               savePrices();
//             }}
//           >
//             <div>
//               <label className="block text-gray-100 font-medium mb-1">Price Type</label>
//               <select
//                 value={priceType}
//                 onChange={(e) => setPriceType(e.target.value)}
//                 className="w-full border border-white/60 rounded-lg px-4 py-2 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//               >
//                 <option className="bg-white text-black" value="per_hour">Per Hour</option>
//                 <option className="bg-white text-black" value="per_day">Per Day</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-100 font-medium mb-1">Price</label>
//               <input
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 value={price}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (/^\d*\.?\d{0,2}$/.test(value)) {
//                     setPrice(value);
//                   }
//                 }}
//                 className="w-full border border-white/60 rounded-lg px-4 py-2 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 required
//               />
//             </div>
//             <div className="flex justify-end gap-3 pt-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 bg-white/30 text-white rounded-lg hover:bg-white/50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSaving}
//                 className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSaving ? "Saving..." : prices?.prices ? "Update Price" : "Set Price"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={2500} pauseOnHover />
//     </>
//   );
// }









import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PriceForm({ onClose }) {
  const [priceType, setPriceType] = useState("per_hour");
  const [prices, setPrices] = useState({ car: "", bike: "", cycle: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [priceData, setPriceData] = useState(null);

  const getNormalizedPriceType = (type) => (type === "per_day" ? "daily" : "hourly");

  useEffect(() => {
    async function fetchPrices() {
      try {
        const userId = localStorage.getItem("userid");
        const response = await fetch(`http://localhost:4000/api/getPrices/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (data?.prices) {
            setPriceData(data.prices);
            setPrices(data.prices.prices);
            const uiPriceType = data.prices.priceType === "daily" ? "per_day" : "per_hour";
            setPriceType(uiPriceType);
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch prices.");
      }
    }

    fetchPrices();
  }, []);

  const savePrices = async () => {
    if (!prices.car || !prices.bike || !prices.cycle) {
      toast.warn("Please enter prices for all vehicle types.");
      return;
    }

    const bodyData = {
      priceType: getNormalizedPriceType(priceType),
      prices: {
        car: Number(prices.car),
        bike: Number(prices.bike),
        cycle: Number(prices.cycle),
      },
    };

    try {
      setIsSaving(true);
      const userId = localStorage.getItem("userid");
      const isUpdate = priceData && priceData._id;
      const url = isUpdate
        ? `http://localhost:4000/api/setPrices/${priceData._id}`
        : `http://localhost:4000/api/prices/${userId}`;
      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setPriceData(result.prices || result.data);
      } else {
        toast.error(result.message || "Failed to save prices.");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Error while saving prices.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePriceChange = (field, value) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrices((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
            Add Price Details
          </h2>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              savePrices();
            }}
          >
            <div>
              <label className="block text-gray-100 font-medium mb-1">Price Type</label>
              <select
                value={priceType}
                onChange={(e) => setPriceType(e.target.value)}
                className="w-full border border-white/60 rounded-lg px-4 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option className="bg-white text-black" value="per_hour">
                  Per Hour
                </option>
                <option className="bg-white text-black" value="per_day">
                  Per Day
                </option>
              </select>
            </div>

            {["car", "bike", "cycle"].map((type) => (
              <div key={type}>
                <label className="block text-gray-100 font-medium mb-1 capitalize">
                  {type} Price
                </label>
                <input
                  type="number"
                  min="0"
                  value={prices[type]}
                  onChange={(e) => handlePriceChange(type, e.target.value)}
                  className="w-full border border-white/60 rounded-lg px-4 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            ))}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white/30 text-white rounded-lg hover:bg-white/50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : priceData ? "Update Price" : "Set Price"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2500} pauseOnHover />
    </>
  );
}
