import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import TutorialList from "./components/tutorial-list.component";
import EditTutorial from "./components/edit-tutorial.component";
import CreateTutorial from "./components/create.tutorial.component";
import CreateUser from "./components/create-user.component";
import UserList from "./components/user-list.component";
import EditUser from './components/update-user.component';



function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={TutorialList} />
      <Route path="/userList" exact component={UserList} />
      <Route path="/edit/:id" component={EditTutorial} />
      <Route path="/edituser/:id" component={EditUser} />
      <Route path="/create" component={CreateTutorial} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;