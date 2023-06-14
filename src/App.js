import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className='text-center'>User Cards</h1>
      <div className="card-container">
        {users.map((user) => (
          <div key={user.id}  className={"card text-white bg-dark mb-3 d-inline-block text-center"} style={{"max-width": "100rem"}}>
            <h4 class="card-title">{user.firstName} {user.lastName}</h4>
            <h6 class="card-subtitle mb-2 text-muted">{user.age} {user.gender}</h6>
            <img  width={"100px"} src={user.image} alt="Card image"></img>
            <div className='card-body'>
            <ul className={"list-group list-group-flush"}>
            <li class="list-group-item">{user.email}</li>
            <li class="list-group-item">{user.phone}</li>
            <li class="list-group-item">{user.username}</li>
            <li class="list-group-item">{user.birthDate}</li>
            <li class="list-group-item">{user.address["city"]}</li>
            <li class="list-group-item">{user.address["coordinates"]["lat"]} {user.address["coordinates"]["lng"]}</li>
            <li class="list-group-item">{user.bank["cardExpire"]}</li>
            <li class="list-group-item">{user.company["name"]}</li>
            </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
