import React, { useState } from 'react';
import './Auth.css';
import socket from '../../middlewares/socket';

import Axios from 'axios';

function Auth() {
    
    const [roomName, setRoomName] = useState('');
    const [userName, setUserName] = useState('');

    const onAuth = (e) => {
        e.preventDefault();
        if (!userName || !roomName) {
            return alert('Введите данные')
        }
        Axios.post('rooms', {
            roomName,
            userName
        })
            .then(res => res.send(400))
            .catch(err => console.log(err))
    };

    return (
        <div className="auth">
            <form onSubmit={onAuth} className="auth-container">
                <h2 className="auth-container__title">
                    Пожалуйста, введите ваше имя и название для нового чата
                </h2>
                <div className="auth-container__form">
                    <input
                        className="auth-container__input"
                        type="text"
                        minLength="2"
                        maxLength="30"
                        required
                        placeholder="Ваше имя"
                        value={roomName}
                        onChange={e => setRoomName(e.target.value)}
                    />
                    <input 
                        className="auth-container__input"
                        type="text"
                        minLength="1"
                        maxLength="20"
                        required
                        placeholder="Название для нового чата"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className="auth-container__submit-btn"
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Auth
