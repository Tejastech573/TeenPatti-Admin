"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import Login from "@/components/Login/Login";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  console.log("token :>> ", token);

  useEffect(() => {
    const userToken = getCookie("token") as string | null;
    setToken(userToken);
  }, []);

  return (
    <>
      {!token ? (
        <Login />
      ) : (
        <DefaultLayout>
          <Dashboard />
        </DefaultLayout>
      )}
    </>
  );
}
