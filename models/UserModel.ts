import mongoose from "mongoose";

export interface UserModel extends mongoose.Document {
  clerkId: String;
  email: String;
  username?: String;
}

const UserModelSchema = new mongoose.Schema<UserModel>({
  clerkId: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique:true,
  },
  username: {
    type: String,
    unique:true,
  },
});

export default mongoose.models.DailyTime ||
  mongoose.model<UserModel>("UserModel", UserModelSchema);
