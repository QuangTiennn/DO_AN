import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socketIOClient from "socket.io-client";


const ENDPOINT = 'http://localhost:9000';
const socket = socketIOClient(ENDPOINT);

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
    chatRoom: { messages },
    messageTempState: { listMessages },
  } = useSelector(currentState => currentState)

  const currentUserId = user?._id

  useEffect(() => {
    socket.on('newMessage-server-sent', (data) => {
      // console.log({ data }, 'admin')
    });
  }, [])

  const handleInputOnChange = (e) => {
    setState(() => ({ [e.target.name]: e.target.value }));
  };

  const handleOnclickSendMsg = () => {
    socket.emit("newMessage-client-sent", {
      id: currentUserId,
      message: state.messageInput
    })
  };

  console.log({ listMessages }, '<--admin--');

  return (
    <div className="chat-area">
      <div className="chat-area-header">
        {/* <img
          className="chat-msg-img"
          // src={`${USER_IMG}/${listChatDetail.userID.avatarUser}`}
          alt=""
        /> */}
        <div className="chat-area-title">
          {/* {listChatDetail.userID.userName} */}
        </div>
      </div>
      {
        messages && Object.keys(messages) && messages?.messages.map((mess) => {
          const { content, userID } = mess
          return (
            <>
              {
                currentUserId !== userID._id ? (
                  <div className="client-mess profile my-profile px-2">
                    <div className="">
                    </div>
                    <div className="message my-message p-2 mb-2"
                      style={{
                        background: 'lightblue',
                        display: 'inline'
                      }}
                    > {content} </div>
                  </div>
                ) : (
                  <div className="admin-mess text-right px-2 mb-3">
                    <div className="profile other-profile">
                      {/* <img src="https://i.pravatar.cc/30"
                                      style={{ borderRadius: '50%' }}
                                      width="30" height="30" alt="" />
                                    <span>Admin</span> */}
                    </div>
                    <div className="message other-message box-chat-admin text-white p-2"
                      style={{
                        background: 'gray',
                        display: 'inline'
                      }}
                    >{content}</div>
                  </div>
                )
              }


            </>
          )
        })
      }


      {
        listMessages && Object.keys(listMessages) && listMessages.map((mess) => {
          const { message, id } = mess
          return (
            <div key={id}>
              {
                currentUserId === id ? (
                  <div className="client-mess profile my-profile px-2">
                    <div className="">
                    </div>
                    <div className="message my-message p-2 mb-2"
                      style={{
                        background: 'lightblue',
                        display: 'inline'
                      }}
                    > {message} </div>
                  </div>
                ) : (
                  <div className="admin-mess text-right px-2 mb-3">
                    <div className="profile other-profile">
                    </div>
                    {
                      message && (
                        <div className="message other-message box-chat-admin text-white p-2"
                          style={{
                            background: 'gray',
                            display: 'inline'
                          }}
                        >{message}</div>
                      )
                    }
                  </div>
                )
              }


            </div>
          )
        })
      }

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

export default memo(ChatDetail);
