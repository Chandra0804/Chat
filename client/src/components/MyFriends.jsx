import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function MyFriends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/friends", {
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
    <div className="bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">My Friends</h1>
      <ul>
        {friends.map((friend) => {
          return (
            <div key={friend._id}>
              <li  className="bg-white p-2 rounded shadow mb-2">
                {friend.username}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
