import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
      toggleTodo(todo.id);
    }
  
    return (
      <div className='todo'>
        <label>
          <div className="box">
            <span className="checkmark"></span>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={handleTodoClick}
            />
          </div>
  
          <div className="text">
            {todo.name}
          </div>
        </label>
      </div>
    );
  }
  