import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ExploreFriends() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://chat-server-docker.onrender.com/api/exploreFriends', {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }).then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleAddFriend = (userId) => {
    return () => {
      axios.post('https://chat-server-docker.onrender.com/api/sendFriendRequest', {
        to: userId,
      }, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }).then((response) => {
        console.log(response.data);
        alert('Friend request sent');
        window.location.reload();
      });
    };
  }

  return (
    <div className="p-4" >
      <div className="grid grid-cols-1 gap-2">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-6 shadow rounded-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xl text-gray-800 font-semibold mb-2">{user.username}</h3>
              <p className="text-gray-600 mb-4">{user.email}</p>
            </div>
            <button 
              className="bg-[#2d3748] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleAddFriend(user._id)}
            >
              Add Friend
            </button>
          </div>
        ))}
        {users.length === 0 && <div className="text-gray-600">No new users found</div>}
      </div>
    </div>
  );
}
