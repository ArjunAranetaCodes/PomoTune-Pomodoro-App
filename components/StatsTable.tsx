import React, { useContext, useEffect, useState } from "react";
import BackButton from "./BackButton";
import SettingsContext from "./SettingsContext";
import { showUserStats, show7daysStats } from "@/lib/actions/time.action";
import { BarChart } from "@tremor/react";
import moment from "moment";

const StatsTable = () => {
  const [times, setTimes] = useState<any[]>([]);
  const [loggedTimes, setLoggedTimes] = useState<any[]>([]);
  const [chartedTimes, setChartedTimes] = useState<any[]>([]);
  const settingsInfo: any = useContext(SettingsContext);

  const chartdata = [
    {
      date: moment().subtract(6, "days").format("MMMM D, YYYY"),
      "Minutes Focused": 73,
    },
    {
      date: moment().subtract(5, "days").format("MMMM D, YYYY"),
      "Minutes Focused": 30,
    },
    {
      date: moment().subtract(4, "days").format("MMMM D, YYYY"),
      "Minutes Focused": 62,
    },
    {
      date: moment().subtract(3, "days").format("MMMM D, YYYY"),
      "Minutes Focused": 65,
    },
    {
      date: moment().subtract(2, "days").format("MMMM D, YYYY"),
      "Minutes Focused": 51,
    },
    {
      date: moment().subtract(1, "days").format("MMMM D, YYYY"),
      "Minutes Focused": 23,
    },
    {
      date: moment().format("MMMM D, YYYY"),
      "Minutes Focused": 34,
    },
  ];

  useEffect(() => {
    const showStats = async () => {
      try {
        const res = await showUserStats(1);
        setTimes(res);
      } catch (e) {
        console.error(e);
      }

      try {
        const res = await show7daysStats();
        setLoggedTimes(res);
        console.log("Fetching Last 7 days logs", res);
      } catch (e) {
        console.error("error: ", e);
      }
    };
    showStats();
  }, []);

  useEffect(() => {
    const matchedData: any = [];

    chartdata.forEach((item2) => {
      loggedTimes.forEach((item1) => {
        if (
          new Date(item1.date).toDateString() ===
          new Date(item2.date).toDateString()
        ) {
          matchedData.push({
            date: item2.date,
            "Minutes Focused": item1.totalMinutesFocused,
          });
        }
      });
    });
    
    //re-add dates
    chartdata.forEach((item2) => {
      if (!checkValueExistsInJSONArray(matchedData, item2.date)) {
        matchedData.push({
          date: item2.date,
          "Minutes Focused": 0,
        });
      }
    });

    //sort by date
    matchedData.sort((a: any, b: any) => {
      if (new Date(a.date) < new Date(b.date)) {
        return -1;
      }
      if (new Date(a.date) > new Date(b.date)) {
        return 1;
      }
      return 0;
    });

    if (matchedData.length > 0) {
      setChartedTimes(matchedData);
    }
    console.log("matchedData", matchedData);
  }, [loggedTimes]);

  const checkValueExistsInJSONArray = (array: any[], value: any): boolean => {
    for (const json of array) {
      if (Object.values(json).includes(value)) {
        return true;
      }
    }
    return false;
  };

  const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();

  return (
    <div className="relative overflow-hidden  rounded-lg">
      <div className="p-2 bg-white">
        <BarChart
          data={chartedTimes}
          index="date"
          categories={["Minutes Focused"]}
          colors={["red"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
          onValueChange={(v) => console.log(v)}
        />
      </div>

      <table className="table-fixed w-full text-left">
        <thead className="text-gray-200 uppercase bg-[#795458]">
          <tr>
            <td className="py-1 border text-center  p-4">Date</td>
            <td className="py-1 border text-center  p-4">Total Logged (Minutes)</td>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {loggedTimes.map((item, index) => (
            <tr key={index} className="py-5">
              <td className="py-1 border text-center">{item.date}</td>
              <td className="py-1 border text-center ">{item.totalMinutesFocused}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <BackButton onClick={() => settingsInfo.setShowStats(false)} />
      </div>
    </div>
  );
};

export default StatsTable;
