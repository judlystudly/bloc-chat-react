import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = {
      messages: [],
      newMessage: ''
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;		
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  createMessage = (e) => {
    this.messagesRef.push({
      content: this.state.newMessage,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.newUser.displayName
    });
    e.preventDefault();
		this.setState({newMessage: ''});
  }

  handleNewMessageChange(e) {
    this.setState({ newMessage: e.target.value })
  }

  render() {
    return(
      <main>
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp message-table">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric user-name-title">User Name</th>
            <th className="message-title">Message</th>
            <th className="date-time-title">Date/time</th>
          </tr>
        </thead>
        <tbody>
        {this.state.messages.filter(message =>
              message.roomId === this.props.activeRoom.key).map((message, index) => 
                <tr key={index}>
                  <td className="mdl-data-table__cell--non-numeric">{message.username}</td>
                  <td className="mdl-data-table__cell--non-numeric">{message.content}</td>
                  <td className="mdl-data-table__cell--non-numeric">{message.sentAt}</td>
                </tr>
              )
            }
        </tbody>
      </table>
      <footer className="message-footer">
      <form onSubmit={ (e) => this.createMessage(e) }>
      <span className="mdl-textfield mdl-js-textfield message-box">
      <input className="mdl-textfield__input message-input" type="text" value={ this.state.newMessage } onChange={ (e) => this.handleNewMessageChange(e) } />
      <label className="mdl-textfield__label">New message...</label>
      </span>
      <span>
      <input type="submit" value="Submit" className="mdl-button mdl-js-button mdl-button--raised message-submit"></input>
      </span>
      </form>
      </footer>
      </main>
    );
  }
}

export default MessageList;