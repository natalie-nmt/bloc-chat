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

  showMessageList(){
    if (this.state.activeRoom != null)
    return <div className='navbar navbar-expand-lg navbar-light bg-light'>
    <MessageList 
      firebase={firebase}
      activeRoom={this.state.activeRoom}
      user={this.state.user}/>
    </div>
  }

  render() {
    const setActiveRoom = (room) => this.setState({activeRoom: room});
    const setUser = (user) => this.setState({user: user});
    return (
      <div className="App">
      <User 
        firebase={firebase}
        setUser={setUser}
        user={this.state.user}
      />
      <RoomList 
        firebase={firebase}
        activeRoom={this.state.activeRoom}
        setActiveRoom={setActiveRoom}
      />
        {this.showMessageList()}
      </div>
    );
  }
}

export default App;
