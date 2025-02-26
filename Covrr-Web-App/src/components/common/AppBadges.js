import React from "react";

const AppBadge = ({ text, color = "gray", className = "" }) => {
  const baseClass = "inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-[1px] ring-inset";
  const lightModeClass = {
    red: "bg-themeRed/10 text-themeRed ring-themeRed/20",
    yellow: "bg-themeYellow/10 text-themeYellow ring-themeYellow/20",
    green: "bg-themeGreen/10 text-themeGreen ring-themeGreen/20",
    blue: "bg-themeBlue/10 text-themeBlue ring-themeBlue/20",
    gray: "bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20",
    indigo: "bg-indigo-50 text-indigo-700 ring-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30",
    purple: "bg-purple-50 text-purple-700 ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30",
    pink: "bg-pink-50 text-pink-700 ring-pink-700/10 dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-400/20",
  };

  return <span className={`${baseClass} ${lightModeClass[color]} ${className}`}>{text}</span>;
};

export default AppBadge;
