import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCSzNWfi-YNN7SNsYJr1Na5nN7gvmsCsVY",
  authDomain: "bloc-chat-react-697e7.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-697e7.firebaseio.com",
  projectId: "bloc-chat-react-697e7",
  storageBucket: "bloc-chat-react-697e7.appspot.com",
  messagingSenderId: "417319142991"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);

this.state = {
    activeRoom: {},
    newUser: {}
  };
}

setActiveRoom = (room) => {
  this.setState({activeRoom: room});
}
setUser = (user) => {
  this.setState({newUser: user});
}

  render() {
    return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
                mdl-layout--fixed-header">
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <div className="mdl-layout-spacer"></div>
          <div className="user-auth"><User firebase={firebase} setUser={this.setUser} newUser={this.state.newUser}/></div>
              <i className="material-icons">person</i>           
            </div>
      </header>
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Bloc Chat</span>
        <nav className="mdl-navigation">
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom}/>
        </nav>
      </div>
      <main className="mdl-layout__content">
        <div className="page-content"><MessageList firebase={firebase} activeRoom={this.state.activeRoom} newUser={this.state.newUser}/></div>
      </main>
    </div>
      )
    }
  }

export default App;
