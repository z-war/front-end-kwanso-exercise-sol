import React from 'react'
import logo from './logo.svg'
import './App.css'
import ListTasks from './compnents/ListTasks'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import CreateTask from './compnents/CreateTask'

function App() {
  return (
    <Router>
      <Route exact path='/'>
        <Redirect to='/list-tasks' />
      </Route>
      <Route exact path='/list-tasks' component={ListTasks}></Route>
      <Route exact path='/create-task' component={CreateTask}></Route>
    </Router>
  )
}

export default App
