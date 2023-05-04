import React, { useState, useEffect } from "react";
import "./Trainer.css";

function TrainerCard({ trainer, onDelete }) {
  return (
    <>
    <div className="bot-grid">
      <div className="card-container">
        <div className="card">
          <img src={trainer.photo} alt={trainer.name} width="200 px"/>
          <h2>{trainer.name}</h2>
          <p>{trainer.email}</p>
          <ul style={{ listStyle: "none" }}>
            {trainer.specialties.map((specialty) => (
              <li key={specialty}>{specialty}</li>
            ))}
          </ul>
          <button onClick={() => onDelete(trainer.id)}>Delete</button>
        </div>
      </div>
      </div>
    </>
  );
}

function Trainer() {
  const [trainers, setTrainers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    fetch("http://localhost:8001/trainers")
      .then((response) => response.json())
      .then((data) => setTrainers(data));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const data = { name, email, specialties: specialties.split(","), photo };
    fetch("http://localhost:8001/trainers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((newTrainer) => {
        setTrainers([...trainers, newTrainer]);
        setName("");
        setEmail("");
        setSpecialties("");
        setPhoto("");
      });
  }

  function handleDelete(id) {
    fetch(`http://localhost:8001/trainers/${id}`, { method: "DELETE" }).then(
      () => setTrainers(trainers.filter((trainer) => trainer.id !== id))
    );
  }

  const cardGrid = trainers.reduce((rows, trainer, index) => {
    if (index % 4 === 0) rows.push([]);
    rows[rows.length - 1].push(trainer);
    return rows;
  }, []);

  return (
    <div className="trainer">
      <h1 style={{textAlign:"center"}}>Join as a trainer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Specialties:
          <input
            type="text"
            value={specialties}
            onChange={(event) => setSpecialties(event.target.value)}
          />
        </label>
        <label>
          Photo URL:
          <input
            type="url"
            value={photo}
            onChange={(event) => setPhoto(event.target.value)}
          />
        </label>
        <button type="submit">Add Trainer</button>
      </form>
      <div className="card-grid">
        {cardGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="card-row" style={{display:"flex"}}>
            {row.map((trainer) => (
              <TrainerCard
                key={trainer.id}
                trainer={trainer}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trainer;