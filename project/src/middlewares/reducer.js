function reducer(state, action) {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: true,
                userName: action.payload.userName,
                roomName: action.payload.roomName,
            };
        case 'SET_USERS':
            return {
                ...state,
                joined: true,
                users: action.payload,
            };
        case 'SET_MESSAGES':
            return {
                ...state,
                joined: true,
                messages: action.payload,
            };    
        default:
            return state; 
    }
}

export default reducer;