import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData();
  const [displayUser, setDisplayUser] = useState(users);

  const handleDelete = (user) => {
    const agree = window.confirm("Are you want to delete?");
    if (agree) {
      fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("user deleted");
            const remainingUsers = users.filter((usr) => usr._id !== user._id);
            setDisplayUser(remainingUsers);
          }
        });
    }
  };
  return (
    <div>
      <h1>user: {displayUser.length} </h1>
      <div>
        {displayUser.map((user) => (
          <p key={user._id}>
            {user.name}
            {user.email}
            <Link to={`/update/${user._id}`}>
              <button>update</button>
            </Link>
            <button onClick={() => handleDelete(user)}>X</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Home;
