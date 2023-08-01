import React from "react";
import Navbar from "./Navbar";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className="bg-gray-900 py-12 ">
        <div className=" mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 text-white">
            <div className="font-mont">
              <h3 className="text-[13px] md:text-xl font-semibold my-4">
                Site Links
              </h3>
              <ul className="space-y-4 text-[13px] md:text-[16px]">
                <li>
                  <Link href="/" className="hover:text-blue-500 ">
                    Home
                </Link>
                </li>
                <li>
                  <Link href="/About" className="hover:text-blue-500">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className="font-mont">
              <h3 className="text-[13px] md:text-xl font-semibold my-4">
                Social Media
              </h3>
              <ul className="space-y-4 text-[13px] md:text-[16px]">
                <li>
                  <Link
                    href="https://na8an-web.github.io/Portfolio/myportfolio/index.html"
                    target={"_blank"}
                    className="hover:text-blue-500"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com/IJKLOTS"
                    className="hover:text-blue-500"
                    target={"_blank"}
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/Na8aN-web"
                    className="hover:text-blue-500"
                    target={"_blank"}
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/nathan-kaduru-a19776199/"
                    className="hover:text-blue-500"
                    target={"_blank"}
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
            <div className="font-mont">
              <h3 className="text-[13px] md:text-xl font-semibold my-4">
                Contact Me
              </h3>
              <p className="text-white hover:text-blue-500 mb-4 text-[13px] md:text-[16px]">
                oblivin008@gmail.com
              </p>
              <p className="text-white hover:text-blue-500 mb-4 text-[13px] md:text-[16px]">
                +2348144585483
              </p>
            </div>
            <div className="font-mont">
              <h3 className="text-[13px] md:text-xl font-semibold my-4">
                Location
              </h3>
              <p className="text-white hover:text-blue-500 mb-4 text-[13px] md:text-[16px]">Lagos</p>
              <p className="text-white hover:text-blue-500 mb-4 text-[13px] md:text-[16px]">
                Nigeria
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
