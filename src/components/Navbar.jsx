import React from "react";
import { Sun, Moon, SunIcon } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";

const navbar = () => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <>
      <nav id="home" className="relative flex p-4 items-center justify-center font-medium text-gray-700 dark:text-slate-200 bg-linear-to-t from-primary-white to-primary-off-white overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-primary-green/20 dark:opacity-50 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-100 h-100 bg-emerald-400/10 dark:opacity-50 rounded-full blur-[100px] pointer-events-none"></div>
        <ul className="flex gap-8 text-sm items-center">
          <li className="hover:text-primary-green transition-colors duration-300 cursor-pointer">
            <a href="#about">
            ABOUT

            </a>
          </li>
          <li className="hover:text-primary-green transition-colors duration-300 cursor-pointer">
            <a href="#analyzer">
            PROMPT ANALYZER

            </a>
          </li>
          {/*IMPLEMENT THIS LATER FUTURE
        
        I GOTCHU ME 3 DAYS AGO*/}
          <li className="border-x px-2 border-primary-dark/20 ">
            <label className="inline-flex items-center relative cursor-pointer scale-75 md:scale-90 ">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
                aria-label="Toggle Dark Mode"
                className="sr-only peer"
              />
              <div
                className={`relative w-16 h-8 rounded-full shadow-inner transition-colors duration-300 ${theme === "dark" ? "bg-zinc-700" : "bg-gray-200"} peer-focus-visible:ring-2 peer-focus-visible:ring-primary-green peer-focus-visible:ring-offset-2`}
              >
                <Sun
                  size={14}
                  className={`absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-40"}`}
                />
                <Moon
                  size={14}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 ${theme === "dark" ? "opacity-40" : "opacity-0"}`}
                />

                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-md transition-all duration-300 ease-in-out flex items-center justify-center z-10 ${theme === "dark" ? "translate-x-8 bg-zinc-900" : "translate-x-0 bg-white"}`}
                >
                  {theme === "light" ? (
                    <Sun
                      size={14}
                      className="text-orange-500 fill-orange-500"
                    />
                  ) : (
                    <Moon
                      size={14}
                      className="text-primary-green fill-primary-green"
                    />
                  )}
                </div>
              </div>
            </label>{" "}
          </li>
          <li className="hover:text-primary-green transition-colors duration-300 cursor-pointer">
            <a
              href="https://github.com/Showcxse/llm-carbon-tracker"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/*IM TOO LAZY TO MAKE THIS SHIT I JUST GOOGLED IT*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 hover:text-primary-green transition-colors duration-300"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.14-1.11-1.45-1.11-1.45-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
          </li>
          <li className="hover:text-primary-green transition-colors duration-300 cursor-pointer">
            <a
              href="https://www.linkedin.com/in/casey-abbott-0148553a2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-6 h-6 hover:text-primary-green transition-colors duration-300"
              >
                <path d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default navbar;
