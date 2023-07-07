import React, { useState, useEffect, useRef } from 'react';

export default function CustomTimer() {
  
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerValue, setTimerValue] = useState('');

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  let timerIntervalRef = useRef();

  useEffect(() => {
    // Update the timer value whenever hours, minutes, or seconds change
    setTimerValue(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  }, [hours, minutes, seconds]);

  const startTimer = () => {
    
    if (!isTimerRunning){
      setIsTimerRunning(true)

    // Calculate the total time in seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Start the timer using 
    

    timerIntervalRef.current = setInterval(() => {
      // Decrease the timer value by 1 second
      setTimerValue(prevValue => {
        const [h, m, s] = prevValue.split(':').map(Number);
        const total = h * 3600 + m * 60 + s;

        if (total > 0) {
          const newTotal = total - 1;
          const newHours = Math.floor(newTotal / 3600);
          const newMinutes = Math.floor((newTotal % 3600) / 60);
          const newSeconds = newTotal % 60;

          setHours(newHours);
          setMinutes(newMinutes);
          setSeconds(newSeconds);

          return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
        }

        clearInterval(timerIntervalRef.current);
        setIsTimerRunning(false)
        return prevValue;
      });
    }, 1000);
  }
  };

  const stopTimer = () => {
    clearInterval(timerIntervalRef.current);
    setIsTimerRunning(false);
  };


  return (
    <>
      <div className='time'>
        <input type="number" placeholder='HH' value={hours} onChange={e => setHours(parseInt(e.target.value))} />
        <input type="number" placeholder='MM' value={minutes} onChange={e => setMinutes(parseInt(e.target.value))} />
        <input type="number" placeholder='SS' value={seconds} onChange={e => setSeconds(parseInt(e.target.value))} />
      </div>

      <div className='buttons'>
        <button className="custom-button" onClick={startTimer}>Start </button>
        <button className="custom-button" onClick={stopTimer}>Stop </button>
      </div>
      
    </>
  );
}
  