import React from 'react';
import axios from 'axios';
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

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const {data} = await axios.get(`/rooms/${obj.roomName}`);
    setUsers(data.users); 
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    })
  }

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  },[]);

  window.socket = socket;

  console.log(state);

  return (
    <div className="app">{!state.joined ? <Auth onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage} />}</div>
  );
}

export default App;