import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://chat-server-docker.onrender.com/api/requests", {
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
          "https://chat-server-docker.onrender.com/api/acceptRequest",
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
          alert("Friend request accepted");
          navigate('/dashboard')
        });
    };
  }
  return (
    <div className=" p-4">
      <div className="grid grid-cols-1 gap-4">
        {requests.map((request) => (
          <div key={request._id} className="bg-white p-4 shadow rounded">
            <h3 className="text-lg text-gray-800 font-semibold">{request.from.username}</h3>
            <p className="text-gray-600">{request.from.email}</p>
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleAddFriend(request._id)}>
              Accept
            </button>
          </div>
        ))}
        {requests.length === 0 && <div className="text-gray-600">No requests</div>}
      </div>
    </div>
  );
}
