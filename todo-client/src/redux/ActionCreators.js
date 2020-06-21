import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addTodo = (todo) => ({
    type: ActionTypes.ADD_TODO,
    payload: todo
});

export const postTodo = (todo) => (dispatch) => {

    console.log(todo);

    return fetch(baseUrl + 'api/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(fetchTodos()))
    .catch(error => { console.log('Post todo ', error.message);
        alert('Your todo could not be posted\nError: '+ error.message); })
}

export const putTodo = (todo) => (dispatch) => {

    return fetch(baseUrl + 'api/todos/' + todo._id, {
        method: 'PUT',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(fetchTodos()))
    .catch(error => { console.log('Put todo ', error.message);
        alert('Your todo could not be put\nError: '+ error.message); })
}

export const deleteTodo = (id) => (dispatch) => {

    return fetch(baseUrl + 'api/todos/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(fetchTodos()))
    .catch(error => { console.log('Put todo ', error.message);
        alert('Your todo could not be put\nError: '+ error.message); })
}

export const fetchTodos = () => (dispatch) => {
    dispatch(todosLoading(true));

    return fetch(baseUrl + 'api/todos')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(todos => dispatch(addTodos(todos)))
        .catch(error => dispatch(todosFailed(error.message)));
}

export const todosLoading = () => ({
    type: ActionTypes.TODOS_LOADING
});

export const todosFailed = (errmess) => ({
    type: ActionTypes.TODOS_FAILED,
    payload: errmess
});

export const addTodos = (todos) => ({
    type: ActionTypes.ADD_TODOS,
    payload: todos
});
