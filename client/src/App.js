// // App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import HomePage from './pages/HomePage';

// import Login from './pages/Login';



// import SuperAdmin from './form/SuperAdmin';

// import Home from './pages/Home';

// import VehicleList from './pages/VehiclList';
// import EntryForm from './pages/EntryForm';
// import ExitForm from './pages/ExitForm';
// import BillReceipt from './pages/BillReceipt';
// import AdminProfile from './pages/AdminProfile';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
  

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage/>} />
       
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
      
//         <Route path="/entry" element={<EntryForm />} />
//         <Route path="/exit" element={<ExitForm />} />
//         <Route path="/billreceipt" element={<BillReceipt/>}/>
//          <Route path="/admin-profile" element={<AdminProfile />} />
//         <Route path="/vehiclelist" element={<VehicleList />} />
     
//         <Route path='/superadmin' element={<SuperAdmin />}/>
     

//       </Routes>
//     </Router>
//   );
// }

// export default App;







// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SuperAdmin from './form/SuperAdmin';
import Home from './pages/Home';
import VehicleList from './pages/VehiclList';
import EntryForm from './pages/EntryForm';
import ExitForm from './pages/ExitForm';
import BillReceipt from './pages/BillReceipt';
import AdminProfile from './pages/AdminProfile';
import PrivateRoute from './pages/PrivateRoute'; // ✅ Login protection

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // ✅ true if token exists
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/entry" element={<EntryForm />} />
        <Route path="/exit" element={<ExitForm />} />
        <Route path="/billreceipt" element={<BillReceipt />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/vehiclelist" element={<VehicleList />} />
        <Route path="/home" element={<Home />} />

        {/* ✅ Protected Routes */}
        {/* <Route
          path="/home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/superadmin"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <SuperAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

