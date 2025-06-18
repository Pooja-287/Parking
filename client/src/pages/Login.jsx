









// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import bg from "../assets/bg.jpg";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:4000/api/login', {
//         username,
//         password,
//         role
//       });

//       if (response.status === 200) {
//         toast.success("Login successful!", { autoClose: 4000 });

//         localStorage.setItem('adminProfile', JSON.stringify({ username, password, role }));
//         localStorage.setItem('userid', response.data.user.id);
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('role', response.data.user.role);

//         setTimeout(() => {
//           if (role === 'client') {
//             navigate('/entry');
//           } else if (role === 'superadmin') {
//             navigate('/superadmin');
//           }
//         }, 1500);
//       }
//     } catch (error) {
//       const msg = error.response?.data?.message || 'Server error';
//       setError(msg);
//       toast.error(msg, { autoClose: 4000 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4"
//           style={{
//                   backgroundImage: `url(${bg})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//     >
//       <div className="w-full max-w-md p-6 sm:p-8 bg-white/40 shadow-md rounded-lg">
//         <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-white">Login</h2>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-white">Username</label>
//             <input
//               type="text"
//               id="username"
//               className="w-full p-2 mt-2 border border-gray-500 rounded bg-gray-700 text-white"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-white">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="w-full p-2 mt-2 border border-gray-500 rounded bg-gray-700 text-white"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="role" className="block text-white">Role</label>
//             <select
//               id="role"
//               className="w-full p-2 mt-2 border border-gray-600 rounded bg-gray-700 text-white"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//             >
//               <option value="" disabled>Select a role</option>
//               <option value="client">Client</option>
//               <option value="superadmin">Superadmin</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <button
//               type="submit"
//               className="w-full p-2 mt-2 bg-gray-700 text-white rounded hover:bg-gray-600"
//               disabled={loading}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </div>
//         </form>
//       </div>

//    <ToastContainer
//   position="top-right"
//   autoClose={4000} // 4 seconds
//   hideProgressBar={false}
//   pauseOnHover
//   theme="colored"
//   style={{ marginRight: "20px" }}
// />

//     </div>
//   );
// };

// export default Login;












import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg from "../assets/bg.jpg";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        username,
        password,
        role
      });

      if (response.status === 200) {
        toast.success("Login successful!", { autoClose: 4000 });

        localStorage.setItem('adminProfile', JSON.stringify({ username, password, role }));
        localStorage.setItem('userid', response.data.user.id);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);

        setIsAuthenticated(true); // ✅ Set session as authenticated

        setTimeout(() => {
          if (role === 'client') {
            navigate('/entry');
          } else if (role === 'superadmin') {
            navigate('/superadmin');
          }
        }, 1500);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Server error';
      setError(msg);
      toast.error(msg, { autoClose: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4"
         style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="w-full max-w-md p-6 sm:p-8 bg-white/40 shadow-md rounded-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-white">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 mt-2 border border-gray-500 rounded bg-gray-700 text-white"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-white">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mt-2 border border-gray-500 rounded bg-gray-700 text-white"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-white">Role</label>
            <select
              id="role"
              className="w-full p-2 mt-2 border border-gray-600 rounded bg-gray-700 text-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select a role</option>
              <option value="client">Client</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-2 mt-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
        style={{ marginRight: "20px" }}
      />
    </div>
  );
};

export default Login;
