import React from "react";
import { useState } from "react";
import c from "./RegistrationForm.module.css"
export const RegistrationForm = () => {
  const [data, setData] = useState({
    first_name: "",
    surname: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onRegistrationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(data)
  }
  return (
    <form className={c.form} >
      <div className={c.title}>Registration</div>
      <div className={c.inputContainer}>
        <input className={c.input}
          onChange={onChangeHandler}
          value={data.surname}
          name="surname"
          placeholder="Surname"
        />
      </div>
      <div className={c.inputContainer}>
        <input className={c.input}
          onChange={onChangeHandler}
          value={data.first_name}
          name="first_name"
          placeholder="First name"
        />
      </div>
      <div className={c.inputContainer}>
        <input className={c.input}
          onChange={onChangeHandler}
          value={data.email}
          name="email"
          placeholder="Email"
        />
      </div>
      <div className={c.inputContainer}>
        <input className={c.input}
          onChange={onChangeHandler}
          value={data.password}
          name="password"
          placeholder="Password"
        />
      </div>
      <div className={c.inputContainer}>
        <input className={c.input}
          onChange={onChangeHandler}
          value={data.repeat_password}
          name="repeat_password"
          placeholder="Repeat password"
        />
      </div>
      <button onClick={onRegistrationHandler} className={c.btn}>Registration</button>
    </form>
  );
};
