import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

function HomeLayout({ children }) {
  return (
    <>
      <div className="">{children}</div>
      <SpeedInsights />
    </>
  );
}

export default HomeLayout;
