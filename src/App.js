import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      this.setState({ users: response.data.users });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  toggleCardDetails = (userId) => {
    this.setState((prevState) => ({
      users: prevState.users.map((user) => {
        if (user.id === userId) {
          return { ...user, showDetails: !user.showDetails };
        }
        return user;
      })
    }));
  };

  render() {
    const { users } = this.state;

    return (
      <div>
        <h1 className={'text-center bg-primary bg-gradient'}>User Cards</h1>
        <div className="card-container">
          {users.map((user) => (
            <div key={user.id}  className={"card text-white bg-dark mb-3 d-inline-block text-center "} style={{"max-width": "200rem", "padding":"30px", "margin":"10px"}}>
            <h4 class="card-title">{user.firstName} {user.lastName}</h4>
            <h6 class="card-subtitle mb-2 text-white">{user.age} {user.gender}</h6>
            <img  width={"100px"} src={user.image} alt="Card image"></img>
              {user.showDetails ? (
                <div className='card-body'>
                <ul className={"list-group list-group-flush"}>
                <li class="list-group-item"><label>Email: </label><input type={'email'} className={'form-control'} value={user.email} readOnly/></li>
                <li class="list-group-item"><label>Phone Number: </label><input type={'text'} value={user.phone} className={'form-control'} readOnly/></li>
                <li class="list-group-item"><label>Username: </label><input type={'text'} className={'form-control'} value={user.username} readOnly/></li>
                <li class="list-group-item"><label>Date Of Birth: </label><input type={'date'} className={'form-control'} value={user.birthDate} readOnly/></li>
                <li class="list-group-item"><label>City: </label><input type={'text'} className={'form-control'} value={user.address["city"]} readOnly/></li>
                <li class="list-group-item"><label>Latitude: </label><input type={'number'} className={'form-control'} value={user.address["coordinates"]["lat"]} readOnly/></li>
                <li class="list-group-item"><label>Longitude: </label><input type={'number'} className={'form-control'} value={user.address["coordinates"]["lng"]} readOnly/></li>
                <li class="list-group-item"><label>Card Expire Date: </label><input type={'text'} className={'form-control'} value={user.bank["cardExpire"]} readOnly/></li>
                <li class="list-group-item"><label>Company: </label><input type={'text'} className={'form-control'} value={user.company["name"]} readOnly/></li>
                </ul><br/>
            <button onClick={() => this.toggleCardDetails(user.id)} className={'btn btn-primary'}>Show Less</button>
                </div>
              ) : (
                <button onClick={() => this.toggleCardDetails(user.id)} className={'btn btn-primary'}>Show More</button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
