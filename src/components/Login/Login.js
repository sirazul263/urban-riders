import React from "react";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faf } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { firebaseConfig } from "./firebase.config";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [user, setUser] = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  //Providers
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    if (!loggedIn && data.email && data.password) {
      if (data.password === data.confirm) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then((res) => {
            const userInfo = {
              name: data.name,
              email: data.email,
            };
            updateInfo(data.name);
            setUser(userInfo);
            const newError = "";
            setError(newError);
            history.replace(from);
            // ...
          })
          .catch((error) => {
            var errorMessage = error.message;
            setError(errorMessage);
            // ..
          });
      } else {
        setError(`Password didn't match`);
      }
    } else if (loggedIn && data.email && data.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          const name = currentUser();
          const userInfo = {
            name: name,
            email: data.email,
          };
          setUser(userInfo);
          history.replace(from);
          // ...
        })
        .catch((error) => {
          var errorMessage = error.message;
          setError(errorMessage);
        });
    }
  };
  const updateInfo = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        // Update successful
        // ...
      })
      .catch((error) => {
        setError(error.message);
        // ...
      });
  };
  const currentUser = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const name = user.displayName;
      return name;
    }
  };
  const signInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const users = result.user;
        const signedInUser = {
          name: users.displayName,
          email: users.email,
          photo: users.photoURL,
        };
        setUser(signedInUser);
        //setLoggedIn(true);
        history.replace(from);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        setError(error.message);
        // ...
      });
  };
  return (
    <div className="create-account ">
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <h5>{loggedIn ? "Log In" : "Create an account"}</h5>
        {!loggedIn && (
          <div>
            {" "}
            <input
              {...register("name", { required: true })}
              placeholder="Name"
            />
            <br />
            {errors.name?.type === "required" && (
              <span className="error">Name is required*</span>
            )}{" "}
          </div>
        )}
        <br />
        <input
          {...register("email", { required: true })}
          placeholder="Email or Username"
        />
        <br />
        {errors.email && <span className="error">Email is required*</span>}
        <br />
        <input
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
        />
        <br />
        {errors.password && (
          <span className="error">Password is required*</span>
        )}
        <br />
        {!loggedIn && (
          <div>
            <input
              {...register("confirm", { required: true })}
              placeholder="Confirm Password"
              type="password"
            />
            <br />
            {errors.confirm && (
              <span className="error">Confirm password is required*</span>
            )}
            <br />
          </div>
        )}
        {error && <p className="error">{error}</p>}
        {loggedIn && (
          <div className="text-center d-flex" style={{ marginLeft: "80px" }}>
            <div className="form-check">
              <input
                value=""
                type="checkbox"
                className="form-check-input"
                id="flexCheckChecked"
                style={{ width: "10px" }}
              />
              <label
                class="form-check-label"
                for="flexCheckChecked"
                style={{ paddingLeft: "5px" }}
              >
                Remember me?
              </label>
            </div>
            <div>
              <p className="forget-password">Forget Password?</p>
            </div>
          </div>
        )}
        <input
          type="submit"
          className="submit-btn"
          value={loggedIn ? "Login" : "Create an account"}
        />
        <br />
        <br />
        <p className="text-center">
          {loggedIn ? `Don't have an account?` : " Already have an account?"}{" "}
          {loggedIn ? (
            <span className="login-para" onClick={() => setLoggedIn(false)}>
              Create an account
            </span>
          ) : (
            <span className="login-para" onClick={() => setLoggedIn(true)}>
              Login
            </span>
          )}
        </p>
      </form>
      <br />
      <p className="text-center d-flex">
        <hr style={{ width: "283px" }} />{" "}
        <span style={{ margin: "0px 5px" }}>Or</span>{" "}
        <hr style={{ width: "283px" }} />
      </p>
      <button className="social-btn">Continue with Facebook</button>
      <br />
      <button className="social-btn" onClick={signInWithGoogle}>
        {" "}
        <FontAwesomeIcon icon={["fab", "google"]} />
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
