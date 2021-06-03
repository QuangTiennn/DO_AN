import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_IMG } from '../../../constants/Service';

class MessageItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSentByCurrentUser: false,
    };
  }

  render() {
    return (
      <div id="chat_messages" className={this.props.userIsLogging.dataUserLogin ? 'my-message' : 'other-message'}>
        <div className="profile other-profile">
          <img alt="" src="" width="30" height="30" />
          <span>Admin</span>
        </div>
        <div className="message other-message" />
        <div className="profile my-profile">
          <span>{this.props.userIsLogging.dataUserLogin ? this.props.userIsLogging.dataUserLogin.user.userName : ''}</span>
          <img
            alt=""
            // src={`${USER_IMG}/${this.props.userIsLogging.dataUserLogin ? this.props.userIsLogging.dataUserLogin.user.avatarUser : ''}`}
            src="https://picsum.photos/200"
            width="30"
            height="30"
          />
        </div>
        <div className="message my-message">aaa</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userIsLogging: state.login,
});

export default connect(mapStateToProps, null)(MessageItem);
