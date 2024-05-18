import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ExploreFriends() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/exploreFriends',{
      headers: {
        authorization: localStorage.getItem('token'),
      },
    
    }).then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleAddFriend = (userId) => {
    return () => {
      axios.post('http://localhost:3000/api/sendFriendRequest', {
        to: userId,
      }, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }).then((response) => {
        console.log(response.data);
      });
    };
  }

  return (
    <div className="bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Friends</h1>
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">{user.username}</h3>
            <p className="text-gray-600">{user.email}</p>
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleAddFriend(user._id)}>
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
