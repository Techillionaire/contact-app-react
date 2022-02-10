const initialState = [
    {
        id: 0,
        name: "Lee Owonikoko",
        email: 'leeowonikoko@yahoo.com',
        number: 8034727475,
    },
    {
        id: 1,
        name: "Nelly Barth",
        email: 'Nellybarth@yahoo.com',
        number: 8034727475,
    }
];


const contactReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_CONTACT':
            state = [...state, action.payload];
            return state;
        case 'UPDATE_CONTACT':
            const updatedState = state.map(contact => contact.id === action.payload.id ? action.payload : contact);
            state = updatedState;    
            return state;
        case 'DELETE_CONTACT':
            const deletedContact = state.filter(contact => contact.id !== action.payload && contact);
                state = deletedContact;
                return state;
        default:
            return state;
    }
};

export default contactReducer;