"use client";

import React from "react";
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Butcherman } from "next/font/google";
import { createUser } from "@/lib/actions/time.action";

export default async (req: NextApiRequest | any, res: NextApiResponse) => {
  const saveTime = async () => {
    try {
      console.log("test");
      createUser({ value: 1 });
      // const client = await clientPromise;
      // const db = client.db("sample_mflix");
      // const movies = await db
      //     .collection("movies")
      //     .find({})
      //     .sort({ metacritic: -1 })
      //     .limit(10)
      //     .toArray();
      // const data = res.json(movies);
      // console.log(data)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={saveTime}
      >
        Test
      </button>
    </div>
  );
};
