import React, { createContext, useEffect, useState} from 'react';
import socketIoClient from 'socket.io-client';

//SETTING GLOBAL SOCKET CONNECTION
export const SocketContext = createContext();

const WS = `${process.env.REACT_APP_API_BASE_URL}`;

const socket = socketIoClient(WS);

export const SocketContextProvider =  ({children}) => {
    return (
    <SocketContext.Provider  value={{socket}}>
        {children}
    </SocketContext.Provider>
    );
};

