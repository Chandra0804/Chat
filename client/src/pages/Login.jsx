import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await axios.post("https://chat-server-docker.onrender.com/api/login", { email, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login successful");
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000);
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
      console.log(error);
    }
  };

  return (
    <div className="bg-[#2d3748] min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to ChatApp</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
