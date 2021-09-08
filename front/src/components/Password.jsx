import React from 'react';
import {
  Input,
  Option,
  Select,
  Table,
  TableData,
  TableHeader,
  TableRow,
  TransitionDiv,
} from './styledcomponents';
import { IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

const Password = ({ users, password, setPassword, setHidden, setId }) => {
  return (
    <TransitionDiv>
      <Table>
        <TableRow>
          <TableHeader>Usuario</TableHeader>
          <TableHeader>Contraseña</TableHeader>
        </TableRow>
        <TableRow>
          <TableData>
            <Select onChange={({ target }) => setId(target.value)}>
              <Option type='number' value={0}></Option>
              {users &&
                users.map(user => {
                  return (
                    <Option key={user._id} value={user._id}>
                      {user.nombre}
                    </Option>
                  );
                })}
            </Select>
          </TableData>
          <TableData>
            <Input
              placeholder={`Nueva contraseña`}
              title='password'
              type='text'
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
            <IconButton
              style={{ margin: '15px 0', outline: 'none' }}
              color='inherit'
              onClick={() => {
                setHidden(false);
              }}
            >
              <DoneIcon />
            </IconButton>
          </TableData>
        </TableRow>
      </Table>
    </TransitionDiv>
  );
};

export default Password;
