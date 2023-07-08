import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Tutorial = props => (
  <tr>
    <td>{props.tutorial.date.substring(0,10)}</td>
    <td>{props.tutorial.time}</td>
    <td>{props.tutorial.students}</td>
    <td>{props.tutorial.tutor}</td>
    <td>{props.tutorial.fee}</td>
    <td>{props.tutorial.tutorialNum}</td>
    <td>{props.tutorial.attendance}</td>
    <td>{props.tutorial.subject}</td>
    <td>{props.tutorial.notes}</td>
    <td>
      <Link to={"/edit/"+props.tutorial._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTutorial(props.tutorial._id) }}>delete</a>
    </td>
  </tr>
)

export default class TutorialList extends Component {
  constructor(props) {
    super(props);

    this.deleteTutorial = this.deleteTutorial.bind(this)

    this.state = {tutorials: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tutorials/')
      .then(response => {
        this.setState({ tutorials: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTutorial(id) {
    axios.delete('http://localhost:5000/tutorials/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      tutorials: this.state.tutorials.filter(el => el._id !== id)
    })
  }

  tutorialList() {
    return this.state.tutorials.map(currenttutorial => {
      return <Tutorial tutorial={currenttutorial} deleteTutorial={this.deleteTutorial} key={currenttutorial._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Tutorial Management</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Students</th>
              <th>Tutor</th>
              <th>Fee (€)</th>
              <th>Tutorial Number </th>
              <th>Attendance</th>
              <th>Subject</th>
              <th>Notes</th>
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