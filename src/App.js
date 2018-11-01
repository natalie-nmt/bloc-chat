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
    user: null
  };
  }

  showMessageList(){
    if (this.state.activeRoom != null)
    return <div>
    <MessageList 
      firebase={firebase}
      activeRoom={this.state.activeRoom}
      user={this.state.user}
      postAsUser={this.postAsUser.bind(this)}
      />
    </div>
  }

  setActiveRoom(room){
    this.setState({activeRoom:room})
  }

  setUser(user) {
    this.setState({user: user})
  }

  postAsUser() {
    const user = this.state.user
    if (user !== null) {
      return user.displayName;
    }
      return 'Guest';
  }

  render() {
    return (
      <div className="App">
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <User 
        firebase={firebase}
        setUser={this.setUser.bind(this)}
        user={this.state.user}
      />
      </nav>
      <h1>Welcome to Bloc Chat!</h1>
      <p>Sign in and click a room below to get started. Don't see a topic you like? Try creating your own room, instead!</p>
      <RoomList 
        firebase={firebase}
        activeRoom={this.state.activeRoom}
        setActiveRoom={this.setActiveRoom.bind(this)}
      />
        {this.showMessageList()}
      </div>
    );
  }
}

export default App;
