import React, { useState } from "react";
import { Bars3Icon, BellAlertIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import { InputSwitch } from "primereact/inputswitch";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { SunIcon, MoonIcon } from "../../components/SvgIcons";

const Header = ({ toggleSidebar, setIsMinimized, isMinimized }) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const handleLogoutConfirm = () => {
    logout();
  };

  const handleMinimizeClick = () => {
    setIsMinimized((prevState) => !prevState);
  };

  return (
    <>
      <div className="sticky top-0 z-40 flex h-[70px] shrink-0 items-center gap-x-4 border border-border bg-cardBackground px-4 shadow-cardShadow sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" onClick={toggleSidebar} className="-m-2.5 p-2.5 text-text2 lg:hidden">
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <button onClick={handleMinimizeClick} className={`p-1 border border-border1 rounded-full bg-cardBackground shadow-md ms-[-48px] text-text5 ${isMinimized ? "block" : "hidden"}`}>
          <span className="sr-only">Toggle sidebar</span>
          <ChevronDoubleRightIcon className="size-6" />
        </button>
        <div aria-hidden="true" className="h-6 w-px bg-border lg:hidden" />
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="grid flex-1 grid-cols-1"></div>
          <div className="flex items-center gap-x-5">
            {/* Dark Mode switcher */}
            <div className="relative mt-1 hidden">
              <InputSwitch checked={isDarkMode} onChange={toggleTheme} className="!border-border relative " />
              <div className="absolute inset-0 pointer-events-none flex items-center">
                <SunIcon className={`h-4 w-4 absolute left-[6px] top-[6px] text-text4 transition-opacity fill-themeYellow ${isDarkMode ? "opacity-0" : "opacity-100"}`} />
                <MoonIcon className={`h-4 w-4 absolute right-[6px] top-[6px] text-text4 fill-gray-400 transition-opacity ${isDarkMode ? "opacity-100" : "opacity-0"}`} />
              </div>
            </div>
            {/* Notifications */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-[0.5px] border-border bg-muted2 hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white cursor-pointer">
              <span className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-themeRed inline`}>
                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-themeRed opacity-75"></span>
              </span>
              <BellAlertIcon className="w-5 h-5 text-text4" />
            </div>
            {/* SOS Button */}
            <button className="btn btn-md btn-white bg-muted3 !shadow-none !border-0 !px-4 !min-w-max !rounded-full">
              <span className="text-md text-text5">SOS</span>
            </button>
            {/* User Profile */}
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full">
                <img src={require("../../assets/images/user/user-01.png")} alt="User" className="rounded-full" />
              </span>
              <span className="hidden text-right lg:block">
                <span className="block text-sm font-semibold text-text1">Suresh Kumar</span>
              </span>
              {/* <ChevronDownIcon className="h-4 w-4 text-text5" /> */}
            </div>
          </div>
        </div>
      </div>
      <ConfirmationDialog visible={showLogoutDialog} onHide={() => setShowLogoutDialog(false)} onAccept={handleLogoutConfirm} title="Confirm Logout" message="Are you sure you want to logout?" />
    </>
  );
};

export default Header;
