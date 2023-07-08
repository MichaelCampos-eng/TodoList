import React from 'react'
import CustomTimer from './CustomTimer'
import {IoTimerOutline} from 'react-icons/io5';

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
      toggleTodo(todo.id);
    }


    function handleToWindow() {
  
      const icon = document.getElementById("icon-" + todo.id)
      const window = document.getElementById("subWindow-" + todo.id)

      icon.classList.add('icontowindow-icon');
      window.classList.add('icontowindow-window');

      icon.addEventListener('animationend', function () {
        icon.classList.remove('icontowindow-icon');
        icon.style.opacity = '0';
        icon.style.zIndex = '1';
      });
    
      window.addEventListener('animationend', function () {
        window.classList.remove('icontowindow-window');
        window.style.opacity = '1';
        window.style.zIndex = '2';
      });
        
      return 
    }

    function handleToIcon() {
      const icon = document.getElementById("icon-" + todo.id)
      const window = document.getElementById("subWindow-" + todo.id)

      icon.classList.add('windowtoicon-icon');
      window.classList.add('windowtoicon-window');

      icon.addEventListener('animationend', function () {
        icon.classList.remove('windowtoicon-icon');
        icon.style.opacity = '1';
        icon.style.zIndex = '2';
      });
    
      window.addEventListener('animationend', function () {
        window.classList.remove('windowtoicon-window');
        window.style.opacity = '0';
        window.style.zIndex = '1';
      });
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
            <button className='icon' id={"icon-" + todo.id} onClick={handleToWindow}>
              <IoTimerOutline/>
            </button>
            <div className='subwindow' id={"subWindow-" + todo.id}>
              <CustomTimer handleTimer={handleToIcon}/>
            </div>
          </div>

        </label>
      </div>
    );
  }
  