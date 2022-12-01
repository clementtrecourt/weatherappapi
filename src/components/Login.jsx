import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
} from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);
  return (
    <div className="flex items-center flex-col">
      <div className="rounded mt-20 bg-[#ffffff55] w-[600px] h-[400px p-12 flex flex-col ">
        <h1 className="text-center font-bold text-[36px]">Login</h1>
        <input
          type="email"
          autoFocus
          className="p-[10px] mb-[10px] mt-3 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="p-[10px] mb-[10px] text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className=" bg-black p-[10px] text-[18px] mb-[10px]"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button
          className=" bg-[#4285f4] p-[10px] text-[18px] mb-[10px]"
          onClick={signInWithGoogle}
        >
          Login with Google
        </button>
        <div className="">
          <Link className=" font-semibold" to="/reset">
            Forgot Password
          </Link>
          <p className="">Don't have an account?</p>{" "}
          <Link className="font-semibold" to="/register">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
