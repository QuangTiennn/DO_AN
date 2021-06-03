import React from 'react'
import socketIOClient from "socket.io-client";
import * as config from '../constants/Configs';

export const socket = socketIOClient.connect(config.API_URL);
export const SocketContext = React.createContext()
