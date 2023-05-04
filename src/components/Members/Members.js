import React, { useState, useEffect } from "react";
import "./Members.css";

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:3000/members");
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const addMember = async (newMember) => {
    try {
      const response = await fetch("http://localhost:3000/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });
      const data = await response.json();
      setMembers([...members, data]);
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const deleteMember = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/members/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMembers(members.filter((member) => member.id !== id));
      } else {
        throw new Error("Failed to delete member");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const membership = form.membership.value;
    const joinDate = form.joinDate.value;
    const newMember = { name, email, phone, membership, joinDate};
    addMember(newMember);
    form.reset();
  };

  return (
    <section className="members-container">
      <div className="members-list">
        <h1>Members</h1>
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <h3>{member.name}</h3>
              <p>{member.email}</p>
              <p>{member.phone}</p>
              <p>{member.membership}</p>
              <p>{member.joinDate}</p>
              <button onClick={() => deleteMember(member.id)}>QUIT </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="add-member-form">
        <form onSubmit={handleSubmit}>
          <h2>Add a new member:</h2>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="phone">Phone</label>
          <input type="phone" id="phone" name="phone" required />
          <label htmlFor="membership">Membership</label>
          <input type="membership" id="membership" name="membership" required />
          <label htmlFor="joinDate">joinDate</label>
          <input type="joinDate" id="joinDate" name="joinDate"/>

        <button type="submit">Join GYM</button>
        
      </form>
      </div>
      </section>
    
  );
}

export default Members;
