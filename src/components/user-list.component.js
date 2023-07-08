import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Student = props => (
  <tr>
    <td>{props.user.firstname}</td>
    <td>{props.user.surname}</td>
    <td>{props.user.email}</td>
    
    
    
    <td>
      <Link to={"/edituser/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTutorial(props.user._id) }}>delete</a>
    </td>
  </tr>
)

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.deleteTutorial = this.deleteTutorial.bind(this)

    this.state = {user: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then(response => {
        this.setState({ user: response.data })
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTutorial(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      user: this.state.user.filter(el => el._id !== id)
    })
  }

  tutorialList() {
    return this.state.user.map(currenttutorial => {
      return <Student user={currenttutorial} deleteTutorial={this.deleteTutorial} key={currenttutorial._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>User Management</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>FirstName</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Update</th>
              
            </tr>
          </thead>
          <tbody>
            { this.tutorialList() }
          </tbody>
        </table>
      </div>
    )
  }
}