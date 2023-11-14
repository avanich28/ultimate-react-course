import { memo, useCallback, useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  // Topic: Setting State Based on Other State Updates 🍀
  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak; // Derived state
  const [duration, setDuration] = useState(0);

  // Topic: Using Helper Functions In Effects 🥁
  // NOTE This function is a reactive value, so can't move it outside
  // NOTE move the func into useEffect and remove useCallback
  // const playSound = useCallback(
  //   function () {
  //     if (!allowSound) return;
  //     const sound = new Audio(clickSound); // clickSound never change
  //     sound.play();
  //   },
  //   [allowSound]
  // );

  // const playSound = function () {
  //   if (!allowSound) return;
  //   const sound = new Audio(clickSound); // clickSound never change
  //   sound.play();
  // };

  // Effect runs after the render happens, so Calculator component needs to run 2 times
  // Use this techniques when the state needs many other state variables to update
  useEffect(
    function () {
      setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);

      // playSound();
    },
    // [number, sets, speed, durationBreak, playSound]
    // BUG playSound create again when re-render -> solve by memoizing -> still have the problem when changing 'allowSound' -> solve by sync 'duration' with sound. 🥁
    [number, sets, speed, durationBreak]
  );

  // 🥁 move helper func into effect
  useEffect(
    function () {
      const playSound = function () {
        if (!allowSound) return;
        const sound = new Audio(clickSound);
        sound.play();
      };

      playSound();
    },
    [duration, allowSound]
  );

  // Topic: Closures in Effects
  // A function captures all the variables from its lexical scope or from the place that it was defined at the time that the function was created.
  useEffect(
    function () {
      console.log(duration, sets);
      document.title = `Your ${number}-exercise workout`;
    },
    // []
    // Closures was created at the first render.
    // The function access to the initial snapshot of state and props or old values.
    // When [], it creates stale closures (outdates closures) bcs the func has captured the values from a time where the number was still sth else
    [number, duration, sets]
    // Get latest snapshot
    // Eliminate stale closures
  );

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  // 🍀
  function handleInc() {
    setDuration((duration) => Math.floor(duration) + 1);
    // playSound();
  }

  function handleDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
    // playSound();
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator); // 💥
