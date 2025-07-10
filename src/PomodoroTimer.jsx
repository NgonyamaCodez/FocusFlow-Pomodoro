import { useEffect, useState } from "react";
import "./PomodoroTimer.css";

export default function PomodoroTimer() {
  const workDuration = 25 * 60;
  const breakDuration = 5 * 60;

  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            const nextSession = !isWorkSession;
            setIsWorkSession(nextSession);
            return nextSession ? workDuration : breakDuration;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, isWorkSession]);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <>
      <div className="blur-overlay"></div>
      <div className="container">
        <h2 className="title">FocusFlow</h2>
        {!isRunning && (
          
        <p className="instructions">
          This timer uses the Pomodoro technique to boost your productivity.{" "}
          <br />
          <strong>How it works:</strong>
          <br />
          1. Start a 25-minute work session.
          <br />
          2. Focus until the timer ends.
          <br />
          3. Take a short 5-minute break.
          <br />
          4. Repeat to stay productive and energized.
        </p>
        )}
        <h1>{isWorkSession ? "Work Time" : "Break Time"}</h1>
        <p className="timer">{formatTime(timeLeft)}</p>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          className="reset"
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(isWorkSession ? workDuration : breakDuration);
          }}
        >
          Reset
        </button>
        <footer> </footer>
      </div>
    </>
  );
}
