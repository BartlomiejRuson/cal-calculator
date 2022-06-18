import React, { useRef,useState,useEffect } from "react";
import {useRouter} from 'next/router'
import Link from "next/link";
import { signup ,useAuth,initUserRequirement} from "../firebase";
function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading,setLoading] = useState(false);
  const currentUser = useAuth();
  const Router = useRouter();
  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    try {
      await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch(err) {
      console.error(err)
    }



    setLoading(false);
  };
  useEffect(() => {
    
  if(currentUser){
    Router.push("/");

  }

  }, [currentUser])
  
  return (
    <div className="max-w-screen flex items-center justify-center h-screen bg-myDarkBlue text-white">
      <Link href="/">
        <span className="absolute top-2 left-2 cursor-pointer">
          go back to the main page
        </span>
      </Link>
      <div className="flex flex-col justify-between w-124 h-96 text-center font-semibold text-lg border-2 border-white shadow-xl p-4 rounded-md">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h2 className="py-5">Sign Up</h2>
          <div className="py-2 flex justify-between">
            <label htmlFor="email">e-mail: </label>
            <input ref={emailRef} type="email" name="email" id="email" className="text-black"/>
          </div>
          <div className="py-2 flex justify-between">
            <label htmlFor="email" className="mr-1 ">password:</label>
            <input
              ref={passwordRef}
              type="password"
              name="passwd"
              id="passwd"
              className="text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading || currentUser}
            className="px-4 py-2 mt-16 mx-auto  font-bold shadow bg-white focus:shadow-outline hover:bg-myLightBlue transition-all ease-out text-myDarkBlue"
          >
            SIGN UP
          </button>
        </form>
        <Link href="/signin">
          <span className="hover:text-myLightBlue cursor-pointer transition-all ease-out">
            I already have an account
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
