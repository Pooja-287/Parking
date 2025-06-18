


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaEye, FaRecycle, FaTimes } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import bg from "../assets/bg.jpg";

// const fadeIn = {
//   animation: "fadeIn 0.3s ease forwards",
// };
// const fadeOut = {
//   animation: "fadeOut 0.3s ease forwards",
// };
// const styleSheet = `
// @keyframes fadeIn {
//   from {opacity: 0; transform: translateY(-10px);}
//   to {opacity: 1; transform: translateY(0);}
// }
// @keyframes fadeOut {
//   from {opacity: 1; transform: translateY(0);}
//   to {opacity: 0; transform: translateY(-10px);}
// }`;

// const Modal = ({ isOpen, onClose, title, children }) => {
//   const [visible, setVisible] = useState(false);
//   const [animateStyle, setAnimateStyle] = useState({});

//   useEffect(() => {
//     if (isOpen) {
//       setVisible(true);
//       setAnimateStyle(fadeIn);
//     } else if (visible) {
//       setAnimateStyle(fadeOut);
//       const timer = setTimeout(() => setVisible(false), 300);
//       return () => clearTimeout(timer);
//     }
//   }, [isOpen, visible]);

//   if (!visible) return null;

//   return (
//     <>
//       <style>{styleSheet}</style>
//       <div
//         className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
//         onClick={onClose}
//         style={{ animation: isOpen ? "fadeIn 0.3s ease forwards" : undefined }}
//       >
//         <div
//           className="bg-white/20 rounded-lg p-8 max-w-md w-full relative shadow-2xl"
//           style={animateStyle}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <h2 className="text-2xl font-bold mb-5 text-gray-900">{title}</h2>
//           <div className="text-gray-800 text-lg">{children}</div>
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-2xl text-red-500 hover:text-red-700 transition"
//             title="Close"
//           >
//             <FaTimes />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// const UserCreationForm = () => {
//   const [mode, setMode] = useState("read");
//   const [formData, setFormData] = useState({ username: "", password: "", email: "" });
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalUser, setModalUser] = useState(null);

//   const resetForm = () => {
//     setFormData({ username: "", password: "", email: "" });
//     setEditingUser(null);
//   };

//   useEffect(() => {
//     if (mode === "read") fetchUsers();
//     if (mode === "trash") fetchTrashedUsers();
//     if (mode === "create" && !editingUser) resetForm();
//   }, [mode]);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/users");
//       setUsers(res.data);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to fetch users");
//     }
//   };

//   const fetchTrashedUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/trashed");
//       setUsers(res.data);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to fetch trashed users");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.email) return toast.warning("Email is required");
//     try {
//       const token = localStorage.getItem("token");
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const url = editingUser ? `http://localhost:4000/api/updateuser/${editingUser._id}` : "http://localhost:4000/api/client";
//       const res = editingUser
//         ? await axios.put(url, formData, config)
//         : await axios.post(url, formData, config);
//       toast.success(res.data.message || "Operation successful");
//       setMode("read");
//       resetForm();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error occurred");
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setFormData({ username: user.username, password: user.password, email: user.email || "" });
//     setMode("create");
//   };

//   const handleTrash = async (id) => {
//     if (!window.confirm("Move this user to trash?")) return;
//     try {
//       const res = await axios.put(`http://localhost:4000/api/trash/${id}`);
//       toast.success(res.data.message);
//       mode === "read" ? setUsers((prev) => prev.filter((u) => u._id !== id)) : fetchTrashedUsers();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error trashing user");
//     }
//   };

//   const handleRestore = async (id) => {
//     try {
//       const res = await axios.put(`http://localhost:4000/api/restore/${id}`);
//       toast.success(res.data.message);
//       fetchTrashedUsers();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error restoring user");
//     }
//   };

//   const handleView = (user) => {
//     setModalUser(user);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setModalUser(null);
//   };

//   const handleCreateNew = () => {
//     setMode("create");
//     resetForm();
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-4 sm:p-10 text-white"
//       style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
//     >
//       <ToastContainer />
//       <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
//         {mode === "create" ? (editingUser ? "Edit User" : "Create Client") : mode === "trash" ? "Trashed Users" : "Manage Users"}
//       </h1>

