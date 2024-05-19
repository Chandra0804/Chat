import React, { useEffect, useState } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const ChatList = ({ setRecipientId }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('https://chat-server-docker.onrender.com/api/friends', {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends', error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="w-72 bg-gray-100 flex flex-col">
      <div className="p-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 border rounded-md"
        />
      </div>
      {friends.map(friend => (
        <div
          key={friend._id}
          className="flex items-center p-2 bg-gray-200 cursor-pointer"
          onClick={() => setRecipientId(friend._id)}
        >
          <div className="w-10 h-10 bg-gray-500 rounded-full mr-3 flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-white m-auto" />
          </div>
          <div className="flex flex-col">
            <div className="font-bold">{friend.username}</div>
            <div className="text-sm text-gray-600">Lorem ipsum dolor sit amet...</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
