



// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const BillReceipt = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { data, parkedData } = location.state || {};
//   const displayData = parkedData || data;

//   if (!displayData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <p className="text-red-600 font-bold text-xl">❌ No data to display</p>
//       </div>
//     );
//   }

//   const cleanedAmount = displayData.totalAmount
//     ? displayData.totalAmount.toString().replace(/[^\d.]/g, "")
//     : "0.00";

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6 print:bg-white">
//       <div className="bg-white shadow-lg rounded-md max-w-2xl w-full px-10 py-8 border print:shadow-none print:border-black">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-extrabold text-gray-800 mb-1">🅿️ PARKWISE</h1>
//           <p className="text-sm text-gray-500">Official Parking Bill Receipt</p>
//         </div>

//         <hr className="mb-6 border-gray-300" />

//         {/* Invoice Details Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm border border-gray-300">
//             <tbody>
//               <tr className="bg-gray-50">
//                 <td className="p-3 font-medium text-gray-600">Customer Name</td>
//                 <td className="p-3 text-gray-900">{displayData.name || "N/A"}</td>
//               </tr>
//               <tr>
//                 <td className="p-3 font-medium text-gray-600">Mobile Number</td>
//                 <td className="p-3">{displayData.mobileNumber || "N/A"}</td>
//               </tr>
//               <tr className="bg-gray-50">
//                 <td className="p-3 font-medium text-gray-600">Number Plate</td>
//                 <td className="p-3">{displayData.numberPlate}</td>
//               </tr>
//               <tr>
//                 <td className="p-3 font-medium text-gray-600">Vehicle Type</td>
//                 <td className="p-3">{displayData.vehicleType}</td>
//               </tr>
//               <tr className="bg-gray-50">
//                 <td className="p-3 font-medium text-gray-600">Entry Time</td>
//                 <td className="p-3">{displayData.entryTimeIST || "-"}</td>
//               </tr>
//               <tr>
//                 <td className="p-3 font-medium text-gray-600">Exit Time</td>
//                 <td className="p-3">{displayData.exitTimeIST || "-"}</td>
//               </tr>
//               <tr className="bg-gray-50">
//                 <td className="p-3 font-medium text-gray-600">Price Type</td>
//                 <td className="p-3 capitalize">{displayData.priceType || "-"}</td>
//               </tr>
//               <tr>
//                 <td className="p-3 font-medium text-gray-600">Unit Price</td>
//                 <td className="p-3">
//                   ₹
//                   {displayData.unitPrice ||
//                     displayData.pricePerHour ||
//                     displayData.pricePerDay ||
//                     "0"}
//                 </td>
//               </tr>
//               <tr className="bg-gray-50">
//                 <td className="p-3 font-medium text-gray-600">Duration</td>
//                 <td className="p-3">
//                   {displayData.totalParkedHours || "-"} 
//                 </td>
//               </tr>
//               <tr>
//                 <td className="p-3 text-xl font-bold text-red-700 bg-gray-100">Total Amount</td>
//                 <td className="p-3 text-xl font-extrabold text-red-700 bg-gray-100">
//                   ₹{cleanedAmount}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 print:hidden flex justify-between">
//           <button
//             onClick={() => navigate("/entry")}
//             className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
//           >
//             ⬅ Back to Entry
//           </button>

//           <button
//             onClick={handlePrint}
//             className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-800"
//           >
//             🖨️ Print
//           </button>
//         </div>

//         {/* Thank You Note */}
//         <div className="mt-6 text-center text-gray-500 text-sm print:mt-12">
//           Thank you for using Parkwise! Drive Safe 🚗
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BillReceipt;






// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaWhatsapp } from "react-icons/fa";

// const BillReceipt = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { data, parkedData } = location.state || {};
//   const displayData = parkedData || data;

//   if (!displayData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <p className="text-red-600 font-bold text-xl">❌ No data to display</p>
//       </div>
//     );
//   }

//   const cleanedAmount = displayData.totalAmount
//     ? displayData.totalAmount.toString().replace(/[^\d.]/g, "")
//     : "0.00";

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6 print:bg-white">
//       <div className="bg-white shadow-lg rounded-md max-w-2xl w-full px-10 py-8 border print:shadow-none print:border-black">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-extrabold text-gray-800 mb-1">🅿️ PARKWISE</h1>
//           <p className="text-sm text-gray-500">Official Parking Bill Receipt</p>
//         </div>

//         <hr className="mb-6 border-gray-300" />

//         {/* Invoice Details Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm border border-gray-300">
//             <tbody>
//               <tr className="bg-gray-50">
//                 <td className="p-3 font-medium text-gray-600">Customer Name</td>
//                 <td className="p-3 text-gray-900">{displayData.name || "N/A"}</td>
//               </tr>
//               <tr>
//                 <td className="p-3 font-medium text-gray-600">Mobile Number</td>
//                 <td className="p-3">{displayData.mobileNumber || "N/A"}</td>
//               </tr>
//               <tr className="bg-gray-50">
//                 <td className="p-3 font-medium text-gray-600">Number Plate</td>
//                 <td className="p-3">{displayData.numberPlate}</td>
//               </tr>
//               <tr>
//                 <td className="p-3 font-medium text-gray-600">Vehicle Type</td>
//                 <td className="p-3">{displayData.vehicleType}</td>
//               </tr>
//               <tr className="bg-gray-50">
//                 <td className="p-3 font-medium text-gray-600">Entry Time</td>
//                 <td className="p-3">{displayData.entryTimeIST || "-"}</td>
//               </tr>
//               <tr>
//                 <td className="p-3 font-medium text-gray-600">Exit Time</td>
//                 <td className="p-3">{displayData.exitTimeIST || "-"}</td>
//               </tr>
//               <tr className="bg-gray-50">
//                 <td className="p-3 font-medium text-gray-600">Price Type</td>
//                 <td className="p-3 capitalize">{displayData.priceType || "-"}</td>
//               </tr>
//               <tr>
//                 <td className="p-3 font-medium text-gray-600">Unit Price</td>
//                 <td className="p-3">
//                   ₹
//                   {displayData.unitPrice ||
//                     displayData.pricePerHour ||
//                     displayData.pricePerDay ||
//                     "0"}
//                 </td>
//               </tr>
//               <tr className="bg-gray-50">
//                 <td className="p-3 font-medium text-gray-600">Duration</td>
//                 <td className="p-3">
//                   {displayData.totalParkedHours || "-"} 
//                 </td>
//               </tr>
//               <tr>
//                 <td className="p-3 text-xl font-bold text-red-700 bg-gray-100">Total Amount</td>
//                 <td className="p-3 text-xl font-extrabold text-red-700 bg-gray-100">
//                   ₹{cleanedAmount}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Footer Buttons */}
//         <div className="mt-8 print:hidden flex flex-wrap justify-between items-center gap-4">
//           <button
//             onClick={() => navigate("/entry")}
//             className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
//           >
//             ⬅ Back to Entry
//           </button>

