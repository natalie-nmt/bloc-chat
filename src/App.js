import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
      <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
