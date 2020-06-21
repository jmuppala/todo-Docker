import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, putTodo, deleteTodo } from '../redux/ActionCreators';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
}));

export default function TodoList() {
  const classes = useStyles();

  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  console.log(todos);

  useEffect(() => {
    if (todos.todos === null && todos.errMess === null && !todos.isLoading)
      dispatch(fetchTodos())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todos] );

  const handleToggle = (todo) => () => {

    if (todo.completed) {
      todo.completed = false;
    } else {
      todo.completed = true;
    }

    dispatch(putTodo(todo));

  };

  const handleDelete = (todo) => () => {
    dispatch(deleteTodo(todo._id));
  }

  if (todos.isLoading) {
      return(
          <div className={classes.root}>
            Loading . . .
          </div>
      );
  }
  else if (todos.errMess) {
      return(
        <div className={classes.root}>
          <h4>{todos.errMess}</h4>
        </div>
      );
  }
  else if (todos.todos !== null) {
    return (
      <React.Fragment>
      <List className={classes.root}>
        {todos.todos.filter((todo) => !todo.completed).map((todo) => {
          return (
            <ListItem key={todo._id} role={undefined} dense button onClick={handleToggle(todo)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': todo._id }}
                />
              </ListItemIcon>
              <ListItemText id={todo._id} primary={todo.title} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments" onClick={handleDelete(todo)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <List className={classes.root}>
        {todos.todos.filter((todo) => todo.completed).map((todo) => {
          return (
            <ListItem key={todo._id} role={undefined} dense button onClick={handleToggle(todo)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': todo._id }}
                />
              </ListItemIcon>
              <ListItemText id={todo._id} style={{textDecoration: 'line-through'}} primary={todo.title} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments" onClick={handleDelete(todo)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      </React.Fragment>
    );
  }  
  else {
    return(
      <div className={classes.root}>
        <h4>Null</h4>
      </div>
    );
}
}
