import React, { useState } from 'react';
import './Auth.css';
import socket from '../../middlewares/socket';

const axios = require('axios');

function Auth() {
    
    const [roomName, setRoomName] = useState('');
    const [userName, setUserName] = useState('');

    const onAuth = () => {
        if (!userName || !roomName) {
            return alert('Введите данные')
        }
        axios.post('/rooms', {
            roomName,
            userName,
        });
    }

    return (
        <div className="auth">
            <div className="auth-container">
                <h2 className="auth-container__title">
                    Пожалуйста, введите ваше имя и название для нового чата
                </h2>
                <form className="auth-container__form">
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
                        className="auth-container__submit-btn"
                        type="button"
                        onClick={onAuth}
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Auth
