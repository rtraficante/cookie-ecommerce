import React from "react";
import { connect } from "react-redux";
import { registration } from "../store";

/**
 * COMPONENT
 */
const SignUpForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="flex justify-center mt-8">
      <div className="border-2 drop-shadow-md p-6 w-[400px] rounded-md">
        <h2 className="text-2xl mb-4">Sign up</h2>
        <form onSubmit={handleSubmit} name={name}>
          <div className="flex flex-col">
            <label htmlFor="email">
              <h2>Email</h2>
            </label>
            <input
              name="email"
              type="text"
              className="border-2 drop-shadow-md p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username">
              <h2>Username</h2>
            </label>
            <input
              name="username"
              type="text"
              className="border-2 drop-shadow-md p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mt-4">
              <h2>Password</h2>
            </label>
            <input
              name="password"
              type="password"
              className="border-2 drop-shadow-md p-2 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="drop-shadow-md px-4 py-2 bg-blue-600 text-white mt-6 rounded-md"
            >
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(registration(email, username, password, formName));
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignUpForm);
