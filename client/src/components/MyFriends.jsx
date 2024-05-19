import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function MyFriends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios
      .get("https://chat-server-docker.onrender.com/api/friends", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <div className="p-4">
      <ul className="flex flex-col gap-2">
        {friends.map((friend) => {
          return (
            <div key={friend._id} className="bg-white p-6 shadow rounded-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xl text-gray-800 font-semibold mb-2">{friend.username}</h3>
              <p className="text-gray-600 mb-4">{friend.email}</p>
            </div>
          </div>
          );
        })}
      </ul>
    </div>
  );
}
