function reducer(state, action) {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: true,
                userName: action.payload.userName,
                roomName: action.payload.roomName,
            };
        default:
            return state; 
    }
}

export default reducer;