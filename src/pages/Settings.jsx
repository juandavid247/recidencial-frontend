import PropTypes from "prop-types";

const secondaryNavigation = [
  { name: "Account", href: "#", current: true },
  { name: "Notifications", href: "#", current: false },
  { name: "Billing", href: "#", current: false },
  { name: "Teams", href: "#", current: false },
  { name: "Integrations", href: "#", current: false },
];

export default function Settings({ darkMode }) {
  return (
    <div
      className={`xl:pl-72 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header
        className={`border-b ${
          darkMode ? "border-white/5" : "border-gray-200"
        }`}
      >
        {/* Secondary navigation */}
        <nav className="flex overflow-x-auto py-4">
          <ul
            role="list"
            className={`flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 ${
              darkMode ? "text-gray-400" : "text-gray-900"
            } sm:px-6 lg:px-8`}
          >
            {secondaryNavigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={
                    item.current
                      ? darkMode
                        ? "text-indigo-400"
                        : "text-indigo-600"
                      : ""
                  }
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Settings forms */}
      <div
        className={`divide-y ${
          darkMode ? "divide-white/5" : "divide-gray-200"
        }`}
      >
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-3 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2
              className={`text-base font-semibold leading-7 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Personal Information
            </h2>
            <p
              className={`mt-1 text-sm leading-6 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Use a permanent address where you can receive mail.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full flex items-center gap-x-8">
                <img
                  src="../../images/profile.jpg"
                  alt=""
                  className={`h-24 w-24 flex-none rounded-lg ${
                    darkMode ? "bg-gray-900" : "bg-gray-200"
                  } object-cover`}
                />
                <div>
                  <button
                    type="button"
                    className={`rounded-md ${
                      darkMode
                        ? "bg-white/10 text-white"
                        : "bg-gray-200 text-gray-900"
                    } px-3 py-2 text-sm font-semibold shadow-sm hover:bg-white/20`}
                  >
                    Change avatar
                  </button>
                  <p
                    className={`mt-2 text-xs leading-5 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className={`block text-sm font-medium leading-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className={`block w-full rounded-md border-0 ${
                      darkMode
                        ? "bg-white/5 text-white"
                        : "bg-gray-50 text-gray-900"
                    } py-1.5 shadow-sm ring-1 ring-inset ${
                      darkMode ? "ring-white/10" : "ring-gray-300"
                    } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className={`block text-sm font-medium leading-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className={`block w-full rounded-md border-0 ${
                      darkMode
                        ? "bg-white/5 text-white"
                        : "bg-gray-50 text-gray-900"
                    } py-1.5 shadow-sm ring-1 ring-inset ${
                      darkMode ? "ring-white/10" : "ring-gray-300"
                    } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium leading-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full rounded-md border-0 ${
                      darkMode
                        ? "bg-white/5 text-white"
                        : "bg-gray-50 text-gray-900"
                    } py-1.5 shadow-sm ring-1 ring-inset ${
                      darkMode ? "ring-white/10" : "ring-gray-300"
                    } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className={`block text-sm font-medium leading-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Username
                </label>
                <div className="mt-2">
                  <div
                    className={`flex rounded-md ${
                      darkMode ? "bg-white/5" : "bg-gray-50"
                    } ring-1 ring-inset ${
                      darkMode ? "ring-white/10" : "ring-gray-300"
                    } focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500`}
                  >
                    <span
                      className={`flex select-none items-center pl-3 ${
                        darkMode ? "text-gray-400" : "text-gray-900"
                      } sm:text-sm`}
                    >
                      example.com/
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className={`flex-1 border-0 bg-transparent py-1.5 pl-1 ${
                        darkMode ? "text-white" : "text-gray-900"
                      } focus:ring-0 sm:text-sm sm:leading-6`}
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="timezone"
                  className={`block text-sm font-medium leading-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Timezone
                </label>
                <div className="mt-2">
                  <select
                    id="timezone"
                    name="timezone"
                    className={`block w-full rounded-md border-0 ${
                      darkMode
                        ? "bg-white/5 text-white"
                        : "bg-gray-50 text-gray-900"
                    } py-1.5 shadow-sm ring-1 ring-inset ${
                      darkMode ? "ring-white/10" : "ring-gray-300"
                    } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black`}
                  >
                    <option>Pacific Standard Time</option>
                    <option>Eastern Standard Time</option>
                    <option>Greenwich Mean Time</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2
              className={`text-base font-semibold leading-7 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Change password
            </h2>
            <p
              className={`mt-1 text-sm leading-6 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Update your password associated with your account.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="current-password"
                  className={`block text-sm font-medium leading-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Current password
                </label>
                <div className="mt-2">
                  <input
                    id="current-password"
                    name="current-password"
                    type="password"
                    autoComplete="current-password"
                    className={`block w-full rounded-md border-0 ${
                      darkMode
                        ? "bg-white/5 text-white"
                        : "bg-gray-50 text-gray-900"
                    } py-1.5 shadow-sm ring-1 ring-inset ${
                      darkMode ? "ring-white/10" : "ring-gray-300"
                    } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="new-password"
                  className={`block text-sm font-medium leading-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  New password
                </label>
                <div className="mt-2">
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    autoComplete="new-password"
                    className={`block w-full rounded-md border-0 ${
                      darkMode
                        ? "bg-white/5 text-white"
                        : "bg-gray-50 text-gray-900"
                    } py-1.5 shadow-sm ring-1 ring-inset ${
                      darkMode ? "ring-white/10" : "ring-gray-300"
                    } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="confirm-password"
                  className={`block text-sm font-medium leading-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    className={`block w-full rounded-md border-0 ${
                      darkMode
                        ? "bg-white/5 text-white"
                        : "bg-gray-50 text-gray-900"
                    } py-1.5 shadow-sm ring-1 ring-inset ${
                      darkMode ? "ring-white/10" : "ring-gray-300"
                    } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2
              className={`text-base font-semibold leading-7 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Log out other sessions
            </h2>
            <p
              className={`mt-1 text-sm leading-6 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Please enter your password to confirm you would like to log out of
              your other sessions across all of your devices.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="logout-password"
                  className={`block text-sm font-medium leading-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Your password
                </label>
                <div className="mt-2">
                  <input
                    id="logout-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={`block w-full rounded-md border-0 ${
                      darkMode
                        ? "bg-white/5 text-white"
                        : "bg-gray-50 text-gray-900"
                    } py-1.5 shadow-sm ring-1 ring-inset ${
                      darkMode ? "ring-white/10" : "ring-gray-300"
                    } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Log out other sessions
              </button>
            </div>
          </form>
        </div>

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2
              className={`text-base font-semibold leading-7 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Delete account
            </h2>
            <p
              className={`mt-1 text-sm leading-6 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No longer want to use our service? You can delete your account
              here. This action is not reversible. All information related to
              this account will be deleted permanently.
            </p>
          </div>

          <form className="flex items-start md:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
            >
              Yes, delete my account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Settings.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};
