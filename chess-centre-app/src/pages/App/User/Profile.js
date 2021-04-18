import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { getMember } from "../../../api/profile/chess";
import { ChessInfo, AccountInfo } from "./sections";
import { useAuthState } from "../../../context/Auth";

function Profile() {
  const { user } = useAuthState();
  const [member, setMember] = useState({});
  const [customerPortalUrl, setCustomerPortalUrl] = useState();

  useEffect(() => {
    const getUser = async () => {
      const m = await getMember(user);
      setMember(m);
    };

    const getCustomerPortal = async () => {
      const returnUrl = `${window.location.origin}/app/profile`;
      const { url } = await API.post("public", "/customer-portal", {
        body: {
          returnUrl,
        },
      });

      setCustomerPortalUrl(url);
    };

    getUser();
    getCustomerPortal();
  }, [user]);

  return (
    <div className="mt-4 mb-4 lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
        <nav className="space-y-1">
          <Link
            to="#"
            className="bg-gray-50 dark:bg-gray-800 text-teal-700 dark:text-teal-400 hover:text-teal-700 hover:bg-white group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            aria-current="page"
          >
            <svg
              className="text-teal-500 dark:text-teal-400 group-hover:text-teal-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="truncate">Account</span>
          </Link>

          {customerPortalUrl && (
            <a
              href={customerPortalUrl}
              className="text-gray-900 dark:text-gray-50 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            >
              <svg
                className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span className="truncate">Subscription</span>
            </a>
          )}
        </nav>
      </aside>
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <ChessInfo {...member} />
        <AccountInfo {...member} />
        {/* <Preferences {...member} /> */}
      </div>
    </div>
  );
}

export default Profile;
