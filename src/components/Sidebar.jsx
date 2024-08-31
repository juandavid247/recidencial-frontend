import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { navigation, teams, settings } from "../data/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ sidebarOpen, darkMode }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentNav, setCurrentNav] = useState(null);

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarExpanded');
    if (savedState !== null) {
      setIsExpanded(JSON.parse(savedState));
    }

    const savedNav = localStorage.getItem('currentNav');
    if (savedNav !== null) {
      setCurrentNav(JSON.parse(savedNav));
    }
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(prevState => {
      const newState = !prevState;
      localStorage.setItem('sidebarExpanded', JSON.stringify(newState));
      return newState;
    });
  };

  const handleNavClick = (name) => {
    setCurrentNav(name);
    localStorage.setItem('currentNav', JSON.stringify(name));
  };

  return (
    <div
      className={`fixed inset-0 z-40 lg:w-${
        isExpanded ? "80" : "20"
      } lg:static lg:inset-auto lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <div
        className={`relative flex flex-col gap-y-5 overflow-y-auto px-6 ring-1 ${
          darkMode
            ? "bg-gray-900 text-white ring-white/10"
            : "bg-white text-gray-700 ring-gray-200"
        } h-full`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(item.name)}
                      className={classNames(
                        item.name === currentNav
                          ? `${
                              darkMode
                                ? "bg-slate-800 text-indigo-600"
                                : "bg-gray-50 text-indigo-600"
                            }`
                          : `${
                              darkMode
                                ? "text-gray-400 hover:text-white hover:bg-slate-800"
                                : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                            }`,
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.name === currentNav
                            ? "text-indigo-600"
                            : `${
                                darkMode
                                  ? "text-gray-400 group-hover:text-white"
                                  : "text-gray-400 group-hover:text-indigo-600"
                              }`,
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {isExpanded && item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Teams
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {teams.map((team) => (
                  <li key={team.name}>
                    <a
                      href={team.href}
                      onClick={() => handleNavClick(team.name)}
                      className={classNames(
                        team.name === currentNav
                          ? `${
                              darkMode
                                ? "bg-slate-800 text-indigo-600"
                                : "bg-gray-50 text-indigo-600"
                            }`
                          : `${
                              darkMode
                                ? "text-gray-400 hover:text-white hover:bg-gray-900"
                                : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                            }`,
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <span
                        className={classNames(
                          team.name === currentNav
                            ? "text-indigo-600 border-indigo-600"
                            : `${
                                darkMode
                                  ? "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-white"
                                  : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600"
                              }`,
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                        )}
                      >
                        {team.initial}
                      </span>
                      {isExpanded && (
                        <span className="truncate">{team.name}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              {settings.map((setting) => (
                <a
                  key={setting.name}
                  href={setting.href}
                  onClick={() => handleNavClick(setting.name)}
                  className={classNames(
                    setting.name === currentNav
                      ? `${
                          darkMode
                            ? "bg-slate-800 text-indigo-600"
                            : "bg-gray-50 text-indigo-600"
                        }`
                      : `${
                          darkMode
                            ? "text-gray-400 hover:text-white hover:bg-gray-800"
                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                        }`,
                    "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                  )}
                >
                  <setting.icon
                    className={classNames(
                      setting.name === currentNav
                        ? "text-indigo-600"
                        : `${
                            darkMode
                              ? "text-gray-400 group-hover:text-white"
                              : "text-gray-400 group-hover:text-indigo-600"
                          }`,
                      "h-6 w-6 shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  {isExpanded && setting.name}
                </a>
              ))}
            </li>
          </ul>
        </nav>
      </div>
      <button
        onClick={toggleSidebar}
        className={classNames(
          "fixed top-1/2 -right-3 transform -translate-y-1/2 rounded-full p-1 shadow-lg focus:outline-none hidden lg:block",
          darkMode
            ? "bg-gray-800/50 backdrop-blur-md border border-gray-700 hover:border-indigo-600"
            : "bg-white/10 backdrop-blur-md border border-gray-400 hover:border-indigo-600"
        )}
      >
        {isExpanded ? (
          <ChevronLeftIcon
            className={classNames(
              "h-4 w-4",
              darkMode ? "text-gray-200" : "text-gray-500"
            )}
          />
        ) : (
          <ChevronRightIcon
            className={classNames(
              "h-4 w-4",
              darkMode ? "text-indigo-600" : "text-indigo-600"
            )}
          />
        )}
      </button>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default Sidebar;
