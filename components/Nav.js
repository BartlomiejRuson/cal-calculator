import Link from "next/link";
import React, { useState, useContext} from "react";
import { logout, useAuth } from "../firebase";

import { userContext } from "../src/userContext";
function Nav({ dayTotal,clearArrays }) {
  const { user,setUser, dailyRequirement,setDailyRequirement } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  useAuth();
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout().then(() => {
        setDailyRequirement(0);
        setUser(null)
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  

  return (
    <nav className="sticky top-0 bgGradient py-1 h-20 shadow-xl text-white">
      <div className="flex  justify-items-center items-center justify-center p-3">
        <div className=" absolute left-5 sm:left-10 top-1/2 -translate-y-1/2 md:left-1/4 md:-translate-x-12 text-lg whitespace-nowrap text-center flex flex-col">
          
          {dailyRequirement ? (
            <div > <span>Today&apos;s total:</span>  <span className="flex gap-1 justify-end cursor-pointer">{dayTotal} / {dailyRequirement}  <svg onClick={()=>{ clearArrays()}} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 self-end text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg></span>  </div> 
          ) : (
            <span>Today&apos;s total: <br /> {dayTotal}</span>
          )}
        </div>
        <span className="px-4 text-xl font-semibold hidden md:block">
          Calorie
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 hidden sm:block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <span className="px-4 text-xl font-semibold hidden md:block" >
          Calculator
        </span>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-0 mr-1">
        {user ? (
          <div className="flex">
            <Link href="/myprofile">
              <button
                disabled={loading}
                className="px-2 py-1 md:px-4 md:py-2 font-semibold shadow bg-white focus:shadow-outline hover:bg-myLightBlue transition-all text-myDarkBlue  ease-out text-base uppercase whitespace-nowrap mx-1"
              >
                My profile
              </button>
            </Link>
            <button
              disabled={loading}
              onClick={handleLogout}
              className="px-2 py-1 md:px-4 md:py-2 font-semibold shadow bg-white focus:shadow-outline hover:bg-myLightBlue transition-all text-myDarkBlue  ease-out text-base uppercase whitespace-nowrap mx-1"
            >
              Log out
            </button>
          </div>
        ) : (
          <Link href="/signup">
            <button
              disabled={loading}
              className="px-4 mr-2 py-2 font-semibold shadow bg-white focus:shadow-outline hover:bg-myLightBlue transition-all ease-out text-base uppercase whitespace-nowrap  text-myDarkBlue"
            >
              Sign up
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
