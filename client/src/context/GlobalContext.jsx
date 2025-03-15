import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { essentialData } from "../utils/utils";
import { getCookie, setCookie } from "../utils/commonUtils";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const storedTheme = getCookie("theme") || essentialData?.light;
  const [theme, setTheme] = useState(storedTheme);

  // Update <html> class whenever theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Store theme in cookies
    setCookie("theme", theme);
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <GlobalContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalProvider };
