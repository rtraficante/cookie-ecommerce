import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/admin/users';
import { Container, Grid, Typography, Paper, Box, createTheme, ThemeProvider } from '@material-ui/core';
import SingleUserView from './SingleUserView';

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: 'body2',
          },
          style: {
            fontSize: 11,
          },
        },
        {
          props: {
            variant: 'body3',
          },
          style: {
            fontSize: 9,
          },
        },
      ],
    },
  },
});

const AllUsersView = () => {
  const users = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="allusers">
      <Container maxWidth="lg" sx={{ marginY: 12 }}>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            {users.map((user, i) => {
              return (
                <Grid item xs={3} key={user.id}>
                  <Paper elevation={3}>
                    {user.username}
                    <SingleUserView user={user} />
                    <Box padding={1}>
                      <Typography variant="subtitle2" component="h4">
                        email: {user.email}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </ThemeProvider>
      </Container>
    </div>
  );
};

export default AllUsersView;

/*
<Box padding={1} bgcolor="aliceBlue">
                      <Typography variant="subtitle1" component="h3">
                        Username: {user.username}
                      </Typography>
                    </Box>
                    */
