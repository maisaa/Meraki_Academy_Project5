const initialState = { sports: [], }

const sportReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_SPORTS':
            return { sports: [...payload] };
        case 'ADD_SPORT':
            return { sports: [...state.sports, payload] };
        case 'UPDATE_SPORT':
            return state.sports.map((elem) => {
                if (elem.id === payload.id) {
                    return payload;
                }
                return elem;
            })
        case 'DELETE_SPORT':
            return state.sports.filter((elem) => elem.id !== payload);
        case 'GET_SPORT':
            return state.sports.filter((elem) => elem.id === payload);
        default:
            return state;
    }
}
export default sportReducer;
//Actions
export const setSports = (sports) => {
    return { type: 'SET_SPORTS', payload: sports }
};
export const addSport = (newSport) => {
    return { type: 'ADD_SPORT', payload: newSport }
};
export const updateSport = (sport) => {
    return { type: 'UPDATE_SPORT' }
};
export const deleteSport = (sport) => {
    return { type: 'DELETE_SPORT' }
};
export const getSport = (sport) => {
    return { type: 'GET_SPORT' }
};
