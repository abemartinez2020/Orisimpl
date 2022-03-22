import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdatePost from "./components/UpdatePost";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="center">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<UpdatePost />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
