import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        rooms: [],
        newRoomName: '',
      };
    
    this.roomsRef = this.props.firebase.database().ref('rooms');
    
    };
    
componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat(room) });
     });
   };

handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newRoomName) { return }
    const newRoomName = this.state.newRoomName;
    this.roomsRef.push({name: newRoomName});
    this.setState({ newRoomName: ''}) 
}

handleClick(room) {
    this.props.setActiveRoom(room);
};

indicateActiveRoom(room) {
    const activeRoom = this.props.activeRoom;
    if (room === activeRoom) {
        return <span>x</span>
    }
    else {
        return <span>o</span>
    }
};

render () {
    return <div id='roomList'>
   <form onSubmit={ (e) => this.handleSubmit(e) }>
    Room Name:<input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
    <input type='submit' value='Create Room'></input>
   </form>
    <table>
        <tbody>
            {this.state.rooms.map((room, index) =>
            <tr onClick={() => this.handleClick(room)} key={index}>
                <td>{this.indicateActiveRoom(room, index)}</td>
                <td>{room.name}</td>
            </tr>
            )}
        </tbody>
    </table>
    </div>
    }
}

export default RoomList;
