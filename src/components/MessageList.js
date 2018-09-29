import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = {
      messages: [],
      newMessage: {username: '', content: '', roomId: '', sentAt: ''},
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



  render() {
    return(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric">User Name</th>
            <th>Message</th>
            <th>Date/time</th>
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
   
    )
  }
}

export default MessageList;