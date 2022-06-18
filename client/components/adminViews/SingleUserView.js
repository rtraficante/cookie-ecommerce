import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/admin/singleUser";
import { Modal, Typography, Box, Button, makeStyles } from "@material-ui/core";

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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // const { id } = props.match.params;
  //   dispatch(fetchUser(user.id));
  // }, [user]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">whatevers</p>
      <SingleUserView user={user} /> {/* inception */}
    </div>
  );

  return (
    <>
      <Box padding={1} bgcolor="aliceBlue">
        <Button onClick={handleOpen}>{user.username}</Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ position: "absolute", border: "2px solid #000" }}>{body}</Box>
        </Modal>
      </Box>
    </>
  );
};

export default SingleUserView;
