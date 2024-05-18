import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/requests", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setRequests(response.data);
      });
  }, []);

  const handleAddFriend = (userId) => {
    return () => {
      axios
        .post(
          "http://localhost:3000/api/acceptRequest",
          {
            requestId: userId,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        });
    };
  }
  return (
    <div className="bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Requests</h1>
      <div className="grid grid-cols-1 gap-4">
        {requests.map((request) => (
          <div key={request._id} className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">{request.from.username}</h3>
            <p className="text-gray-600">{request.from.email}</p>
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleAddFriend(request._id)}>
              Accept
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
