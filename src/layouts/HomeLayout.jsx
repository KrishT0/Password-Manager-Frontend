import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function HomeLayout({ children }) {
  return (
    <>
      <div className="">{children}</div>
      <SpeedInsights />
    </>
  );
}

export default HomeLayout;
