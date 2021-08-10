import React from 'react';
import { GlassCard } from './styledcomponents';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import logo from '../images/color.png';

const firstColor = 'wheat';
const secondColor = 'white';

export default function Station({ services, user, setId, setHidden, setVisible }) {
  return (
    <GlassCard>
      <div id='form'>
        <img src={logo} id='logo' alt='logo' />
        <h2 className='title'>{user.rol && user.rol.toUpperCase()}</h2>
      </div>
      <List>
        {services.length ? (
          services.map(service => {
            return (
              <div key={service._id} id='station'>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalCarWashIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={service.cliente.patente}
                    primaryTypographyProps={{ style: { color: firstColor, fontSize: 'large' } }}
                    secondary={`${service.cliente.marca} ${service.cliente.modelo}`}
                    secondaryTypographyProps={{ style: { color: secondColor } }}
                    onClick={() => (setVisible(true), setId(service._id))}
                  />
                  <IconButton
                    onClick={() => {
                      setHidden(false);
                      setId(service._id);
                    }}
                    id='nextStation'
                  >
                    <DoubleArrowIcon style={{ color: firstColor }} fontSize='large' />
                  </IconButton>
                </ListItem>
                <Divider variant='inset' component='li' />
              </div>
            );
          })
        ) : (
          <ListItem>
            <ListItemText
              primary='NO HAY AUTOS PENDIENTES EN LA ESTACION'
              primaryTypographyProps={{
                style: {
                  color: firstColor,
                  fontSize: 'large',
                  textAlign: 'center',
                  marginBottom: '3vh',
                },
              }}
            />
          </ListItem>
        )}
      </List>
    </GlassCard>
  );
}
