import React, { Component } from 'react'

class User extends Component {
    constructor(props) {
        super(props);
      }

    signInWithPopup = () => {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    signOut = () => {
        this.props.firebase.auth().signOut();
     }

    handleDisplayName = () => {
        if (this.props.newUser === null) {
          return <span>Guest</span>;
        } else {
          return <span>{this.props.newUser.displayName}</span>;
        }
      }

      componentDidMount = () => {
        this.props.firebase.auth().onAuthStateChanged( user => {
          this.props.setUser(user);
        });
      }

    render() {
        return (
            <section className="auth-buttons">
            <span>
            <button className="signin-button" onClick={this.signInWithPopup}>Sign In</button>
            </span>
            <span>
            <button className="signout-button" onClick={this.signOut}>Sign Out</button>
            </span>
            <span className="username">
            {this.handleDisplayName()}
            </span>
            </section>
        );
    }
}
export default User; 