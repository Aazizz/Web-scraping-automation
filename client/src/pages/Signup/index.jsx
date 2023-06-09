import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Input} from "antd";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let validate = true;
  /*const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value}); //The object passed to setData uses the spread operator (...data) to copy all the properties of the data object into the new object. This is done to preserve any existing data that was previously set.
  };*/
  //([input.name]) is used to dynamically set the value of a property in the new object. The name of the property is taken from the name attribute of the input element that triggered the event, and its value is taken from the value attribute of that same input element.

  //The main advantage of using an async function in React is that it allows you to use the await keyword
  //to wait for asynchronous operations to complete, such as fetching data from an API or performing an expensive computation.
  /* const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };*/

  const handleSubmit = (e) => {
    console.log(firstName, lastName, email, password);
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      toast.error("All fields must be filled out!");
      validate = false;
    } else {
      if (password.length < 6) {
        toast.warning("Short Password");
        validate = false;
      } else {
        if (password.search(/\d/) == -1) {
          toast.warning("Your password must contain alphanumeric characters!");
          validate = false;
        }
        if (password.search(/[a-zA-Z]/) == -1) {
          toast.warning("Your password must contain alphanumeric characters!");
          validate = false;
        }
        if (password.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) == -1) {
          toast.warning("Your password must contain symbols!");
          validate = false;
        }
      }
    }
    if (validate == true) {
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Acess-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success("Registration successful!");
            window.location = "/login";
          }
        });
    }
  };//generally sturcture handle subbmit is done this way
  //preventDefault  is called on an event object to prevent the default behavior of an event from occurring.
  //example, when a user clicks on a link element, the default behavior of the click event is to navigate to the URL specified in the href attribute of the link element. If you attach an event listener to the link element and call the preventDefault() function on the event object inside the event handler function, you can prevent the link from navigating to its default URL.
  //here the default behavior of the form submission event, which is to reload the page. Instead, we can do something else, such as send an AJAX request to the server to submit the form data without reloading the page.
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign up Form</h1>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/signup.jpg" alt="signup" />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Create Account</h2>
          <Input
            type="text"
            name="firstName"
            className={styles.input}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            name="lastName"
            className={styles.input}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            type="email"
            name="email"
            className={styles.input}
            placeholder="Email "
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input.Password
            type="password"
            className={styles.input}
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.btn} onClick={handleSubmit}>
            Sign Up
          </button>

          <p className={styles.text}>or</p>
          <button className={styles.google_btn}>
            <img src="./images/google.png" alt="google icon" />
            <span>Sign up with Google</span>
          </button>
          <p className={styles.text}>
            Already Have Account ? <Link to="/login">Log In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
