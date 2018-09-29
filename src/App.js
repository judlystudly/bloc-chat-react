import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import firebase from 'firebase/app';
import 'firebase/database';

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
    activeRoom: {}
  };
}

setActiveRoom = (room) => {
  this.setState({activeRoom: room});
}

  render() {
    return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
                mdl-layout--fixed-header">
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <div className="mdl-layout-spacer"></div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                      mdl-textfield--floating-label mdl-textfield--align-right">
            <label className="mdl-button mdl-js-button mdl-button--icon"
                   for="fixed-header-drawer-exp">
              <i className="material-icons">person</i>
            </label>
            <div className="mdl-textfield__expandable-holder">
              <input className="mdl-textfield__input" type="text" name="sample"
                     id="fixed-header-drawer-exp" />
            </div>
          </div>
        </div>
      </header>
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Bloc Chat</span>
        <nav className="mdl-navigation" align="right">
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom}/>
        </nav>
      </div>
      <main className="mdl-layout__content">
        <div className="page-content"><MessageList firebase={firebase} activeRoom={this.state.activeRoom}/></div>
      </main>
    </div>
      )
    }
  }

export default App;
