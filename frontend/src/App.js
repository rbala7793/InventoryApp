import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Forget from "./pages/Auth/Forget";
import Reset from "./pages/Auth/Reset";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

axios.defaults.withCredentials=true;

function App() {
  return (
     <BrowserRouter>
     <ToastContainer />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/forgetPassword" element={<Forget></Forget>} />
        <Route path="/resetPassword/:resetPassword" element={<Reset></Reset>} />

        <Route path="/dashboard" element={
          <Sidebar>
            <Layout>
              <Dashboard></Dashboard>
            </Layout>
          </Sidebar>
        } />
      </Routes>
     </BrowserRouter>
  );
}

export default App;
