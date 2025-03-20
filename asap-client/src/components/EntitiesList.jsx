import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './EntitiesList.css'
const EntitiesList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [entities, setEntities] = useState([]);
  const navigate = useNavigate();

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch entities based on selected user
  useEffect(() => {
    if (!selectedUser) return;

    const fetchEntities = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/entities?created_by=${selectedUser}`);
        const data = await response.json();
        setEntities(data);
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    };

    fetchEntities();
  }, [selectedUser]);

  return (
    <div className="entities-container">
      <h2>Entities List</h2>
      <select onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select a User</option>
        {users.map((user) => (
          <option key={user._id} value={user.email}>
            {user.email}
          </option>
        ))}
      </select>

      {/* Show the "Create Post" button if a user is selected */}
      {selectedUser && (
        <button
          className="create-post-btn"
          onClick={() => navigate(`/create-post?email=${selectedUser}`)}
        >
          Create Post
        </button>
      )}

      {entities.length > 0 ? (
        <ul>
          {entities.map((entity) => (
            <li key={entity._id}>{entity.name}</li>
          ))}
        </ul>
      ) : (
        <p>No entities found for the selected user.</p>
      )}
    </div>
  );
};

export default EntitiesList;
