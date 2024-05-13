import { useState, useRef } from "react";
import ResultModel from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemainig, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemainig > 0 && timeRemainig < targetTime * 1000;
  if (timeRemainig <= 0) {
    clearInterval(timer.current);
    dialog.current.opendialog();
  }

  function HandleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function HandleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevRem) => prevRem - 10);
    }, 10);
  }
  function HandleStop() {
    dialog.current.opendialog();
    clearInterval(timer.current);
  }
  return (
    <>
      <ResultModel
        ref={dialog}
        targetTime={targetTime}
        remainigTime={timeRemainig}
        onReset ={HandleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? HandleStop : HandleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Timer is running..." : "Timer  inactive"}
        </p>
      </section>
    </>
  );
}
