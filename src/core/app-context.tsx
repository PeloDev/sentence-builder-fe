import { createContext, useReducer } from 'react';

if (!localStorage.getItem('sentenceAppState')) {
    localStorage.setItem('sentenceAppState', JSON.stringify({ currentSentence: [], loading: false })); // currentSentence - empty array type(interface) Word
}

let initialState = JSON.parse(localStorage.getItem('sentenceAppState') ?? "{}");

export const AppContext = createContext(initialState);

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "add":
            let newStateArr = [...state[action.id], action.value];
            let addState = {
                ...state,
                [action.id]: newStateArr
            }
            localStorage.setItem('sentenceAppState', JSON.stringify(addState));
            return addState;
        case "update":
            let updateState = {
                ...state,
                [action.id]: action.value
            }
            localStorage.setItem('sentenceAppState', JSON.stringify(updateState));
            return updateState;
        case "delete":
            console.log(action);
            console.log(state);
            let delStateArr = state[action.id];
            let tempIdx = -1;
            delStateArr.forEach((item: any, idx: number) => {
                if (item.id === action.value)
                    tempIdx = idx;
            });
            delStateArr.splice(tempIdx, 1);
            let delState = {
                ...state,
                [action.id]: delStateArr
            }
            localStorage.setItem('sentenceAppState', JSON.stringify(delState));
            return delState;
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