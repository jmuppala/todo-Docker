import React from 'react';
import NavBar from './components/NavBar';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Container from '@material-ui/core/Container';

const store = ConfigureStore();

function App() {

  return (
    <Provider store={store}>
      <CssBaseline />
      <Container fixed>
        <NavBar />
        <TodoList />
        <AddTodo />
      </Container>
    </Provider>
  );
}

export default App;
