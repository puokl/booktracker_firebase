import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { app, database } from "../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type AuthType = {
  email: string;
  password: string;
};
export default function Home() {
  let auth = getAuth(app);
  let googleProvider = new GoogleAuthProvider();
  const [data, setData] = useState({});

  const handleInput = (event: any) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
  };

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      // signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      // signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <>
      <div>
        <input
          name="email"
          placeholder="Email"
          onChange={(event) => handleInput(event)}
        />
        <input
          name="password"
          placeholder="Password"
          onChange={(event) => handleInput(event)}
        />
        <br />
        <button onClick={handleSignup}>SignUp</button>
        <br />
        <button onClick={handleLogin}>Login</button>
        <br />
        <button onClick={handleGoogleLogin}>Login with google</button>
      </div>
    </>
  );
}
