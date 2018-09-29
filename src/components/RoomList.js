import React, { Component } from 'react';

class RoomList extends Component { 
    constructor(props) {
        super(props);

    this.state = {
        rooms: [],
        newRoomName: ''
      };
    
      this.roomsRef = this.props.firebase.database().ref('rooms');

    }
    
    componentDidMount() {
            this.roomsRef.on('child_added', snapshot => {
                const room = snapshot.val();
                room.key = snapshot.key;
                this.setState({ rooms: this.state.rooms.concat(room) });
              });
      }
    
    createRoom(e){
      e.preventDefault();
      if (!this.state.newRoomName) { return }
      this.roomsRef.push({ name: this.state.newRoomName });
      this.setState({ newRoomName: ''});	
    }

    handleChange(e) {
      this.setState({ newRoomName: e.target.value })
    }


    render() {
     return ( 
         <main className="main-section" align="center">
         <div className="available-rooms">
          <header>Available Rooms</header>
          <nav className="all-rooms">
						{this.state.rooms.map((room, index) => 
							<ul key={index} onClick={() => this.props.setActiveRoom(room)}>
								<li className="mdl-data-table__cell--non-numeric">{room.name}</li>
							</ul>
							)
						}
					</nav>
           </div>
        <div>
          <form action="#" onSubmit={ (e) => this.createRoom(e) }>
          <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
          <label className="mdl-textfield__label">Create a new room...</label>
          </div>
          <div>
          <input type="submit" value="Submit" className="mdl-button mdl-js-button mdl-button--raised"></input>
          </div>
          </form>
          </div>
        </main>
      );
    }
  }

export default RoomList;
