import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Fade, Menu, MenuItem } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

const DropDownMenu = ({ handleClick, isLoggedIn, isAdmin, classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const clickHandler = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={clickHandler}>
        <MenuIcon />
      </IconButton>
      <Menu id="fade-menu" MenuListProps={{ "aria-labelledby": "fade-button" }} anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
        <div>
          <MenuItem>
            <Link to="/products" onClick={handleClose}>
              Products
            </Link>
          </MenuItem>
        </div>
        {isAdmin ? (
          <div>
            <MenuItem>
              <Link to="/admin" onClick={handleClose}>
                Admin Tools
              </Link>
            </MenuItem>
          </div>
        ) : null}
        {isLoggedIn ? (
          <div>
            <MenuItem>
              <Link
                onClick={() => {
                  handleClick();
                  handleClose();
                }}
                to="/products"
              >
                Log Out
              </Link>
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem>
              <Link to="/login" onClick={handleClose}>
                Log In
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/signup" onClick={handleClose}>
                Sign Up
              </Link>
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default DropDownMenu;
