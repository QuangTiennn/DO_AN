import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { actFetchChatRoomByIDReq } from '../../../actions/actChat';
import { USER_IMG } from '../../../constants/Service';


const ChatDetail = () => {
  const [state, setState] = useState({
    idChatRoom: '',
    messageInput: '',
    messages: [],
    nameRoom: '',
    userID: '',
  });

  const { chatRoom: { chatRooms },
  login: { dataUserLogin: { user } },
  currentUserState } = useSelector(currentState => currentState)


  const showMsg = (msg) => {
    let result = null;
    const arrMsg = msg.messageID.messages;
    result = arrMsg.map((msgItem, index) => {
      if (msgItem !== undefined) {
        return (
          <div className="chat-area-main">
            <div className="chat-msg">
              <div className="chat-msg-profile">
                <img
                  className="chat-msg-img"
                  src={`${USER_IMG}/${msg.userID.avatarUser}`}
                  alt=""
                />
                <div className="chat-msg-date">
                  message was sent at
                  {msg.messageID.TimeSendMessage}
                </div>
              </div>
              <div className="chat-msg-content" key={index}>
                <div className="chat-msg-text">{msgItem}</div>
              </div>
            </div>
            <div className="chat-msg owner">
              <div className="chat-msg-profile">
                <img
                  className="chat-msg-img"
                  src={`${USER_IMG}/${user.avatarUser}`}
                  alt=""
                />
                <div className="chat-msg-date">Message seen 2.50pm</div>
              </div>
              <div className="chat-msg-content">
                <div className="chat-msg-text">
                  Tincidunt arcu non sodales😂
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
    return result;
  };

  const handleInputOnChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
    });
  };

  const handleOnclickSendMsg = () => {

  };
  return (
    <div className="chat-area">
      <div className="chat-area-header">
        <img
          className="chat-msg-img"
          // src={`${USER_IMG}/${listChatDetail.userID.avatarUser}`}
          alt=""
        />
        <div className="chat-area-title">
          {/* {listChatDetail.userID.userName} */}
        </div>
      </div>
      {/* {showMsg(listChatDetail)} */}
      <div className="chat-area-footer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-video"
        >
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-image"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-plus-circle"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-paperclip"
        >
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
        </svg>
        <input
          type="text"
          placeholder="Type something here..."
          name="messageInput"
          value={state.messageInput}
          onChange={handleInputOnChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-smile"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-thumbs-up"
        >
          <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
        </svg>
        <div
          style={{ marginLeft: '10px' }}
          id="send"
          type="submit"
          onClick={handleOnclickSendMsg}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-thumbs-up"
          >
            <path
              fill="#006ae3"
              d="M2,21L23,12L2,3V10L17,12L2,14V21Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ChatDetail;
