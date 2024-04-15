import mongoose from "mongoose";

export interface UserModel extends mongoose.Document {
  clerkId: String;
}

const UserModelSchema = new mongoose.Schema<UserModel>({
  clerkId: {
    type: String,
    unique: true,
  },
});

export default mongoose.models.DailyTime ||
  mongoose.model<UserModel>("User", UserModelSchema);
