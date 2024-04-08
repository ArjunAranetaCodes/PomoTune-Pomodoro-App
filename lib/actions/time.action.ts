"use server";

import { revalidatePath } from "next/cache";

import DailyTime from "../../models/DailyTime";
import dbConnect from "../dbConnect";
//import { handleError } from "../utils";

// CREATE
export async function createUser(dailyTime: CreateDailyTimeParams) {
  try {
    await dbConnect();

    const newTime = await DailyTime.create(dailyTime);

    return JSON.parse(JSON.stringify(newTime));
  } catch (error) {
    console.log(error);
  }
}
// CREATE
export async function saveTime(dailyTime: CreateDailyTimeParams) {
  try {
    await dbConnect();

    const newTime = await DailyTime.create(dailyTime);

    return JSON.parse(JSON.stringify(newTime));
  } catch (error) {
    console.log(error);
  }
}
// CREATE
export async function showUserStats(userId: number) {
  try {
    await dbConnect();

    const allTime = await DailyTime.find({});
    //res.status(200).json({ success: true, data: pets });

    return JSON.parse(JSON.stringify(allTime));
  } catch (error) {
    console.log(error);
  }
}

export async function show7daysStats() {
  try {
    await dbConnect();
    const sevenDaysAgo : any = new Date().getTime() - 7 * 24 * 60 * 60 * 1000
    const last7DaysStats = await DailyTime.aggregate([
      {
        $match: {
          date_logged: { $gte: new Date(sevenDaysAgo) } // Filter for last 7 days
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date_logged" } },
          value: { $sum: "$value" }
        }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          totalMinutesFocused: "$value"
        }
      },
      {
        $sort: { date: -1 }
      }
    ]);
    const data7Days = JSON.parse(JSON.stringify(last7DaysStats))

    return data7Days
  } catch (error) {
    console.error("show7daysStats", error);
  }
};