// // import React, { useState } from "react";
// // import EntryForm from "./EntryForm";
// // import ExitForm from "./ExitForm";

// // function BookVehicle({ onEntry, onExit }) {
// //   const [view, setView] = useState("entry");

// //   return (
// //     <div className="p-6 max-w-2xl mx-auto">
// //       <h2 className="text-3xl font-bold mb-6">Book Vehicle</h2>
// //       <div className="flex space-x-4 mb-6">
// //         <button
// //           onClick={() => setView("entry")}
// //           className={`px-4 py-2 rounded font-semibold transition ${
// //             view === "entry"
// //               ? "bg-blue-600 text-white"
// //               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
// //           }`}
// //         >
// //           Entry
// //         </button>
// //         <button
// //           onClick={() => setView("exit")}
// //           className={`px-4 py-2 rounded font-semibold transition ${
// //             view === "exit"
// //               ? "bg-red-600 text-white"
// //               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
// //           }`}
// //         >
// //           Exit
// //         </button>
// //       </div>
// //       {view === "entry" ? (
// //         <EntryForm onEntry={onEntry} />
// //       ) : (
// //         <ExitForm onExit={onExit} />
// //       )}
// //     </div>
// //   );
// // }

// // export default BookVehicle;



// import { useState } from "react";
// import EntryForm from "./EntryForm";
// import ExitForm from "./ExitForm";

// function BookVehicle() {
//   const [view, setView] = useState("entry");

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4">Book Vehicle</h2>
//       <div className="flex gap-4 mb-6">
//         <button
//           className={`px-4 py-2 rounded ${view === "entry" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
//           onClick={() => setView("entry")}
//         >
//           Entry
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${view === "exit" ? "bg-red-600 text-white" : "bg-gray-300"}`}
//           onClick={() => setView("exit")}
//         >
//           Exit
//         </button>
//       </div>
//       {view === "entry" ? <EntryForm /> : <ExitForm />}
//     </div>
//   );
// }

// export default BookVehicle;







// BookVehicle.js
import { useState } from "react";
import EntryForm from "./EntryForm";
import ExitForm from "./ExitForm";

function BookVehicle() {
  const [view, setView] = useState("entry");

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Book Vehicle</h2>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${view === "entry" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setView("entry")}
        >
          Entry
        </button>
        <button
          className={`px-4 py-2 rounded ${view === "exit" ? "bg-red-600 text-white" : "bg-gray-300"}`}
          onClick={() => setView("exit")}
        >
          Exit
        </button>
      </div>
      {view === "entry" ? <EntryForm /> : <ExitForm />}
    </div>
  );
}

export default BookVehicle;
