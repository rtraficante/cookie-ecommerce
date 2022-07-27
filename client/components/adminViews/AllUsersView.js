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
    <div className="w-full flex justify-start md:justify-center text-xs md:text-sm">
      <div className="overflow-scroll h-[90vh]">
        <table className="w-[95%] m-4 mt-1 border-separate border-spacing-y-2 table-auto max-w-[900px] overflow-scroll">
          <tbody>
            <tr className="shadow-sm">
              <th className="rounded-md text-center p-2">Username</th>
              <th className="rounded-md rounded-r-none text-center">
                First Name
              </th>
              <th className="rounded-md rounded-l-none rounded-r-none text-center">
                Last Name
              </th>
              <th className="rounded-md rounded-l-none text-center">Email</th>
            </tr>

            {users.map((user) => (
              <tr key={user.id} className="shadow-sm">
                <td className="rounded0md text-center rounded-r-none p-2">
                  {user.username}
                </td>
                <td className="rounded0md text-center rounded-l-none rounded-r-none">
                  {user.firstName}
                </td>
                <td className="rounded0md text-center rounded-l-none rounded-r-none">
                  {user.lastName}
                </td>
                <td className="rounded0md text-center rounded-l-none">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsersView;
