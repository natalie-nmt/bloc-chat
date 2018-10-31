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
      if (user === null) {
        return <span>Click to sign in with Gmail. <button id='sign_in' className='btn btn-dark' onClick={() => this.handleSignIn()}>Sign In</button></span>;
      }
        return <span>You're signed in as {user.displayName}. <button id='sign_out' className='btn btn-dark' onClick={() => this.handleSignOut()}>Sign Out</button></span>
    }

    render () {
      return <div id='account_management'>
      {this.displayLoggedInUser()}
      </div>
      }

}

export default User;