//           {displayData.mobileNumber && (
//             <a
//               href={`https://wa.me/91${displayData.mobileNumber}?text=Hello%2C%20your%20vehicle%20has%20been%20successfully%20parked%20at%20PARKWISE.%20Thank%20you!`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded hover:bg-green-700"
//             >
//               <FaWhatsapp />
//               WhatsApp
//             </a>
//           )}

//           <button
//             onClick={handlePrint}
//             className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-800"
//           >
//             🖨️ Print
//           </button>
//         </div>

//         {/* Thank You Note */}
//         <div className="mt-6 text-center text-gray-500 text-sm print:mt-12">
//           Thank you for using Parkwise! Drive Safe 🚗
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BillReceipt;






import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const BillReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, parkedData } = location.state || {};
  const displayData = parkedData || data;

  if (!displayData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-600 font-bold text-xl">❌ No data to display</p>
      </div>
    );
  }

  const cleanedAmount = displayData.totalAmount
    ? displayData.totalAmount.toString().replace(/[^\d.]/g, "")
    : "0.00";

  const handlePrint = () => {
    window.print();
  };

  // Construct WhatsApp message with full details
  const whatsappMessage = `
🅿️ *PARKWISE Parking Bill Receipt*

👤 *Customer Name:* ${displayData.name || "N/A"}
📱 *Mobile Number:* ${displayData.mobileNumber || "N/A"}
🚗 *Number Plate:* ${displayData.numberPlate || "N/A"}
🚘 *Vehicle Type:* ${displayData.vehicleType || "N/A"}
🕒 *Entry Time:* ${displayData.entryTimeIST || "-"}
🕔 *Exit Time:* ${displayData.exitTimeIST || "-"}
💳 *Price Type:* ${displayData.priceType || "-"}
💰 *Unit Price:* ₹${displayData.unitPrice || displayData.pricePerHour || displayData.pricePerDay || "0"}
⏱️ *Duration:* ${displayData.totalParkedHours || "-"}
📄 *Total Amount:* ₹${cleanedAmount}

🙏 Thank you for using Parkwise! Drive Safe 🚦
`.trim();

  const whatsappUrl = `https://wa.me/91${displayData.mobileNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6 print:bg-white">
      <div className="bg-white shadow-lg rounded-md max-w-2xl w-full px-10 py-8 border print:shadow-none print:border-black">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-1">🅿️ PARKWISE</h1>
          <p className="text-sm text-gray-500">Official Parking Bill Receipt</p>
        </div>

        <hr className="mb-6 border-gray-300" />

        {/* Invoice Details Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-gray-300">
            <tbody>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium text-gray-600">Customer Name</td>
                <td className="p-3 text-gray-900">{displayData.name || "N/A"}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-600">Mobile Number</td>
                <td className="p-3">{displayData.mobileNumber || "N/A"}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium text-gray-600">Number Plate</td>
                <td className="p-3">{displayData.numberPlate}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-600">Vehicle Type</td>
                <td className="p-3">{displayData.vehicleType}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium text-gray-600">Entry Time</td>
                <td className="p-3">{displayData.entryTimeIST || "-"}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-600">Exit Time</td>
                <td className="p-3">{displayData.exitTimeIST || "-"}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium text-gray-600">Price Type</td>
                <td className="p-3 capitalize">{displayData.priceType || "-"}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-600">Unit Price</td>
                <td className="p-3">
                  ₹
                  {displayData.unitPrice ||
                    displayData.pricePerHour ||
                    displayData.pricePerDay ||
                    "0"}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium text-gray-600">Duration</td>
                <td className="p-3">
                  {displayData.totalParkedHours || "-"} 
                </td>
              </tr>
              <tr>
                <td className="p-3 text-xl font-bold text-red-700 bg-gray-100">Total Amount</td>
                <td className="p-3 text-xl font-extrabold text-red-700 bg-gray-100">
                  ₹{cleanedAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 print:hidden flex flex-wrap justify-between items-center gap-4">
          <button
            onClick={() => navigate("/entry")}
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          >
            ⬅ Back to Entry
          </button>

          {displayData.mobileNumber && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
          )}

          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-800"
          >
            🖨️ Print
          </button>
        </div>

        {/* Thank You Note */}
        <div className="mt-6 text-center text-gray-500 text-sm print:mt-12">
          Thank you for using Parkwise! Drive Safe 🚗
        </div>
      </div>
    </div>
  );
};

export default BillReceipt;
