"use server";

import { revalidatePath } from "next/cache";

import UserModel from "../../models/UserModel";
import dbConnect from "../dbConnect";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await dbConnect();

    const newUser = await UserModel.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error(error)
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await dbConnect();

    const user = await UserModel.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error)
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await dbConnect();

    const updatedUser = await UserModel.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error(error)
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await dbConnect();

    // Find user to delete
    const userToDelete = await UserModel.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await UserModel.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.error(error)
  }
}