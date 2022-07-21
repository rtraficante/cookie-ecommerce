import { connect } from "react-redux";
import { logout } from "../store";
import React from "react";
import DropDownMenu from "./DropdownMenu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const history = useHistory();

  return (
    <div className="bg-blue-700 fixed w-full drop-shadow-xl z-50">
      <div className="flex items-center justify-between px-4 py-2 text-white">
        <div className="flex items-center">
          <DropDownMenu
            handleClick={handleClick}
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
          />
          <h2 className="font-bold text-white text-xl">GS-TEAM-Q</h2>
        </div>
        <div className="flex items-center">
          <ShoppingCartIcon
            className="cursor-pointer"
            onClick={() => history.push("/cart")}
          />
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
