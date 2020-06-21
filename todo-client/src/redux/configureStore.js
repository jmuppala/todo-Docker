import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Todos } from './todos';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            todos: Todos
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}