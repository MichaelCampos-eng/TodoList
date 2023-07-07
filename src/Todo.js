import React from 'react'
import CustomTimer from './CustomTimer'
import {IoTimerOutline} from 'react-icons/io5';

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

          <div className="customTimer">
            <div className='icon'>
              <IoTimerOutline/>
            </div>
            <div className='subwindow'>
              <CustomTimer/>
            </div>
          </div>

        </label>
      </div>
    );
  }
  