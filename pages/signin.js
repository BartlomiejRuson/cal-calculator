import React, { useRef, useState,useEffect } from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import { signin, useAuth } from "../firebase";

function SignIn() {
  const Router = useRouter();
  const currentUser = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const handleSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await signin(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("sign in error");
    }

    setLoading(false);
  };

  useEffect(() => {
    if(currentUser) Router.push('/')
  

  }, [currentUser])
  

  return (
    <div className="max-w-screen flex items-center justify-center h-screen bg-gray-200">
      <Link href="/">
        <span className="absolute top-2 left-2 cursor-pointer">
          go back to the main page
        </span>
      </Link>
      <div className="flex flex-col justify-between w-124 h-96 text-center font-semibold text-lg border-2 border-gray-600 shadow-xl p-4 rounded-md">
        <form className="flex flex-col" onSubmit={handleSignIn}>
          <h2 className="py-5">Sign In</h2>
          <div className="py-2 flex justify-between">
            <label htmlFor="email">e-mail: </label>
            <input ref={emailRef} type="email" name="email" id="email" />
          </div>
          <div className="py-2 flex justify-between">
            <label htmlFor="email">password: </label>
            <input
              ref={passwordRef}
              type="password"
              name="passwd"
              id="passwd"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="px-4 py-2 mt-16 mx-auto  font-bold shadow bg-white focus:shadow-outline hover:bg-green-300 transition-all ease-out"
          >
            SIGN IN
          </button>
        </form>
        <Link href="/signup">
          <span className="hover:text-blue-500 cursor-pointer transition-all ease-out">
            i don&apos;t have an account
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
