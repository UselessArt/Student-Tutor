import React, { Component } from 'react';
import axios from 'axios';


export default class EditUser extends Component {
  constructor(props) {
    super(props);

    //this.onChange = this.onChangeTitle.bind(this);
    

   
   
   
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      firstname: '',
      surname: '',
      phone: 0,
      email: '',
      addressOne: '',
      addressTwo: '',
      town: '',
      city: '',
      job: '',
      eircode: '',
      dob: '',
      parent: '',
      virtual: '',
      gender: ''
    }


  }
  /*
  title: { type: String, required: true},
  firstname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  surname: { type: String, required: true, minlength: 3},
  phone: { type: Number, required: true},
  email: { type: String, required: true},
  addressOne: { type: String, required: true},
  addressTwo: {type: String, required: false},
  town: { type: String, required: true},
  city: { type: String, required: true},
  eircode: { type: String, required: false},
  
  */

  onChange(e, key) {

    this.setState({
        ...this.state,
        
        [key] : e.target.value
    })
    console.log(this.state)
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
      .then(response => {
        console.log(response)
        this.setState({
            title: response.data.title,
            firstname: response.data.firstname,
            surname: response.data.surname,
            phone: response.data.phone,
            email: response.data.email,
            addressOne: response.data.addressOne,
            addressTwo: response.data.addressTwo,
            town: response.data.town,
            city: response.data.city,
            eircode: response.data.eircode,
            job: response.data.job,
            dob: response.data.dob,
            parent: response.data.parent,
            virtual: response.data.virtual,
            gender: response.data.gender
      
        })   
      })
      .catch(function (error) {
        console.log(error);
      })}
  
  onSubmit(e) {
    e.preventDefault();

    const user = {
        title: this.state.title,
        firstname: this.state.firstname,
        surname: this.state.surname,
        phone: this.state.phone,
        email: this.state.email,
        addressOne: this.state.addressOne,
        addressTwo: this.state.addressTwo,
        town: this.state.town,
        city: this.state.city,
        eircode: this.state.eircode,
        job: this.state.job,
        dob: this.state.dob,
        parent: this.state.parent,
        virtual: this.state.virtual,
        gender: this.state.gender
    }

    console.log(user);

    axios.post('http://localhost:5000/users/update/'+this.props.match.params.id, user)
      .then(() => alert("updated"));

    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <h3>Edit Student</h3>
        <select onChange={(e) => this.onChange(e, "job")}> 
            <option value="tutor">Tutor</option>
            <option value="student">Student</option>
          </select>

          <select onChange={(e) => this.onChange(e, "title")}> 
            <option value="Mx">Mx</option>
            <option value="Ms">Ms</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="other">Other(please specify)</option>
        
          </select>
          {this.state.title === "other" && 
          
          <div className="form-group"> 
            <label>Please Specify: </label>
            <input  type="text"
                required
                className="form-control"
                />
          </div>

        
  }
         
        
          <div className="form-group"> 
            <label>First Name(s): </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.firstname}
                onChange={(e) => this.onChange(e, "firstname")}
                />
          </div>

        
        
          <div className="form-group"> 
            <label>Surname: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.surname}
                onChange={(e) => this.onChange(e, "surname")}
                />
          </div>
        
        
          <div className="form-group"> 
            <label>Phone Number: </label>
            <input  type="number"
                required
                className="form-control"
                value={this.state.phone}
                onChange={(e) => this.onChange(e, "phone")}
            
                />
          </div>
          
          
          <div className="form-group"> 
            <label>Email Address: </label>
            <input  type="email"
                required
                className="form-control"
                value={this.state.email}
                onChange={(e) => this.onChange(e, "email")}
                
                />
          </div>

          
          <div className="form-group"> 
            <label>Address Line 1: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.addressOne}
                onChange={(e) => this.onChange(e, "addressOne")}
                
                />
          </div>
          
          
          <div className="form-group"> 
            <label>Address Line 2: </label>
            <input  type="text"
                className="form-control"
                value={this.state.addressTwo}
                onChange={(e) => this.onChange(e, "addressTwo")}
                
                />
          </div>
          
          
          <div className="form-group"> 
            <label>Town: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.town}
                onChange={(e) => this.onChange(e, "town")}
                
                />
          </div>
          
          
          <div className="form-group"> 
            <label>County/City: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.city}
                onChange={(e) => this.onChange(e, "city")}
                
                />
          </div>
          
          
          <div className="form-group"> 
            <label>EIRCODE: </label>
            <input  type="text"
                className="form-control"
                value={this.state.eircode}
                onChange={(e) => this.onChange(e, "eircode")}
                
                />
          </div>
          {this.state.job === "student" && 
          
          <div className="form-group"> 
            <div className="form-group">
            <label>Date of Birth: </label>
            <input  type="text"
                className="form-control"
                onChange={(e) => this.onChange(e, "dob")}
                />
                </div>
                <div className="form-group">
                <label>Parent/Guardian: </label>
            <input  type="text"
            
                className="form-control"
                onChange={(e) => this.onChange(e, "parent")}
                />
                </div>
                <div className="form-group">
                <label>Permission to Attend Virtually?</label>
            <input  type="text"
                
                className="form-control"
                onChange={(e) => this.onChange(e, "virtual")}
                />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
            <input  type="text"
                
                className="form-control"
                onChange={(e) => this.onChange(e, "gender")}
                />
                </div>
          </div>

        
  }
          
          <div className="form-group">
            <input type="submit" value="Add Student" className="btn btn-primary" />
          </div>
          </form>
      </div>
      
      
    )
  }
}