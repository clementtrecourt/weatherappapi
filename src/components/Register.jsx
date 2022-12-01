import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);
  return (
    <div className="flex items-center flex-col">
      <div className="rounded mt-20 bg-[#ffffff55] w-[600px] h-[400px p-12 flex flex-col ">
        <h1 className="text-center font-bold text-[36px]">Register</h1>
        <input
          type="text"
          className="p-[10px] mb-[10px] mt-3 text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="email"
          className="p-[10px] mb-[10px] text-black"
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
          className="bg-black p-[10px] text-[18px] mb-[10px]"
          onClick={register}
        >
          Register
        </button>
        <button
          className="bg-[#4285f4] p-[10px] text-[18px] mb-[10px]"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account?{" "}
          <div>
            <Link className="font-semibold" to="/">
              Login now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
