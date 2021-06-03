import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { SocketContext } from '../../../context/socket';
import socketIOClient from "socket.io-client";

import { actCreateChatRoomReq, actionGetAllMessageReq } from '../../../actions/actChat';
import { actionGetCurrentUser } from '../../../actions/actCurrentUser';

import './chat-client.scss';
import { Button } from 'react-bootstrap';
import { saveMessAction } from '../../../actions/saveMessAction';

const ENDPOINT = 'http://localhost:9000';

const ChatClient = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    messageInput: '',
    newMessages: [],
    myMessage: [],
    nameRoom: '',
    userID: ''
  });

  // const socket = useContext(SocketContext);

  const { login: { isLogin, dataUserLogin = {} } } = useSelector(currentState => currentState);
  const currentUserId = dataUserLogin?.user?._id

  useEffect(() => {
    dispatch(actionGetAllMessageReq())
    dispatch(actionGetCurrentUser(currentUserId));

  }, [dispatch, currentUserId]);

  const {
    login: { token },
    currentUserState: { currentUser: { chatRoomID } },
    currentUserState,
    chatRoom: { messages },
    messageTempState: { listMessages }
  } = useSelector(currentState => currentState);

  const socket = socketIOClient(ENDPOINT);

  console.log({ currentUserState })

  useEffect(() => {
    socket.on('newMessage-server-sent', (arg) => {
      dispatch(saveMessAction(arg))
    });
  }, [])

  const handleInputOnChange = (e) => {
    setState(cS => ({ ...cS, [e.target.name]: e.target.value }))
  };

  const handleConnect = () => {
    dispatch(actCreateChatRoomReq({
      userID: currentUserId,
      roomMaster: 'admin',
      content: 'hello'
    })).then(() => {
      dispatch(actionGetCurrentUser(currentUserId));
    })

  }
  const handleButtonSendMessage = (e) => {
    e.preventDefault();
    socket.emit("newMessage-client-sent", {
      id: currentUserId,
      message: state.messageInput
    })
  }

  if (token) {
    return (
      <>
        <div className="flexbox">
          <div className="chat-box">
            <div className="chat-box-header">
              <h3>
                Contact
                <br />
              </h3>
            </div>
            {
              !chatRoomID && token ? (
                <Button onClick={handleConnect} variant="secondary" className="text-dark fs-18">Chat now</Button>
              ) : (
                <>
                  {/* chat body */}
                  <div id="chat_box_body" className="chat-box-body">
                    {
                      messages && Object.keys(messages) && messages?.messages.map((mess) => {
                        const { content, userID } = mess
                        return (
                          <div key={content}>
                            {
                              currentUserId === userID._id ? (
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


                          </div>
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


                  </div>

                  <div id="typing">
                    <div>
                      <span className="n">Someone</span> is typing...
              </div>
                  </div>
                  <div className="chat-box-footer">
                    <input
                      id="chat_input"
                      placeholder="Enter your message here..."
                      name="messageInput"
                      value={state.messageInput}
                      onChange={handleInputOnChange}
                    />
                    <button
                      id="send"
                      type="submit"
                      onClick={handleButtonSendMessage}
                    >
                      <svg
                        style={{ width: '24px', height: '24px' }}
                        viewBox="0 0 24 24"
                      >
                        <path fill="#006ae3" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                      </svg>
                    </button>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </>
    );
  }
  return (
    <></>
  );
}

export default memo(ChatClient);
