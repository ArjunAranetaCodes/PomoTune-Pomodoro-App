import ReactSlider from "react-slider";
import "./slider.css";
import SettingsContext from "./SettingsContext";
import { useContext, useEffect } from "react";
import BackButton from "./BackButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Settings() {
  const settingsInfo: any = useContext(SettingsContext);

  useEffect(() => {
    localStorage.setItem(
      "localNextSeconds",
      JSON.stringify(settingsInfo.workMinutes * 60)
    );
  }, [settingsInfo.workMinutes]);

  const saveWorkMinutesHandler = (newValue: number) => {
    console.log(newValue);
    settingsInfo.setWorkMinutes(newValue);
  };
  return (
    <div className="w-1/2 justify-center container flex flex-col">
      <div className="grid grid-cols-2 gap-2 align-center">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="focus" className="text-white">
            <div className="flex gap-1 items-center justify-center">
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
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
              <span>Focus</span>
            </div>
          </Label>
          <Input
            className="w-1/2 text-center mx-auto"
            type="text"
            id="focus"
            value={settingsInfo.workMinutes}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              saveWorkMinutesHandler(parseInt(event.target.value))
            }
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="focus" className="text-white">
            <div className="flex gap-1 items-center justify-center">
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
                  d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>

              <span>Break</span>
            </div>
          </Label>
          <Input
            className="w-1/2 text-center mx-auto"
            type="text"
            id="focus"
            value={settingsInfo.breakMinutes}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              settingsInfo.setBreakMinutes(parseInt(event.target.value))
            }
          />
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
}

export default Settings;
