import React from 'react'
import { createBrowserRouter , createRoutesFromElements , Route} from 'react-router-dom'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'

const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
         <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        </>
    )
    )

export default Router;