//       {mode !== "create" && (
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//           <div className="space-x-2">
//             <button onClick={() => setMode("read")} className={`px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 ${mode === "read" ? "bg-opacity-80" : ""}`}>Active Users</button>
//             <button onClick={() => setMode("trash")} className={`px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 ${mode === "trash" ? "bg-opacity-80" : ""}`}>Trashed Users</button>
//           </div>
//           <button onClick={handleCreateNew} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700">+ Create New</button>
//         </div>
//       )}

//       {/* Mobile stacked cards */}
//       <div className="sm:hidden space-y-4">
//         {users.map((user) => (
//           <div key={user._id} className="bg-indigo-800/50 p-4 rounded-lg shadow">
//             <p><b>Username:</b> {user.username}</p>
//             <p><b>Email:</b> {user.email || "-"}</p>
//             <p><b>Role:</b> {user.role}</p>
//             <p><b>Password:</b> {user.password}</p>
//             <div className="mt-2 flex gap-3 text-xl">
//               <button onClick={() => handleView(user)}><FaEye className="text-blue-300" /></button>
//               {mode === "read" ? (
//                 <>
//                   <button onClick={() => handleEdit(user)}><FaEdit className="text-yellow-300" /></button>
//                   <button onClick={() => handleTrash(user._id)}><FaTrash className="text-red-400" /></button>
//                 </>
//               ) : (
//                 <button onClick={() => handleRestore(user._id)}><FaRecycle className="text-green-300" /></button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Table for larger screens */}
//       <div className="hidden sm:block overflow-x-auto rounded-lg border border-indigo-800">
//         <table className="min-w-[600px] w-full text-white bg-indigo-900/20 table-auto">
//           <thead className="bg-indigo-800/90 text-center align-middle">
//             <tr>
//               <th className="px-6 py-3">Username</th>
//               <th className="px-6 py-3">Email</th>
//               <th className="px-6 py-3">Role</th>
//               <th className="px-6 py-3">Password</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 ? (
//               <tr><td colSpan="5" className="text-center py-4 text-indigo-300">No users found.</td></tr>
//             ) : (
//               users.map((user) => (
//                 <tr key={user._id} className="hover:bg-indigo-800/50 transition text-center">
//                   <td className="px-6 py-3">{user.username}</td>
//                   <td className="px-6 py-3">{user.email || "-"}</td>
//                   <td className="px-6 py-3">{user.role}</td>
//                   <td className="px-6 py-3">{user.password}</td>
//                   <td className="px-6 py-3 space-x-4">
//                     <button onClick={() => handleView(user)}><FaEye className="inline text-blue-400" /></button>
//                     {mode === "read" ? (
//                       <>
//                         <button onClick={() => handleEdit(user)}><FaEdit className="inline text-yellow-400" /></button>
//                         <button onClick={() => handleTrash(user._id)}><FaTrash className="inline text-red-400" /></button>
//                       </>
//                     ) : (
//                       <button onClick={() => handleRestore(user._id)}><FaRecycle className="inline text-green-400" /></button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {mode === "create" && (
//         <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-6 bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-md border border-white/20 relative">
//           <button type="button" onClick={() => setMode("read")} className="absolute top-2 right-3 text-2xl text-red-400 hover:text-red-600 transition">✖</button>
//           <div className="mb-5 text-center">
//             <label className="font-semibold text-lg text-white">User Type: Client</label>
//           </div>
//           <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className="w-full mb-4 px-3 py-2 rounded bg-white/20 text-white" />
//           <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full mb-4 px-3 py-2 rounded bg-white/20 text-white" />
//           <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full mb-4 px-3 py-2 rounded bg-white/20 text-white" />
//           <button type="submit" className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold">{editingUser ? "Update" : "Create"}</button>
//         </form>
//       )}

//         <Modal isOpen={modalOpen} onClose={closeModal} >
//   <h2 className="text-2xl font-bold mb-5 text-gray-900 ml-24">User Details</h2>
//   {modalUser && (
//     <div className="space-y-2 text-gray-300 text-base ml-20">
//       <p><strong>Username:</strong> {modalUser.username}</p>
//       <p><strong>Email:</strong> {modalUser.email || "N/A"}</p>
//       <p><strong>Role:</strong> {modalUser.role || "N/A"}</p>
//       <p><strong>Password:</strong> {modalUser.password}</p>
//     </div>
//   )}
// </Modal>
//     </div>
//   );
// };

