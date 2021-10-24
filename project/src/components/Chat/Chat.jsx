import React from 'react';
import './Chat.css';
import socket from '../../middlewares/socket';

function Chat({ users, messages, userName, roomName, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messageRef = React.useRef(null);

  const onMessageSend = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomName,
      text: messageValue,
    });
    onAddMessage({
      userName,
      text: messageValue,
    });
    setMessageValue('');
  }; 

  React.useEffect(() => {
    messageRef.current.scrollTo(0, 99999);
  },[messages]);
  
  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomName}</b>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
             <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messageRef} className="messages">
          {
            messages.map((message) => 
            (
              <div className="message">
                <p>{message.text}</p>
                <div>
                  <span>{message.userName}</span>
                </div>
              </div>
            ))
          }
        </div>
        <form>
          <textarea
            onChange={e => setMessageValue(e.target.value)}
            value={messageValue}
            className="form-control"
            rows="3"></textarea>
          <button 
            onClick={onMessageSend}
            type="button"
            className="btn btn-primary">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;