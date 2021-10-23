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
    users: [0],
    messages: [],
  });

  const onLogin = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  React.useEffect(() => {
    socket.on('ROOM:JOINED', setUsers);
    socket.on('ROOM:SET_USERS', setUsers);
  },[]);

  window.socket = socket;

  console.log(state);

  return (
    <div className="app">{!state.joined ? <Auth onLogin={onLogin}/> : <Chat {...state}/>}</div>
  );
}

export default App;