// export default UserCreationForm;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaEye, FaRecycle, FaTimes } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import bg from "../assets/bg.jpg";

// const fadeIn = {
//   animation: "fadeIn 0.3s ease forwards",
// };
// const fadeOut = {
//   animation: "fadeOut 0.3s ease forwards",
// };
// const styleSheet = `
// @keyframes fadeIn {
//   from {opacity: 0; transform: translateY(-10px);}
//   to {opacity: 1; transform: translateY(0);}
// }
// @keyframes fadeOut {
//   from {opacity: 1; transform: translateY(0);}
//   to {opacity: 0; transform: translateY(-10px);}
// }`;

// const Modal = ({ isOpen, onClose, title, children }) => {
//   const [visible, setVisible] = useState(false);
//   const [animateStyle, setAnimateStyle] = useState({});

//   useEffect(() => {
//     if (isOpen) {
//       setVisible(true);
//       setAnimateStyle(fadeIn);
//     } else if (visible) {
//       setAnimateStyle(fadeOut);
//       const timer = setTimeout(() => setVisible(false), 300);
//       return () => clearTimeout(timer);
//     }
//   }, [isOpen, visible]);

//   if (!visible) return null;

//   return (
//     <>
//       <style>{styleSheet}</style>
//       <div
//         className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
//         onClick={onClose}
//       >
//         <div
//           className="bg-white/20 rounded-lg p-8 max-w-md w-full relative shadow-2xl"
//           style={animateStyle}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <h2 className="text-2xl font-bold mb-5 text-gray-900">{title}</h2>
//           <div className="text-gray-800 text-lg">{children}</div>
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-2xl text-red-500 hover:text-red-700 transition"
//             title="Close"
//           >
//             <FaTimes />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// const UserCreationForm = () => {
//   const [mode, setMode] = useState("read");
//   const [formData, setFormData] = useState({ username: "", password: "", email: "" });
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalUser, setModalUser] = useState(null);

//   const resetForm = () => {
//     setFormData({ username: "", password: "", email: "" });
//     setEditingUser(null);
//   };

//   useEffect(() => {
//     if (mode === "read") fetchUsers();
//     if (mode === "trash") fetchTrashedUsers();
//     if (mode === "create" && !editingUser) resetForm();
//   }, [mode]);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/users");
//       setUsers(res.data);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to fetch users");
//     }
//   };

//   const fetchTrashedUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/trashed");
//       setUsers(res.data);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to fetch trashed users");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.email) return toast.warning("Email is required");
//     try {
//       const token = localStorage.getItem("token");
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const url = editingUser
//         ? `http://localhost:4000/api/updateuser/${editingUser._id}`
//         : "http://localhost:4000/api/client";
//       const res = editingUser
//         ? await axios.put(url, formData, config)
//         : await axios.post(url, formData, config);
//       toast.success(res.data.message || "Operation successful");
//       setMode("read");
//       resetForm();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error occurred");
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setFormData({ username: user.username, password: user.password, email: user.email || "" });
//     setMode("create");
//   };

//   const handleTrash = async (id) => {
//     if (!window.confirm("Move this user to trash?")) return;
//     try {
//       const res = await axios.put(`http://localhost:4000/api/trash/${id}`);
//       toast.success(res.data.message);
//       mode === "read" ? setUsers((prev) => prev.filter((u) => u._id !== id)) : fetchTrashedUsers();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error trashing user");
//     }
//   };

//   const handleRestore = async (id) => {
//     try {
//       const res = await axios.put(`http://localhost:4000/api/restore/${id}`);
//       toast.success(res.data.message);
//       fetchTrashedUsers();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error restoring user");
//     }
//   };

//   const handleView = (user) => {
//     setModalUser(user);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setModalUser(null);
//   };

//   const handleCreateNew = () => {
//     setMode("create");
//     resetForm();
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-4 sm:p-10 text-white"
//       style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
//     >
//       <ToastContainer />
//       <h1 className="text-3xl font-bold text-center mb-6">
//         {mode === "create" ? (editingUser ? "Edit User" : "Create Client") : mode === "trash" ? "Trashed Users" : "Manage Users"}
//       </h1>

