import * as ActionTypes from './ActionTypes';

export const Todos = (state = {
        isLoading: false,
        errMess: null,
        todos: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_TODOS:
            return {...state, isLoading: false, errMess: null, todos: action.payload};

        case ActionTypes.TODOS_LOADING:
            return {...state, isLoading: true, errMess: null, todos: null};

        case ActionTypes.TODOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, todos: null};

        default:
            return state;
    }
}