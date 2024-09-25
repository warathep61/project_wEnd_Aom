import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';

// สร้าง Context
export const UseContext = createContext();

function App() {
  // ใช้ useState ในการจัดการ token
  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      {/* ใช้ Provider เพื่อแชร์ค่า token และ setToken ไปยังคอมโพเนนต์อื่น ๆ */}
      <UseContext.Provider value={{ token, setToken }}>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin/' element={<Admin />} />
          <Route path='/admin/:token' element={<Admin />} />
        </Routes>
      </UseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
