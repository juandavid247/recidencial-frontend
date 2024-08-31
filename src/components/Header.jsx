import PropTypes from "prop-types";
import { useState } from "react";
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ setSidebarOpen, setSearchQuery, darkMode, toggleTheme }) => {
  const [searchQueryLocal, setSearchQueryLocal] = useState("");

  const handleSearchChange = (e) => {
    setSearchQueryLocal(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className={`sticky rounded-md top-0 z-40 flex h-16 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-2 sm:px-2 lg:px-8 ${
        darkMode
          ? "border-gray-700 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-900"
      }`}
    >
      <button
        type="button"
        className={`-m-2.5 p-2.5 lg:hidden ${
          darkMode ? "text-white" : "text-gray-700"
        }`}
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div
        className={`h-6 w-px ${
          darkMode ? "bg-gray-700" : "bg-gray-900/10"
        } lg:hidden`}
        aria-hidden="true"
      />
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form
          className="relative flex flex-1"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon
            className={`pointer-events-none absolute inset-y-0 left-0 h-full w-5 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
            aria-hidden="true"
          />
          <input
            id="search-field"
            className={`block h-full w-full border-0 py-0 pl-8 pr-0 ${
              darkMode
                ? "bg-gray-900 text-white placeholder:text-gray-500"
                : "text-gray-900 placeholder:text-gray-400"
            } focus:ring-0 sm:text-sm`}
            placeholder="Search..."
            type="search"
            name="search"
            value={searchQueryLocal}
            onChange={handleSearchChange}
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Switch
            checked={darkMode}
            onChange={toggleTheme}
            className={classNames(
              darkMode ? "bg-indigo-600" : "bg-gray-200",
              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            )}
          >
            <span className="sr-only">Toggle theme</span>
            <span
              className={classNames(
                darkMode ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            >
              <span
                className={classNames(
                  darkMode
                    ? "opacity-0 duration-100 ease-out"
                    : "opacity-100 duration-200 ease-in",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                )}
                aria-hidden="true"
              >
                <SunIcon
                  className="h-3 w-3 text-yellow-500"
                  aria-hidden="true"
                />
              </span>
              <span
                className={classNames(
                  darkMode
                    ? "opacity-100 duration-200 ease-in"
                    : "opacity-0 duration-100 ease-out",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                )}
                aria-hidden="true"
              >
                <MoonIcon
                  className="h-3 w-3 text-indigo-600"
                  aria-hidden="true"
                />
              </span>
            </span>
          </Switch>
          <button
            type="button"
            className={`${
              darkMode
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-500 hover:text-gray-700"
            } -m-2.5 p-2.5`}
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div
            className={`hidden lg:block lg:h-6 lg:w-px ${
              darkMode ? "lg:bg-gray-700" : "lg:bg-gray-900/10"
            }`}
            aria-hidden="true"
          />
          <div className="relative">
            <button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="../../images/profile.jpg"
                alt="User avatar"
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className={`ml-4 text-sm font-semibold leading-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  aria-hidden="true"
                >
                  Juan D.
                </span>
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Header;
