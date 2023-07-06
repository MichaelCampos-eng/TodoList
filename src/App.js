import React, { useState, useRef, useEffect} from 'react'
import Todolist from './Todolist'
import { v4 as uuidv4} from 'uuid'
import './CustomButton.css'
import './Mars.css'
import './General.css'
import './Content.css'
import './Space.css'


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState( [] ) 
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) return setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value
    if (name === '') return

    const statusCount = document.getElementById("statusCount")
    const statusFull = document.getElementById("statusFull")
    if (todos.length >= 10) {
      statusFull.classList.add('transition-statusFull');
      statusCount.classList.add('transition-statusCount');

      statusFull.addEventListener('animationend', function() {
        statusFull.classList.remove('transition-statusFull');
      });

      statusCount.addEventListener('animationend', function() {
        statusCount.classList.remove('transition-statusCount');
      });
      
      return 
    }

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  
  return (
    <>
      
      <body>
        <div class='star'></div>
        <div class='star'></div>
        <div class='star'></div>
        <div class='star'></div>
        <div class='star'></div>
        <div class='star'></div>
        <div class='star'></div>
        

        <div class = "container" id="container">

          <div class="content" id="content">

            <div className='list'> 
              <Todolist todos={todos} toggleTodo={toggleTodo}/>
            </div>

            <div class="bottom">
              <input class="custom-input" ref={todoNameRef} type='text' maxLength={35} />
              <div className="button-container">
                <button className="custom-button" onClick={handleAddTodo}> Add Todo </button>
                <button className="custom-button" onClick={handleClearTodos}> Clear Completed Todos </button>
              </div>

              <div className='status'>
                <div id='statusCount'> {todos.filter(todo => !todo.complete).length} MAR to do!</div>
                <div id='statusFull'> Full! </div>
              </div>

              
            </div>
          </div>

          <div class="env">
            <div class="planet">
              <div class="mars">
                <div class="img-map"></div>
                <div class="mask"></div>
              </div>
            </div>
          </div>
          

        </div>

      
        

      </body>

    </>
  )
}

export default App;
