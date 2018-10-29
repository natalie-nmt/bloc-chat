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
        return <li className='list-group-item active'>{room.name}</li>
    }
    else {
        return <li className='list-group-item'>{room.name}</li>
    }
};

render () {
    return <div>
    <div id='sidebar'>
        {this.state.rooms.map((room, index) =>
        <ul className='list-group' onClick={() => this.handleClick(room)} key={index}>
            {this.indicateActiveRoom(room, index)}
        </ul>
        )}
    </div>
    <form onSubmit={ (e) => this.handleSubmit(e) }>
        <div id='createRoom'>Room Name: <input type="text" value={this.state.newRoomName} onChange={(e) => this.handleChange(e)}/>
            <input type='submit' className='btn btn-dark' value='Create Room'></input>
        </div>
    </form>
    </div>
    }
}

export default RoomList;
