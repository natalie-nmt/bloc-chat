import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        messages: [],
        newMessage: '',
    };
    
      this.messagesRef = this.props.firebase.database().ref('messages');
      };
    
    componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          this.setState({ messages: this.state.messages.concat(message) });
       });
     };

    handleChange(e) {
      this.setState({ newMessage: e.target.value })
    }

    handleSubmit(e) {
      e.preventDefault();
      if (!this.state.newMessage) { return }
      var currentdate = new Date(); 
      var timestamp = "Posted on " + (currentdate.getMonth()+1)  + "/"
          + currentdate.getDate() + "/"
          + currentdate.getFullYear() + " @ "  
          + currentdate.getHours() + ":"  
          + currentdate.getMinutes()
      this.messagesRef.push({
          content: this.state.newMessage,
          roomId: this.props.activeRoom.key, 
          sentAt: timestamp, 
          username: this.props.user.displayName});
      this.setState({ newMessage: ''})
    }

    render () {
      const activeRoomId = this.props.activeRoom.key;
      const filteredMessages = this.state.messages.filter(function (message) {
        return message.roomId === activeRoomId;
      });
      return <div id='messageListDiv'>
        <table id='messageList'>
            <tbody>
                {filteredMessages.map((message, index) =>
                <tr className='message' key={index}>
                    <td className='messageUsername'>{message.username}</td>
                    <td className='messageContent'>{message.content}</td>
                    <td className='messageTimestamp'>{message.sentAt}</td>
                </tr>
                )}
            </tbody>
        </table>
      <form id='submitMessage' onSubmit={ (e) => this.handleSubmit(e) }>
      New Message: <input id='textarea' type='textarea' value={this.state.newMessage} onChange={(e) => this.handleChange(e)} />
      <input className='btn btn-dark' type='submit' value='Send'></input>
      </form>
      </div>
    }
  }

export default MessageList;