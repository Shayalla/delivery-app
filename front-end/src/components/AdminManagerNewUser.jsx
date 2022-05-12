import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import { admimCreateUser, deleteUser } from '../services/user';
import ErrorRegister from './ErrorRegisterAdmin';
import TableUsers from './TableUsers';

function AdminManagerNewUser() {
  const [isDisable, setIsDisable] = useState(true);
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    users,
    setUsers,
    getUsers,
  } = useContext(Context);
  console.log(users);
  const userLocalStorage = localStorage.getItem('user');
  const ordersObj = JSON.parse(userLocalStorage);
  const { token } = ordersObj;
  const hasToken = token;

  const handleClickAdminManagerNewUser = async (e) => {
    e.preventDefault();
    const create = await admimCreateUser({ name, email, password, role }, hasToken);
    getUsers();
    return create;
  };

  const removeUser = async (idUser, tokenUser) => {
    await deleteUser(idUser, tokenUser);
  };

  const removeUser = async (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    await deleteUser(id, token);
    setUsers(newUsers);
  };

  useEffect(() => {
    const isValid = () => {
      const validEmail = email.match(/^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/ig);
      const minLength = 5;
      const maxLength = 11;
      const validName = name.length > maxLength;
      const validPassword = password.length > minLength;
      const validRole = (role === 'customer' || role === 'seller');

      if (validName && validEmail && validPassword && validRole) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    };

    isValid();
  }, [name, email, password, role, setIsDisable]);

  return (
    <main>
      <form action="">
        <input
          data-testid="admin_manage__input-name"
          type="text"
          name="name"
          id="name"
          placeholder="Nome e Sobrenome"
          onChange={ ({ target }) => setName(target.value) }
        />
        <input
          data-testid="admin_manage__input-email"
          type="email"
          name="email"
          id="email"
          placeholder="seu-email@site.com.br"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          data-testid="admin_manage__input-password"
          type="password"
          name="password"
          id="password"
          placeholder="*********"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <select
          data-testid="admin_manage__select-role"
          name="role"
          id="role"
          onChange={ ({ target }) => setRole(target.value) }
        >
          <option value="">Selecione a Role</option>
          <option value="seller">Vendedor</option>
          <option value="customer">Usuário</option>
        </select>
        <button
          data-testid="admin_manage__button-register"
          type="button"
          disabled={ isDisable }
          onClick={ (e) => handleClickAdminManagerNewUser(e) }
        >
          Cadastrar
        </button>
        <ErrorRegister />
      </form>
      <form action="">
        <table>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Remover</th>
          </tr>
          <tbody>
            { users.map((user, index) => (
              <tr key={ user.id }>
                <TableUsers user={ user } index={ index } />
                <button
                  data-testid={ `admin_manage__element-user-table-remove-${user.id}` }
                  type="submit"
                  onClick={ (e) => {
                    e.preventDefault();
                    deleteUsers(user.id);
                  } }
                >
                  Excluir
                </button>
              </tr>
            )) }
          </tbody>
        </table>
      </form>
    </main>
  );
}

export default AdminManagerNewUser;
