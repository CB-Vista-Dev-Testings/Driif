import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import { XMarkIcon, ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { SidebarDashboard, SidebarDashboardActive, SidebarVehicles, SidebarVehiclesActive, SidebarSupport, SidebarManagers, SidebarManagersActive, SidebarGeofence, SidebarGeofenceActive, SidebarReports, SidebarReportsActive, SidebarLogout, SidebarSetting, SidebarFaq } from "../SvgIcons";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { useTheme } from "../../context/ThemeContext";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { useAuth } from "../../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: SidebarDashboard, activeIcon: SidebarDashboardActive },
  { name: "Fleet", href: "/fleet", icon: SidebarVehicles, activeIcon: SidebarVehiclesActive },
  { name: "Users", href: "/drivers", icon: SidebarManagers, activeIcon: SidebarManagersActive },
  { name: "Geofence", href: "/geofence", icon: SidebarGeofence, activeIcon: SidebarGeofenceActive },
  { name: "Reports", href: "/reports", icon: SidebarReports, activeIcon: SidebarReportsActive },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ isOpen, toggleSidebar, isMinimized, setIsMinimized }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleNavigation = (href) => {
    navigate(href);
    navigation.forEach((navItem) => (navItem.current = navItem.href === href));
  };

  const isActive = (href) => {
    const currentPath = window.location.pathname;
    if (href === "/dashboard" && (currentPath === "/isActive" || currentPath === "/")) {
      return true;
    }
    return currentPath === href;
  };

  const handleLogoutConfirm = () => {
    logout();
  };

  const handleMinimizeClick = () => {
    setIsMinimized((prevState) => !prevState);
  };

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 border-r border-border ${isMinimized ? "lg:w-[85px]" : "lg:w-[210px] 2xl:w-[230px]"}`}>
        {/* Add overflow to an inner wrapper div */}
        <div className="flex flex-col h-full ">
          <div className={`flex relative grow flex-col gap-y-5 py-2 pb-4 bg-SidebarBackground dark:bg-gradient2 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-card ${isMinimized ? "items-center" : ""}`}>

            <div className={`flex h-[68px] shrink-0 items-center ${isMinimized ? "pe-6" : "ps-0 justify-between"} w-full mt-1 border-b border-border`}>
              <img alt="Your Company" src={isDarkMode ? (isMinimized ? require("../../assets/images/logo_min.svg").default : require("../../assets/images/logo_dark.svg").default) : isMinimized ? require("../../assets/images/logo_min.svg").default : require("../../assets/images/logo.svg").default} className="h-[30px] w-auto ps-6" />{" "}
              <button onClick={handleMinimizeClick} className={`p-2 ps-0 me-[-15px] text-text5 ${isMinimized ? "hidden" : "block"}`}>
                <span className="sr-only">Toggle sidebar</span>
                <ChevronDoubleLeftIcon className="size-5 text-text5 me-6" />
                {/* <img src={require("../../assets/images/icons/minmize.svg").default} alt="minimize_logo" className={`size-5 w-auto cursor-pointer transition-transform duration-300 ${isMinimized ? "rotate-180" : ""}`} /> */}
              </button>
            </div>


            <ul className="flex flex-1 flex-col gap-y-7 dark:bg-gradient1">
              <li className="px-6">
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name} className="group relative">
                      <button
                        onClick={() => {
                          handleNavigation(item.href);
                        }}
                        className={`${isMinimized ? "justify-center" : "justify-normal"} ` + classNames(isActive(item.href) ? "bg-primary/10 dark:bg-gradient1 text-primary dark:text-white font-bold" : "text-text4 hover:bg-primary/10 hover:text-primary font-[500]", "group flex items-center gap-x-2 rounded-md p-3 text-sm/6 w-full relative")}
                      >
                        {isActive(item.href) ? <item.activeIcon aria-hidden="true" className={classNames(isActive(item.href) ? "text-primary dark:text-white " : "text-text5 group-hover:text-primary", "size-6 shrink-0 fill-none")} /> : <item.icon aria-hidden="true" className={classNames(isActive(item.href) ? "text-primary dark:text-white " : "fill-none text-text5 group-hover:text-primary", "size-6 shrink-0")} />}
                        {!isMinimized && item.name}
                      </button>

                      {/* Tooltip */}
                      {isMinimized && (
                        <div className="fixed z-10 w-full">
                          <span className="z-10 absolute left-14 -top-[34px] w-auto min-w-max origin-left scale-0 rounded-md bg-gray-900 p-2 text-xs font-bold text-white shadow-md transition-all duration-200 group-hover:scale-100">{item.name}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <div className="w-full border-t border-border h-2 mt-4" />
                <div className="px-6">
                  <button className="group flex items-center w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-text5 hover:bg-gray-50 hover:text-primary">
                    <SidebarSupport aria-hidden="true" className="size-5 fill-none shrink-0 group-hover:text-primary" />
                    {!isMinimized && "Support"}
                  </button>
                  <button className="group flex items-center w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-text5 hover:bg-gray-50 hover:text-primary">
                    <SidebarFaq aria-hidden="true" className="size-5 fill-none shrink-0 group-hover:text-primary" />
                    {!isMinimized && "FAQ's"}
                  </button>
                  <button className="group flex items-center w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-text5 hover:bg-gray-50 hover:text-primary">
                    <SidebarSetting aria-hidden="true" className="size-5 fill-none shrink-0 group-hover:text-primary" />
                    {!isMinimized && "Setting"}
                  </button>
                </div>
                <div className="w-full border-t border-border h-2 mt-2" />
                <div className="px-6">
                  <button onClick={() => setShowLogoutDialog(true)} className="group flex items-center w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-text5 hover:bg-gray-50 hover:text-primary">
                    <SidebarLogout aria-hidden="true" className="size-5 fill-none shrink-0 group-hover:text-primary" />
                    {!isMinimized && "Logout"}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onClose={toggleSidebar} className={`relative z-50 lg:hidden`}>
        <DialogBackdrop transition className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />

        <div className="fixed inset-0 flex">
          <DialogPanel transition className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full">
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button type="button" onClick={toggleSidebar} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className={`flex grow flex-col gap-y-5 overflow-y-auto ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} px-6 pb-4`}>
              <div className="flex h-16 shrink-0 items-center justify-between">
                <img alt="Your Company" src={isDarkMode ? (isMinimized ? require("../../assets/images/logo.svg") : require("../../assets/images/logo.svg").default) : isMinimized ? require("../../assets/images/logo_min.svg").default : require("../../assets/images/logo.svg").default} className="h-[28px] w-auto" />{" "}
              </div>
              <Tooltip target=".btn-tooltip" />
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={() => {
                              handleNavigation(item.href);
                              toggleSidebar();
                            }}
                            className={`${isMinimized ? "justify-center" : "justify-normal"} ` + classNames(isActive(item.href) ? "bg-primary/10 text-primary dark:text-white font-bold" : "text-text4 hover:bg-primary/10 hover:text-primary font-[500]", "group flex gap-x-2 rounded-md p-3 text-sm/6 w-full relative")}
                          >
                            {isActive(item.href) ? <item.activeIcon aria-hidden="true" className={classNames(isActive(item.href) ? "text-primary dark:text-white " : "text-text4 group-hover:text-primary", "size-6 shrink-0 fill-none")} /> : <item.icon aria-hidden="true" className={classNames(isActive(item.href) ? "text-primary dark:text-white " : "fill-none text-text4 group-hover:text-primary", "size-6 shrink-0")} />}
                            {!isMinimized && item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <div className="w-full border-t border-border1 h-2 mt-4" />
                    <button className="group flex items-center w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-text4 hover:bg-gray-50 hover:text-primary">
                      <SidebarSupport aria-hidden="true" className="size-5 shrink-0 group-hover:text-primary" />
                      {!isMinimized && "Support"}
                    </button>
                    <button className="group flex items-center w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-text4 hover:bg-gray-50 hover:text-primary">
                      <SidebarFaq aria-hidden="true" className="size-5 shrink-0 group-hover:text-primary" />
                      {!isMinimized && "FAQ's"}
                    </button>
                    <button className="group flex items-center w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-text4 hover:bg-gray-50 hover:text-primary">
                      <SidebarSetting aria-hidden="true" className="size-5 shrink-0 group-hover:text-primary" />
                      {!isMinimized && "Setting"}
                    </button>
                    <div className="w-full border-t border-border1 h-2 mt-2" />
                    <button onClick={() => setShowLogoutDialog(true)} className="group flex items-center w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-text4 hover:bg-gray-50 hover:text-primary">
                      <SidebarLogout aria-hidden="true" className="size-5 shrink-0 group-hover:text-primary" />
                      {!isMinimized && "Logout"}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <ConfirmationDialog visible={showLogoutDialog} onHide={() => setShowLogoutDialog(false)} onAccept={handleLogoutConfirm} title="Confirm Logout" message="Are you sure you want to logout?" />
    </>
  );
};

export default Sidebar;
