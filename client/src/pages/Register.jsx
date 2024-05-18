import React from 'react'
import axios from 'axios'

export default function Register() {
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const username = e.target.userName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if(password !== confirmPassword){
      console.log('Passwords do not match');
      return;
    }
    try{
      const response = await axios.post('http://localhost:3000/api/register',{username,email,password});
      console.log(response.data);
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userName" className="block text-gray-700">Username</label>
                <input type="text" id="userName" name="userName" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
            </div>
            <div>
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
            </div>
            <div>
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input type="password" id="password" name="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Register</button>
        </form>
    </div>
    </div>
  )
}