//       {mode !== "create" && (
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//           <div className="space-x-2">
//             <button onClick={() => setMode("read")} className={`px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 ${mode === "read" ? "bg-opacity-80" : ""}`}>Active Users</button>
//             <button onClick={() => setMode("trash")} className={`px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 ${mode === "trash" ? "bg-opacity-80" : ""}`}>Trashed Users</button>
//           </div>
//           <button onClick={handleCreateNew} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700">+ Create New</button>
//         </div>
//       )}

//       <div className="hidden sm:block overflow-x-auto rounded-lg border border-indigo-800">
//         <table className="min-w-[600px] w-full text-white bg-indigo-900/20 table-auto">
//           <thead className="bg-indigo-800/90 text-center">
//             <tr>
//               <th className="px-6 py-3">Username</th>
//               <th className="px-6 py-3">Email</th>
//               <th className="px-6 py-3">Role</th>
//               <th className="px-6 py-3">Password</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 ? (
//               <tr><td colSpan="5" className="text-center py-4 text-indigo-300">No users found.</td></tr>
//             ) : (
//               users.map((user) => (
//                 <tr key={user._id} className="hover:bg-indigo-800/50 transition text-center">
//                   <td className="px-6 py-3">{user.username}</td>
//                   <td className="px-6 py-3">{user.email || "-"}</td>
//                   <td className="px-6 py-3">{user.role}</td>
//                   <td className="px-6 py-3">{user.password}</td>
//                   <td className="px-6 py-3 space-x-4">
//                     <button onClick={() => handleView(user)}><FaEye className="inline text-blue-400" /></button>
//                     {mode === "read" ? (
//                       <>
//                         <button onClick={() => handleEdit(user)}><FaEdit className="inline text-yellow-400" /></button>
//                         <button onClick={() => handleTrash(user._id)}><FaTrash className="inline text-red-400" /></button>
//                       </>
//                     ) : (
//                       <button onClick={() => handleRestore(user._id)}><FaRecycle className="inline text-green-400" /></button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* View Modal */}
//       <Modal isOpen={modalOpen} onClose={closeModal} title="User Details">
//         {modalUser && (
//           <div className="space-y-2 text-gray-700">
//             <p><strong>Username:</strong> {modalUser.username}</p>
//             <p><strong>Email:</strong> {modalUser.email || "N/A"}</p>
//             <p><strong>Role:</strong> {modalUser.role || "N/A"}</p>
//             <p><strong>Password:</strong> {modalUser.password}</p>
//           </div>
//         )}
//       </Modal>

//       {/* Create/Edit Modal Form */}
//       <Modal isOpen={mode === "create"} onClose={() => setMode("read")} title={editingUser ? "Edit User" : "Create Client"}>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-medium text-gray-800">Username</label>
//             <input
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Username"
//               required
//               className="w-full px-3 py-2 rounded bg-white/40 text-black"
//             />
//           </div>
//           <div>
//             <label className="block font-medium text-gray-800">Email</label>
//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//               className="w-full px-3 py-2 rounded bg-white/40 text-black"
//             />
//           </div>
//           <div>
//             <label className="block font-medium text-gray-800">Password</label>
//             <input
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//               className="w-full px-3 py-2 rounded bg-white/40 text-black"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
//           >
//             {editingUser ? "Update" : "Create"}
//           </button>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default UserCreationForm;

















import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye, FaRecycle, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "../assets/bg.jpg";

const fadeIn = {
  animation: "fadeIn 0.3s ease forwards",
};
const fadeOut = {
  animation: "fadeOut 0.3s ease forwards",
};
const styleSheet = `
@keyframes fadeIn {
  from {opacity: 0; transform: translateY(-10px);}
  to {opacity: 1; transform: translateY(0);}
}
@keyframes fadeOut {
  from {opacity: 1; transform: translateY(0);}
  to {opacity: 0; transform: translateY(-10px);}
}`;

const Modal = ({ isOpen, onClose, title, children }) => {
  const [visible, setVisible] = useState(false);
  const [animateStyle, setAnimateStyle] = useState({});

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setAnimateStyle(fadeIn);
    } else if (visible) {
      setAnimateStyle(fadeOut);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, visible]);

  if (!visible) return null;

  return (
    <>
      <style>{styleSheet}</style>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <div
          className="bg-white/20 rounded-lg p-8 max-w-md w-full relative shadow-2xl"
          style={animateStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-5 text-gray-900">{title}</h2>
          <div className="text-gray-800 text-lg">{children}</div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-red-500 hover:text-red-700 transition"
            title="Close"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </>
  );
};

