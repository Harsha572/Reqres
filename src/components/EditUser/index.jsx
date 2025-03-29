import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "", avatar: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        setIsLoading(false);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar,  // Ensure avatar is retained
        id: id,  // Ensure ID is retained
      };
  
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
  
      if (response.ok) {
        localStorage.setItem(`user_${id}`, JSON.stringify(updatedUser));
        alert("User details updated successfully!");
        navigate("/users");
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      setIsError(true);
    }
  };  
  
  if (isLoading) return <p>Loading user details...</p>;
  if (isError) return <p className="error-message">Error loading user details. Please try again.</p>;

  return (
    <div className="edit-container">
      <h1 className="edit-head">Edit User</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label className="label">First Name</label>
        <input className="input-text" type="text" name="first_name" value={user.first_name} onChange={handleChange} required />
        
        <label className="label">Last Name</label>
        <input className="input-text" type="text" name="last_name" value={user.last_name} onChange={handleChange} required />
        
        <label className="label">Email</label>
        <input className="input-text" type="email" name="email" value={user.email} onChange={handleChange} required />
        
        <button className="save-btn" type="submit">Save Changes</button>
      </form>
      <button className="cancel-btn" onClick={() => navigate("/users")}>Cancel</button>
    </div>
  );
}

export default EditUser
