import { createContext, useReducer } from 'react';

if (!localStorage.getItem('appState')) {
    localStorage.setItem('appState', JSON.stringify({ currentSentence: []})); // currentSentence - empty array type(interface) Word
}

let initialState = JSON.parse(localStorage.getItem('appState') ?? "{}");

export const AppContext = createContext(initialState);

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "update":
            let newState = {
                ...state,
                [action.id]: action.value
            }
            localStorage.setItem('appState', JSON.stringify(newState));
            return newState;
        case "loading":
            return {
                ...state,
                loading: state ? !state.loading : true
            };
        case "setLoading":
            return {
                ...state,
                loading: true
            };
        case "unsetLoading":
            return {
                ...state,
                loading: false
            };
        case "setState":
            return action.state;
        default:
            throw new Error();
    }
};

export const StateProvider = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    );
}