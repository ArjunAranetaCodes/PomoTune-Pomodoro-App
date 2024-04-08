import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";
import { saveTime, showUserStats } from "@/lib/actions/time.action";
import { UserButton } from "@clerk/nextjs";

const yellow = "#FFC94A";
const green = "#4aec8c";

function Timer() {
  const settingsInfo: any = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);
  //for getting the totals of daily work
  const [dailyTotals, setDailyTotals] = useState(0);

  useEffect(() => {
    // Perform localStorage action
    const storedTotals = parseInt(localStorage.getItem("dailyTotals") || "0");
    setDailyTotals(storedTotals);
  }, []);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    localStorage.setItem("localNextSeconds", secondsLeftRef.current.toString());
    setSecondsLeft(secondsLeftRef.current);
    //console.log(localStorage.getItem("localNextSeconds"));
  }

  function switchMode(passedMode? : string) {
    const nextMode = passedMode ? passedMode : modeRef.current === "work" ? "break" : "work";    
    const nextSeconds =
      (nextMode === "work"
        ? settingsInfo.workMinutes
        : settingsInfo.breakMinutes) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  useEffect(() => {
    secondsLeftRef.current = getSecondsFromLocalAndNext();
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        //console.log("isPausedRef.current");
        return;
      }
      if (secondsLeftRef.current === 0) {
        //console.log("secondsLeftRef.current");

        // Update the daily totals and save them to local storage
        console.log("Saving work time");
        if (secondsLeft === 0) {
          setDailyTotals(
            (prevTotals) => prevTotals + settingsInfo.workMinutes * 60
          );
          localStorage.setItem("dailyTotals", dailyTotals.toString());
          console.log("dailyTotals", localStorage.getItem("dailyTotals"));
        }
        saveTime({ value: settingsInfo.workMinutes });
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  function getSecondsFromLocalAndNext() {
    let localNextSeconds = parseInt(
      localStorage.getItem("localNextSeconds") || "0"
    );
    if (
      localNextSeconds < settingsInfo.workMinutes * 60 &&
      localNextSeconds > 0
    ) {
      return localNextSeconds;
    } else {
      return settingsInfo.workMinutes * 60;
    }
  }

  const showStats = async () => {
    settingsInfo.setShowStats(true);
  };

  useEffect(() => {
    //localStorage Seconds and nextSeconds
    setSecondsLeft(getSecondsFromLocalAndNext());
    console.log(localStorage.getItem("localNextSeconds"));
  }, []);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  let secondOrSeconds = seconds < 10 ? "0" + seconds : seconds;

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <button
          className="bg-[#C08B5C] hover:bg-[#795458] text-white font-bold py-2 px-4 mx-2 rounded"
          onClick={() => switchMode("work")}
        >
          Focus
        </button>

        <button
          className=" text-white font-bold py-2 px-4 mx-auto"
        >
          <UserButton />
          {/*<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>*/}
        </button>

        <button
          className="bg-[#C08B5C] hover:bg-[#795458] text-white font-bold py-2 px-4 mx-2 rounded"
          onClick={() => switchMode()}
        >
          Break
        </button>
      </div>
      <div className="relative mt-[80px]">
        <CircularProgressbar
          value={percentage}
          text={minutes + ":" + secondOrSeconds}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: mode === "work" ? yellow : green,
            trailColor: "#fff",
          })}
        />
        <div className="absolute inset-0 flex items-center justify-center mt-[150px] mx-auto">
          {isPaused ? (
            <PlayButton
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            />
          ) : (
            <PauseButton
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-[50px]">
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />

        <div></div>
        <button
          className="flex gap-2 justify-center bg-[#C08B5C] hover:bg-[#795458] text-white font-bold py-2 px-4 mx-2 rounded"
          onClick={showStats}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
            />
          </svg>
          Stats
        </button>
      </div>
    </div>
  );
}

export default Timer;
