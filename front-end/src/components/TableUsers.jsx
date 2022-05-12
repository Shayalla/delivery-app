import React from 'react';
import PropTypes from 'prop-types';

function TableUsers(props) {
  const { user, index } = props;
  const { id, name, email, role } = user;

  return (
    <>
      <td data-testid={ `admin_manage__element-user-table-item-number-${id}` }>
        {index + 1}
      </td>
      <td data-testid={ `admin_manage__element-user-table-name-${id}` }>
        {name}
      </td>
      <td data-testid={ `admin_manage__element-user-table-email-${id}` }>
        {email}
      </td>
      <td data-testid={ `admin_manage__element-user-table-role-${id}` }>
        {role}
      </td>
    </>
  );
}

TableUsers.propTypes = {
  index: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default TableUsers;
