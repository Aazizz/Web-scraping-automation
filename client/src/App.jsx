import {Route, Routes, Navigate, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import "./App.css"

function App() {
  const user = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
        {  <Route path="/userDetails" element={<UserDetails/>} />}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;