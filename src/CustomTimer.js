import React, { useState, useEffect, useRef } from 'react';
import {IoTimerOutline} from 'react-icons/io5';

export default function CustomTimer({handleToWindow, handleToIcon, todo}) {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [iconColor, setIconColor] = useState('white')
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const initialTotalSecondsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const stopClickStop = useRef(false);

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(timerIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    // Update the icon color based on the timer value
    const parts = [initialTotalSecondsRef.current/4, initialTotalSecondsRef.current/2, 3 * initialTotalSecondsRef.current/4];
    const totalSeconds = convertToSeconds(hours, minutes, seconds);
    if (totalSeconds == 0) {
      setIconColor('red');
    }
    else if (totalSeconds <= parts[0]) {
      setIconColor('orange');
    } else if (totalSeconds <= parts[1]) {
      setIconColor('yellow');
    } else if (totalSeconds <= parts[2]) {
      setIconColor('#90EE90');
    } else {
      setIconColor('green');
    }
  }, [hours, minutes, seconds]);

  function startTimer(givenTime) {
    const start = new Date();
    setIsTimerRunning(true);
    initialTotalSecondsRef.current = givenTime;

    timerIntervalRef.current = setInterval(() => {
      const currentSeconds = calculateTotalSeconds(start);
      const remainingSeconds = givenTime - currentSeconds;

      if (remainingSeconds >= 0) {
        const newHours = Math.floor(remainingSeconds / 3600);
        const newMinutes = Math.floor((remainingSeconds % 3600) / 60);
        const newSeconds = remainingSeconds % 60;

        setHours(`${newHours}`);
        setMinutes(`${newMinutes}`);
        setSeconds(`${newSeconds}`);
      } else {
        setIsTimerRunning(false);
        clearInterval(timerIntervalRef.current);
      }
    }, 1000);
  }

  function stopTimer() {
    setIsTimerRunning(false);
    clearInterval(timerIntervalRef.current);
    stopClickStop.current = true;
  }

  function handleStart() {
    if (!isTimerRunning) {
      stopClickStop.current = false;
      startTimer(convertToSeconds(hours, minutes, seconds));
    }
  }

  function convertToSeconds(hours, minutes, seconds) {
    return 60 * 60 * parseInt(hours.toString().padStart(2, '0')) +
    60 * parseInt(minutes.toString().padStart(2, '0')) +
    parseInt(seconds.toString().padStart(2, '0'));
  }

  function calculateTotalSeconds(current) {
    const currentTime = new Date();
    const elapsedTime = (currentTime - current) / 1000;
    return Math.round(elapsedTime);
  }

  return (
    <>
      <button className='icon' id={"icon-" + todo.id} onClick={handleToWindow} style={{ color: iconColor }}>
        <IoTimerOutline/>
      </button>
    
      <div className='subwindow' id={"subWindow-" + todo.id}>
        <div className='time'>
          <input type='number' placeholder='HH' value={hours} onChange={e => setHours(e.target.value)} min="0"/>
          <input type='number' placeholder='MM' value={minutes} onChange={e => setMinutes(e.target.value)} min="0"/>
          <input type='number' placeholder='SS' value={seconds} onChange={e => setSeconds(e.target.value)} min="0"/>
        </div>

        <div className='buttons'>
          <button className='custom-button' id='start' onClick={handleStart}> {stopClickStop.current ? 'Resume' : 'Start'} </button>
          <button className='custom-button' id='stop' onClick={stopTimer}> Stop </button>
          <button className="custom-button" id='exit' onClick={handleToIcon}>X</button>
        </div>
      </div>
    </>
  );
}
