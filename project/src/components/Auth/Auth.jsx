import React, { useState } from 'react';
import './Auth.css';
import axios from 'axios';

function Auth({ onLogin }) {
    
    const [roomName, setRoomName] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onAuth = async () => {
        if (!userName || !roomName) {
            return alert('Введите данные')
        }

        const obj = {
            roomName,
            userName,
        };

        setIsLoading(true);

        await axios.post('rooms', obj)
        .then(onLogin);
    };

    return (
        <div className="auth">
            <div className="auth-container">
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
                        onClick={onAuth}
                        disabled={isLoading}
                        type="button"
                        className="auth-container__submit-btn"
                    >
                        { isLoading ? 'Вход...' : 'Войти'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auth
