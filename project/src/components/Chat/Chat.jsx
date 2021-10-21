import React from 'react';
import './Chat.css';
import socket from '../../middlewares/socket';

function Chat({ users, messages }) {
  const [messageValue, setMessageValue] = React.useState('');

  console.log(users);
  
  return (
    <div className="chat">
      <div className="chat-users">
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
             <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages">
            <div className="message">
              <p>Привет всем! Пытаюсь сделать свой чат! =)</p>
              <div>
                <span>Test User</span>
              </div>
            </div>
            <div className="message">
              <p>Привет всем! Пытаюсь сделать свой чат! =)</p>
              <div>
                <span>Test User</span>
              </div>
            </div>
        </div>
        <form>
          <textarea
            onChange={e => setMessageValue(e.target.value)}
            value={messageValue}
            className="form-control"
            rows="3"></textarea>
          <button type="button" className="btn btn-primary">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;