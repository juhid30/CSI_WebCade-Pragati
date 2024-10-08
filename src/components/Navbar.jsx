/* eslint-disable react/prop-types */
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

const navigationstudent = [
  { name: "Resume", href: "/upload-resume", current: false },
  { name: "Profile", href: "/home", current: false },
  { name: "Rating", href: "/datacp", current: false },
  { name: "View Jobs", href: "/jobs", current: false },
  { name: "Calendar", href: "/calendar", current: false },
];
const navigationrecruter = [
  { name: "Profile", href: "/upload-resume", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [role, setRole] = useState();
  useEffect(() => {
    const type = localStorage.getItem("studentRole");
    setRole(type);
  }, []);

  const NavbarStudent = ({ navigation }) => (
    <Disclosure
      as="nav"
      className="bg-white shadow-lg w-full data-scroll-section"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-around sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img src={logo} alt="Logo" className="block h-10 w-auto" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-purple-900 text-white"
                            : "text-gray-900 hover:bg-purple-300 hover:text-black",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Notification and Profile buttons (add more icons if needed) */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none">
                      <span className="sr-only">Open user menu</span>
                      <BellIcon className="h-6 w-6 text-gray-900" />
                    </Menu.Button>
                  </div>
                  {/* Add profile menu items here */}
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-purple-900 text-white"
                      : "text-gray-900 hover:bg-purple-300 hover:text-black",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );

  const NavbarRecruiter = ({ navigation }) => (
    <Disclosure
      as="nav"
      className="bg-white shadow-lg w-full data-scroll-section"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-around sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img src={logo} alt="Logo" className="block h-10 w-auto" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-purple-900 text-white"
                            : "text-gray-900 hover:bg-purple-300 hover:text-black",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );

  if (role === "Student") {
    return <NavbarStudent navigation={navigationstudent} />;
  } else if (role === "Recruiter") {
    return <NavbarRecruiter navigation={navigationrecruter} />;
  }
}
