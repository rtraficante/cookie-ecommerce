import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/admin/users";
import { Container, Grid, Typography, Paper, Box } from "@material-ui/core";
import SingleUserView from "./SingleUserView";

const AllUsersView = () => {
  const users = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <Container maxWidth="lg" sx={{ marginY: 12 }}>
        <Grid container spacing={5}>
          {users.map((user) => {
            return (
              <Grid item xs={3} key={user.id}>
                <Paper elevation={3}>
                  <SingleUserView user={user} variant="contained" />
                  <Box padding={1} bgcolor="#a05050" align="center">
                    <Typography color="inherit" variant="subtitle1" component="h4">
                      E-MAIL: {user.email.toUpperCase()}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default AllUsersView;