const UserCreationForm = () => {
  const [mode, setMode] = useState("read");
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState(null);

  const resetForm = () => {
    setFormData({ username: "", password: "", email: "" });
    setEditingUser(null);
  };

  useEffect(() => {
    if (mode === "read") fetchUsers();
    if (mode === "trash") fetchTrashedUsers();
    if (mode === "create" && !editingUser) resetForm();
  }, [mode]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/users");
      setUsers(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch users");
    }
  };

  const fetchTrashedUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/trashed");
      setUsers(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch trashed users");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) return toast.warning("Email is required");
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = editingUser
        ? `http://localhost:4000/api/updateuser/${editingUser._id}`
        : "http://localhost:4000/api/client";
      const res = editingUser
        ? await axios.put(url, formData, config)
        : await axios.post(url, formData, config);
      toast.success(res.data.message || "Operation successful");
      setMode("read");
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ username: user.username, password: user.password, email: user.email || "" });
    setMode("create");
  };

  const handleTrash = async (id) => {
    if (!window.confirm("Move this user to trash?")) return;
    try {
      const res = await axios.put(`http://localhost:4000/api/trash/${id}`);
      toast.success(res.data.message);
      mode === "read" ? setUsers((prev) => prev.filter((u) => u._id !== id)) : fetchTrashedUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error trashing user");
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/restore/${id}`);
      toast.success(res.data.message);
      setMode("read");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error restoring user");
    }
  };

  const handleView = (user) => {
    setModalUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalUser(null);
  };

  const handleCreateNew = () => {
    setMode("create");
    resetForm();
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-4 sm:p-10 text-white"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6">
        {mode === "create" ? (editingUser ? "Edit User" : "Create Client") : mode === "trash" ? "Trashed Users" : "Manage Users"}
      </h1>

      {mode !== "create" && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="space-x-2">
            <button onClick={() => setMode("read")} className={`px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 ${mode === "read" ? "bg-opacity-80" : ""}`}>Active Users</button>
            <button onClick={() => setMode("trash")} className={`px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 ${mode === "trash" ? "bg-opacity-80" : ""}`}>Trashed Users</button>
          </div>
          <button onClick={handleCreateNew} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700">+ Create New</button>
        </div>
      )}

      <div className="hidden sm:block overflow-x-auto rounded-lg border border-indigo-800">
        <table className="min-w-[600px] w-full text-white bg-indigo-900/20 table-auto">
          <thead className="bg-indigo-800/90 text-center">
            <tr>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Password</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-4 text-indigo-300">No users found.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-indigo-800/50 transition text-center">
                  <td className="px-6 py-3">{user.username}</td>
                  <td className="px-6 py-3">{user.email || "-"}</td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3">{user.password}</td>
                  <td className="px-6 py-3 space-x-4">
                    <button onClick={() => handleView(user)}><FaEye className="inline text-blue-400" /></button>
                    {mode === "read" ? (
                      <>
                        <button onClick={() => handleEdit(user)}><FaEdit className="inline text-yellow-400" /></button>
                        <button onClick={() => handleTrash(user._id)}><FaTrash className="inline text-red-400" /></button>
                      </>
                    ) : (
                      <button onClick={() => handleRestore(user._id)}><FaRecycle className="inline text-green-400" /></button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} title="User Details">
        {modalUser && (
          <div className="space-y-2 text-white">
            <p><strong>Username:</strong> {modalUser.username}</p>
            <p><strong>Email:</strong> {modalUser.email || "N/A"}</p>
            <p><strong>Role:</strong> {modalUser.role || "N/A"}</p>
            <p><strong>Password:</strong> {modalUser.password}</p>
          </div>
        )}
      </Modal>

      <Modal isOpen={mode === "create"} onClose={() => setMode("read")} title={editingUser ? "Edit User" : "Create Client"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-800">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full px-3 py-2 rounded bg-white/40 text-black"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-800">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-3 py-2 rounded bg-white/40 text-black"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-800">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-3 py-2 rounded bg-white/40 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
          >
            {editingUser ? "Update" : "Create"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserCreationForm;