import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} setIsMinimized={setIsMinimized} isMinimized={isMinimized} />
      <div className={`${isMinimized ? "lg:ml-[84px] z-auto relative" : "lg:ml-[209px] 2xl:ml-[229px]"}`}>
        <Header toggleSidebar={toggleSidebar} setIsMinimized={setIsMinimized} isMinimized={isMinimized} />
        <main className="w-full max-w-screen p-4 pb-0">{children}</main>
      </div>
    </>
  );
};

export default Layout;
