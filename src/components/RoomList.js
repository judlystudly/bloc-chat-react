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
      this.roomsRef.push({
   name: this.state.newRoomName
      });
      this.setState({ newRoomName: ''});	
    }

    handleChange(e) {
      this.setState({ newRoomName: e.target.value })
    }


    render() {
     return ( 
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Bloc Chat</span>
           <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
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
        <main className="main-section">
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric">Available Rooms</th>
          </tr>
         </thead>
					<tbody>
						{this.state.rooms.map((room, index) => 
							<tr key={index}>
								<td className="mdl-data-table__cell--non-numeric">{room.name}</td>
							</tr>
							)
						}
					</tbody>
				</table>
        <div>
          <form action="#" onSubmit={ (e) => this.createRoom(e) }>
          <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
          <label className="mdl-textfield__label">New Room Name...</label>
          </div>
          <div>
          <input type="submit" value="Submit" className="mdl-button mdl-js-button mdl-button--raised"></input>
          </div>
          </form>
          </div>
        </main>
       </div>
      );
    }
  }

export default RoomList;
