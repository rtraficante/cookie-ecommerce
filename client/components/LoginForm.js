import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const LoginForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="flex justify-center">
      <div className="border-2 drop-shadow-md p-6 w-[400px] rounded-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit} name={name}>
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

        <h2 className="mt-4">
          No account?{" "}
          <Link className="text-blue-600 hover:underline" to="/signup">
            Signup Here
          </Link>
        </h2>
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
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);
