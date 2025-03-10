import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.classList.toggle("light", !isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    const lightTheme = "/assets/css/theme.css";
    const darkTheme = "/assets/css/theme_dark.css";

    // Remove any existing theme stylesheets
    const existingLink = document.getElementById("dynamic-theme");
    if (existingLink) {
      existingLink.href = isDarkMode ? darkTheme : lightTheme;
      return;
    }

    // Create a new theme link if it does not exist
    const link = document.createElement("link");
    link.id = "dynamic-theme";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = isDarkMode ? darkTheme : lightTheme;
    document.head.appendChild(link);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
