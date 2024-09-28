import React from "react";
import { Analytics } from "@vercel/analytics/react";

function HomeLayout({ children }) {
  return (
    <>
      <Analytics />
      <div className="">{children}</div>
    </>
  );
}

export default HomeLayout;
