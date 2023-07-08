import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditTutorial extends Component {
  constructor(props) {
    super(props);
    

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      date: new Date(),
      time: 0,
      students: [],
      tutor: '',
      fee: 0,
      tutorialNum: 0,
      attendance: '',
      subject: '',
      notesOn: 'No Notes',
      notes: '',
      loadedStudents: []
    }
  }
  /*
  date: { type: Date, required: true },
  time: { type: Number, required: true },
  students: { type: String, required: true },
  tutor: { type: String, required: true },
  fee: { type: Number, required: true },
  tutorialNum: { type: Number, required: true },
  attendance: { type: String, required: true },
  subject: { type: String, required: true },
  notes: { type: String, required: true }
  

  */
  componentDidMount() {
    axios.get('http://localhost:5000/tutorials/'+this.props.match.params.id)
      .then(response => {
        console.log(response)
        this.setState({
          date: new Date(response.data.date),
          time: response.data.time,
          students: response.data.students,
          tutor: response.data.tutor,
          fee: response.data.fee,
          tutorialNum: response.data.tutorialNum,
          attendance: response.data.attendance,
          subject: response.data.subject,
          notes: response.data.notes,
      
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            loadedStudents: response.data.map(user => user.firstname),
      
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }

    onChange(e, key) {
      if(key === "students")
      {
        this.setState({
          ...this.state,
          
          [key] : [...e.target.selectedOptions].map(o => o.value)
      })
      }
      else { this.setState({
          ...this.state,
          
          [key] : e.target.value
      })
    }
      console.log(this.state)
    }

  onChangeDate(date) {
    this.setState({
      date: date
    })
    console.log(this.state)
  }

  

  onSubmit(e) {
    e.preventDefault();

    const tutorial = {
      date: this.state.date,
      time: this.state.time,
      students: this.state.students,
      tutor: this.state.tutor,
      fee: this.state.fee,
      tutorialNum: this.state.tutorialNum,
      attendance: this.state.attendance,
      subject: this.state.subject,
      notes: this.state.notes

    }

    console.log(tutorial);

    axios.post('http://localhost:5000/tutorials/update/'+this.props.match.params.id, tutorial)
      .then(() => alert("updated!"));

  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <h3>Update Tutorial</h3>
          <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
  
         
          <div className="form-group"> 
            <label>Tutorial Time: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.time}
                onChange={(e) => this.onChange(e, "time")}
                />
          </div>

          <div className="form-group"> 
          <label>Students: </label>
          <select ref="userInput"
              required
              multiple
              className="form-control"
              value={this.state.students}
              onChange={(e) => this.onChange(e, "students")}>
              {
                this.state.loadedStudents.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
          </div>
        
        
          <div className="form-group"> 
            <label>Tutor: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.tutor}
                onChange={(e) => this.onChange(e, "tutor")}
            
                />
          </div>
          
          
          <div className="form-group"> 
            <label>Fee (€): </label>
            <input  type="number"
                required
                className="form-control"
                value={this.state.fee}
                onChange={(e) => this.onChange(e, "fee")}
                
                />
          </div>

          
          <div className="form-group"> 
            <label>Tutorial Number: </label>
            <input  type="number"
                required
                className="form-control"
                value={this.state.tutorialNum}
                onChange={(e) => this.onChange(e, "tutorialNum")}
                
                />
          </div>
          
          
          <div className="form-group"> 
          <select onChange={(e) => this.onChange(e, "attendance")} required> 
            <option value="Attending">Attending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>
          </div>
         
          
          
          <div className="form-group"> 
          <select onChange={(e) => this.onChange(e, "subject")} required> 
            <option value="English">English</option>
            <option value="Irish">Irish</option>
            <option value="Maths">Maths</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
            <option value="Computer Science">Computer Science</option>
          </select>
          </div>
          
        
          
          
          <div className="form-group"> 
          <select onChange={(e) => this.onChange(e, "notesOn")}> 
            <option value="No Notes">No Notes</option>
            <option value="Notes">Notes</option>
          </select>
          </div>

          {this.state.notesOn === "Notes" && 
          
          <div className="form-group"> 
            <label>Take Notes Here: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.notes}
                onChange={(e) => this.onChange(e, "notes")}
                />
          </div>

        
  }
  
          
          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
          </form>
      </div>
      
      
    )
  }
}