import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "IN_PROGRESS",
};

function UsersList() {
  const [userList, setUserList] = useState([]);
  const [num, setNum] = useState(1);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [num]);

  const getUsers = async () => {
    setApiStatus(apiConstants.loading);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      const url = `https://reqres.in/api/users?page=${num}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
  
      // Get deleted users list from localStorage
      const deletedUsers = JSON.parse(localStorage.getItem("deletedUsers")) || [];
  
      // Merge updated user details and filter out deleted users
      const updatedUsers = data.data
        .map((user) => {
          const storedUser = localStorage.getItem(`user_${user.id}`);
          return storedUser ? JSON.parse(storedUser) : user;
        })
        .filter((user) => !deletedUsers.includes(user.id)); // Exclude deleted users
  
      setUserList(updatedUsers);
      setApiStatus(apiConstants.success);
    } catch (error) {
      console.error("Error fetching users:", error);
      setApiStatus(apiConstants.failure);
    }
  };
  
  
  const deleteUser = (id) => {
    // Get previously deleted users from localStorage
    const deletedUsers = JSON.parse(localStorage.getItem("deletedUsers")) || [];
  
    // Add the new deleted user to the list
    deletedUsers.push(id);
    localStorage.setItem("deletedUsers", JSON.stringify(deletedUsers));
  
    // Update state to remove user
    setUserList((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  
  
  const filteredUsers = userList.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <h1 className="users-head">List of Users</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        className="searchText"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {apiStatus === apiConstants.loading ? (
        <ClipLoader color="#00BFFF" size={100} />
      ) : (
        <ul className="users-list">
          {filteredUsers.map((user) => (
            user.id ? (
              <li className="user-item" key={user.id}>
                <div className="buttons-div">
                  <button className="edit-button" onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteUser(user.id)}>Delete</button>
                </div>
                <img className="avatar" src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                <h3 className="name">{user.first_name} {user.last_name}</h3>
              </li>
            ) : null
          ))}
        </ul>
      )}
      <div className="arrow-div">
        <button className="arrow-button" onClick={() => setNum(1)}>Page 1</button>
        <button className="arrow-button" onClick={() => setNum(2)}>Page 2</button>
      </div>
    </div>
  );
}

export default UsersList;
