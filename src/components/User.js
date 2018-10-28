import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
  }

    componentDidMount() {
      this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      });
    }

    handleSignIn() {
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup(provider);
    }

    handleSignOut(){
      this.props.firebase.auth().signOut();
    }

    displayLoggedInUser(){
      const user = this.props.user;
      if (user == null)
        return;
      
      return <p>You're signed in as {user.displayName}.</p>;
    }

    render () {
      const user = this.props.user;
      return <div id='account_management'>
      <button id='sign_in' onClick={() => this.handleSignIn()}>Sign In</button>
      <button id='sign_out' onClick={() => this.handleSignOut()}>Sign Out</button>
      {this.displayLoggedInUser()}
      </div>
      }

}

export default User;
