import React, { Component } from 'react';

class RoomList extends Component { 
    constructor(props) {
        super(props);

    this.state = {
        rooms: []
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

    render() {
     return ( 
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Bloc Chat</span>
           <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
            {this.state.rooms.map((room, index) => 
            <a className="mdl-navigation__link" key={index} href="">{room.name}</a>
							)}
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Options</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">Create Room</a>
            <a className="mdl-navigation__link" href="">Delete Room</a>
          </nav>
        </div>
       </div>
      );
    }
  }

export default RoomList;
