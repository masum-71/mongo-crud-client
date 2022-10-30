import React, { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState({});

  const handleAddUser = (event) => {
    event.preventDefault();
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("user added successfully");
          event.target.reset();
        }
      });
  };

  const handleInputBlur = (event) => {
    const value = event.target.value;
    const filed = event.target.name;
    const newUser = { ...user };
    newUser[filed] = value;
    setUser(newUser);
  };
  return (
    <div>
      <h1>add user:</h1>
      <form onSubmit={handleAddUser}>
        <input
          onChange={handleInputBlur}
          type="text"
          name="name"
          placeholder="name"
          required
        />
        <br />
        <input
          onChange={handleInputBlur}
          type="text"
          name="address"
          placeholder="address"
          required
        />

        <br />
        <input
          onChange={handleInputBlur}
          type="email"
          name="email"
          placeholder="email"
          required
        />
        <br />
        <button type="submit">Add user</button>
      </form>
    </div>
  );
};

export default AddUser;
