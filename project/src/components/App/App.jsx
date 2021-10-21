import React from 'react';
import './App.css';
import reducer from '../../middlewares/reducer.js';
import Auth from '../Auth/Auth';
import socket from '../../middlewares/socket';

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    userName: null,
    roomName: null,
  });

  const onLogin = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
  };

  window.socket = socket;

  console.log(state);

  return (
    <div className="app">{!state.joined && <Auth onLogin={onLogin} />}</div>
  );
}

export default App;