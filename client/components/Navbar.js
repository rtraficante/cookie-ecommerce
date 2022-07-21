// import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { logout } from "../store";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DropDownMenu from "./DropdownMenu";
import CartCheckoutIcon from "./CartCheckoutIcon";
import { Box } from "@material-ui/core";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  return (
    <div className="">
      <AppBar position="fixed">
        <Toolbar>
          <DropDownMenu
            handleClick={handleClick}
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
          />
          <Typography className="" variant="h6" noWrap>
            GS-TEAM-Q
          </Typography>
          <div className="Cart-badge">
            <CartCheckoutIcon />
          </div>
          <div className={""}>
            <div className={""}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
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
