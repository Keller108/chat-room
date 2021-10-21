import React from 'react';
import './App.css';
import reducer from '../../middlewares/reducer.js';
import Auth from '../Auth/Auth';
import Chat from '../../components/Chat/Chat';
import socket from '../../middlewares/socket';

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    userName: null,
    roomName: null,
    users: [],
    messages: [],
  });

  const onLogin = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
  };

  React.useEffect(() => {
    socket.on('ROOM:JOINED', (users) => {
      dispatch({
        type: 'SET_USERS',
        payload: users,
      })
    });
  },[]);

  window.socket = socket;

  return (
    <div className="app">{!state.joined ? <Auth onLogin={onLogin}/> : <Chat {...state}/>}</div>
  );
}

export default App;