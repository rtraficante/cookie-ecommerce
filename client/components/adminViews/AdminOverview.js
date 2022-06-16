import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../../store/admin/users';

class AdminOverview extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        <h1>Admin Tools</h1>
        <h2>
          <Link to="/admin/products/add">Add Product</Link>
        </h2>
        <h2>Users</h2>
        <div>
          {users.map((user) => {
            return <div key={user.id}>User: {user.username}</div>;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminOverview);
