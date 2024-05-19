import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faUserFriends, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">ChatApp</div>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
            <Link to="/register" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Sign Up</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-[#2d3748] text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to ChatApp</h1>
          <p className="text-xl mb-8">Connect with your friends and family seamlessly.</p>
          <Link to="/register" className="bg-blue-500 px-6 py-3 rounded-full text-lg hover:bg-blue-600">Get Started</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Features</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-64 bg-white p-6 rounded shadow-md">
              <FontAwesomeIcon icon={faComments} className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-time Chat</h3>
              <p className="text-gray-600">Send and receive messages instantly with our real-time chat feature.</p>
            </div>
            <div className="w-64 bg-white p-6 rounded shadow-md">
              <FontAwesomeIcon icon={faUserFriends} className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Connect with Friends</h3>
              <p className="text-gray-600">Easily add and chat with your friends and family.</p>
            </div>
            <div className="w-64 bg-white p-6 rounded shadow-md">
              <FontAwesomeIcon icon={faShieldAlt} className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure</h3>
              <p className="text-gray-600">Your messages are safe and secure with end-to-end encryption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 ChatApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
