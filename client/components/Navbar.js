import { connect } from "react-redux";
import { logout } from "../store";
import React, { startTransition } from "react";
import DropDownMenu from "./DropdownMenu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="bg-blue-700 fixed w-full drop-shadow-xl z-50">
      <div className="flex items-center justify-between px-4 py-2 text-white">
        <div className="flex items-center">
          <DropDownMenu
            handleClick={handleClick}
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
          />
          <h2 className="font-bold text-white text-xl">COOKIES</h2>
        </div>
        <div className="flex items-center ">
          <ShoppingCartIcon
            className="cursor-pointer"
            onClick={() => history.push("/cart")}
          />
          {cart.length ? (
            <div className="rounded-full bg-red-600 absolute w-5 h-5 shadow-md top-2 border ml-2 animate-bounce ">
              <p className="text-center text-sm">{cart.length}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
