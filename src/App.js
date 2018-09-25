import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
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
  render() {
    return (
  <main className="main">
    <div className="page-content">
    <RoomList firebase={firebase} />    
    </div>
  </main>
    );
  }
}

export default App;
