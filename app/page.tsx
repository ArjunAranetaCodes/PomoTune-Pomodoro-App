"use client";

import Image from "next/image";
import Timer from "../components/Timer";
import Settings from "../components/Settings";
import { useState, useEffect } from "react";
import SettingsContext from "../components/SettingsContext";
import StatsTable from "@/components/StatsTable";
import CurrentPage from "@/components/CurrentPage";

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(10);

  useEffect(() => {
    // Perform localStorage action
    const storedTimeSetting = parseInt(
      localStorage.getItem("workMinutes") || "45"
    );
    setWorkMinutes(storedTimeSetting);
  }, []);
  const [breakMinutes, setBreakMinutes] = useState(15);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 bg-[#453F78]">
      <SettingsContext.Provider
        value={{
          showSettings,
          setShowSettings,
          showStats,
          setShowStats,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
        }}
      >
        <CurrentPage showSettings={showSettings} showStats={showStats}/>
      </SettingsContext.Provider>
    </main>
  );
}
