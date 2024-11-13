"use client";
import { addDailyReward, welcomeChips } from "@/api/api";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";

function WelcomeChips() {
  const [welcomeChip, setWelcomeChips] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dailyRewardValue, setDailyRewardValue] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      try {
        const response = await welcomeChips();
        setWelcomeChips(response.welcome_chips);
      } catch (error) {
        console.error("Failed to fetch welcome chips:", error);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, []);

  const handleInputChange = (event: any) => {
    setDailyRewardValue(Number(event.target.value));
  };

  const handleSubmitClick = async (event: any) => {
    event.preventDefault();
    const payload = {
      welcome_chips: dailyRewardValue,
    };
    setLoading(true);
    try {
      const res = await addDailyReward(payload);
      console.log("API Response:", res);
      setWelcomeChips(dailyRewardValue);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error calling API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto pt-5 text-center">
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
        <p className="text-lg font-bold">
          {!loading && isSubmitted || welcomeChip ? `Welcome Chips: ${welcomeChip}` : loading && <Loader />}
        </p>
      </div>
    </div>
  );
}

export default WelcomeChips;
