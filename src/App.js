import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCLVNu0xsYqlMBtz51HBPjoXd3tlFGb4aQ",
    authDomain: "bloc-chat-85a9d.firebaseapp.com",
    databaseURL: "https://bloc-chat-85a9d.firebaseio.com",
    projectId: "bloc-chat-85a9d",
    storageBucket: "bloc-chat-85a9d.appspot.com",
    messagingSenderId: "796603967316"
  };

firebase.initializeApp(config);

class App extends Component {
  constructor(props){
  super(props);
  this.state = {
    activeRoom: null,
    user: null,
  };
  }

/*   setActiveRoom(room) {
    this.setState({activeRoom: room})
}; */

  /* setUser(user) {
    console.log("SetUser is working!")
    // Also include displayName in here? Depends if username/displayName is the same thing...
  } */

  showMessageList(){
    if (this.state.activeRoom != null)
    return <div>
    <MessageList 
      firebase={firebase}
      activeRoom={this.state.activeRoom}/>
    </div>
  }
 
  render() {
    const setActiveRoom = (room) => this.setState({activeRoom: room});
    return (
      <div className="App">
      <User 
        firebase={firebase}
        setUser={this.setUser}
        user={this.state.user}
      />
      <RoomList 
        firebase={firebase}
        activeRoom={this.state.activeRoom}
        setActiveRoom={setActiveRoom}/>
        {this.showMessageList()}
      </div>
    );
  }
}

export default App;
