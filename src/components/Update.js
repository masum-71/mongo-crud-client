import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const storedUser = useLoaderData();
  const [user, setUser] = useState(storedUser);

  const handleUpdateUser = (event) => {
    event.preventDefault();
    console.log(user);

    fetch(`http://localhost:5000/users/${storedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("user updated");
          event.target.reset();
        }
        console.log(data);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const filed = event.target.name;
    const newUser = { ...user };
    newUser[filed] = value;
    setUser(newUser);
  };
  return (
    <div>
      <h1>please Update {storedUser.name}</h1>
      <form onSubmit={handleUpdateUser}>
        <input
          onChange={handleInputChange}
          type="text"
          name="name"
          placeholder="name"
          required
        />
        <br />
        <input
          onChange={handleInputChange}
          type="text"
          name="address"
          placeholder="address"
          required
        />

        <br />
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          placeholder="email"
          required
        />
        <br />
        <button type="submit">Update user</button>
      </form>
    </div>
  );
};

export default Update;
