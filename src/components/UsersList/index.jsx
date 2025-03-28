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
    
    const url = `https://reqres.in/api/users?page=${num}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setUserList(data.data);
      setApiStatus(apiConstants.success);
    } else {
      setApiStatus(apiConstants.failure);
    }
  };

  const deleteUser = (id) => {
    setUserList(userList.filter((i) => i.id !== id));
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
            <li className="user-item" key={user.id}>
              <div className="buttons-div">
                <button className="edit-button" onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
                <button className="delete-button" onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
              <img className="avatar" src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
              <h3 className="name">{user.first_name} {user.last_name}</h3>
            </li>
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
