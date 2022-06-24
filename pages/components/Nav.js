import Link from "next/link";
import React,{useState} from "react";
import { logout, useAuth } from "../../firebase";
function Nav({ dayTotal }) {
  const {currentUser} = useAuth();
  const [loading,setLoading] = useState(false);
  const handleLogout = async () =>{
    setLoading(true);
    try{
      await logout();
    } catch(err) {
      console.error(err)
    }
    setLoading(false);
  }

  return (
    <nav className="sticky top-0 bg-myDarkBlue py-1 border-b border-black text-white">
      <div className="flex  justify-items-center items-center justify-center">
                <h2 className=" absolute left-10 md:left-1/4 md:-translate-x-12 text-lg whitespace-nowrap text-center">Today&apos;s total: <br/> {dayTotal}</h2>
        <span className="px-4 text-xl font-semibold hidden md:block">
          Calorie
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
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
        <span className="px-4 text-xl font-semibold hidden md:block">
          Calculator
        </span>
      </div>

   
<div className="absolute top-1/2 -translate-y-1/2 right-0 mr-1">
      
          {currentUser ? (
              <div className="flex">
                <Link href='/myprofile'>
<button disabled={loading}  className="px-4 py-2 font-semibold shadow bg-white focus:shadow-outline hover:bg-myLightBlue transition-all text-myDarkBlue  ease-out text-base uppercase whitespace-nowrap mx-1">
                My profile
              </button>
              </Link>
<button disabled={loading} onClick={handleLogout} className="px-4 py-2 font-semibold shadow bg-white focus:shadow-outline hover:bg-myLightBlue transition-all text-myDarkBlue  ease-out text-base uppercase whitespace-nowrap mx-1">
                Log out
              </button>
              </div>


          ) : (
            <Link href="/signup">
              <button disabled={loading} className="px-4 py-2 font-semibold shadow bg-white focus:shadow-outline hover:bg-myLightBlue transition-all ease-out text-base uppercase whitespace-nowrap  text-myDarkBlue">
                Sign up
              </button>
            </Link>
          )}
</div>

    </nav>
  );
}

export default Nav;
