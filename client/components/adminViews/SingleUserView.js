import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUser } from "../../store/admin/singleUser";
import { Modal, Box, Button, makeStyles } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SingleUserView = ({ user }) => {
  // const user = useSelector((state) => state.singleUser);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  // const [singleUser] = useState(user);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const body = (
    <div style={modalStyle} variant="button" className={classes.paper}>
      <h2 id="user-modal" align="center">
        {user.username}
      </h2>
      <p id="simple-modal-description" align="center">
        {user.firstName} {user.lastName}
      </p>
      <SingleUserView user={user} />
    </div>
  );

  return (
    <>
      <Box padding={1} bgcolor="aliceBlue" align="center">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          {user.username}
        </Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ position: "absolute", border: "2px solid #000" }}>{body}</Box>
        </Modal>
      </Box>
    </>
  );
};

export default SingleUserView;
