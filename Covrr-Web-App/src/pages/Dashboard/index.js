import React, { useState } from "react";
import { ArrowDownTrayIcon, CalendarIcon as HeroCalendarIcon } from "@heroicons/react/24/solid";
import { CalendarIcon } from "../../components/SvgIcons";

import DashboardTabs from "./Components/DashboardTabs";
import FleetAnalytics from "./Components/FleetAnalytics";
import { color } from "echarts";
import ServiceAnalytics from "./Components/ServiceAnalytics";

const Dashboard = () => {
  const [selectedInfo, setSelectedInfo] = useState("fleet");

  return (
    <div className="dashboard_page z-0">
      <div className="flex justify-between space-x-4 bg-cardBackground p-[15px] px-3 mr-[-15px] ml-[-19px] mt-[-19px] border-b border-border">
        <DashboardTabs selectedInfo={selectedInfo} setSelectedInfo={setSelectedInfo} />
        <div className="ml-auto flex space-x-2">
          <button className="px-3 py-2 bg-muted2 border border-border rounded-full flex items-center w-[45px] h-[40px]">
            <CalendarIcon className="h-5 w-5 fill-none text-primary" />
          </button>
          <button className="px-3 py-2 xl:px-6 xl:py-2 bg-muted2 border text-primary border-border rounded-full flex font-semibold items-center">
            <ArrowDownTrayIcon className="h-5 w-5 xl:mr-2 text-primary" /> <span className="hidden xl:block">Reports</span>
          </button>
        </div>
      </div>
      {(selectedInfo === "fleet" && <FleetAnalytics />) ||
        (selectedInfo === "service" && <ServiceAnalytics />) ||
        (selectedInfo === "accounting" && (
          <div>
            <h2>Accounting</h2>
          </div>
        )) ||
        (selectedInfo === "insurance" && (
          <div>
            <h2>Insurance</h2>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
