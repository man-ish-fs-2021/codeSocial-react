import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typedMessage: '',
    };
    this.socket = io.connect('http://54.237.158.65:5000');
    // console.log(this.socket);
    this.userEmail = props.user.email;
    // console.log(this.userEmail);
    if (this.userEmail) {
      this.setupConnections();
    }
  }
  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;
    this.socket.on('connect', function () {
      console.log('Connection established');
      socketConnection.emit('join_room', {
        user_email: self.userEmail,
        chatroom: 'codeial',
      });
      socketConnection.on('user_joined', function (data) {
        console.log('new user connection', data);
      });
    });
    this.socket.on('receive_message', function (data) {
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;
      if (self.userEmail === data.user_email) {
        messageObject.self = true;
      }
      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };
  handleSubmit = () => {
    const typedMessage = this.state;
    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
    }
  };
  render() {
    const { messages, typedMessage } = this.state;
    return (
      <div className="chat-container">
        <div className="chat-header">Chat</div>
        <div className="chat-messages">
          {messages.map((message) => {
            <div
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>;
          })}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Send</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Chat);
