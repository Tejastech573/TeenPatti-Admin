"use client";
import { addDailyReward, welcomeChips } from "@/api/api";
import React, { useEffect, useState } from "react";

function DailyReward() {
  const [dailyReward, setDailyReward] = useState(0);
  const [dailyRewardValue, setDailyRewardValue] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const FetchData = async () => {
      const response = await welcomeChips();
      setDailyReward(response.daily_reward);
      console.log("response :>> ", response);
    };
    FetchData();
  }, []);

  const handleInputChange = (event: any) => {
    setDailyRewardValue(Number(event.target.value));
  };

  const handleSubmitClick = async (event: any) => {
    event.preventDefault();
    const payload = {
      daily_reward: dailyRewardValue,
    };
    try {
      const res = await addDailyReward(payload);
      console.log("API Response:", res);
      setDailyReward(dailyRewardValue);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <div className="">
      <form
        className="mt-4 flex items-center justify-center space-x-3"
        onSubmit={handleSubmitClick}
      >
        <input
          type="text"
          placeholder="Enter Chips"
          value={dailyRewardValue}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
      {(isSubmitted || dailyReward) && (
        <p className="mx-auto pt-5 text-center text-lg font-bold">
          Daily Reward -: {dailyReward}
        </p>
      )}
    </div>
  );
}

export default DailyReward;
