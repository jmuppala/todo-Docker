import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { postTodo } from '../redux/ActionCreators';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: '30px 0',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
    },
  }));

export default function AddTodo() {
    const classes = useStyles();

    const [todoItem, setTodoItem] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postTodo({title: todoItem, completed: false}));
        setTodoItem('');
    }

    return(
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField label="Add To Do Item Here" value={todoItem} onChange={event => setTodoItem(event.target.value)} />
        </form>
    );

}