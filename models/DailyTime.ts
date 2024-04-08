import mongoose from "mongoose";

export interface DailyTime extends mongoose.Document {
  value: Number;
  date_logged?: Date;
}

const DailyTimeSchema = new mongoose.Schema<DailyTime>({
  value: {
    type: Number,
  },
  date_logged: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.DailyTime ||
  mongoose.model<DailyTime>("DailyTime", DailyTimeSchema);
