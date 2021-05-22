import React from 'react';
import { GlassCard } from './styledcomponents';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@material-ui/core';
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import logo from '../images/color.png';

const firstColor = 'wheat';
const secondColor = 'white';

export default function Station({ services, user, handleNext }) {
  return (
    <GlassCard>
      <div id='form'>
        <img src={logo} id='logo' alt='' />
        <h2 className='title'>{user && user.rol.toUpperCase()}</h2>
      </div>

      <List>
        {services &&
          services.map((service) => {
            return (
              <div id='station'>
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
                  />
                  <IconButton onClick={() => handleNext(service._id)} id='nextStation'>
                    <DoubleArrowIcon style={{ color: firstColor }} fontSize='large' />
                  </IconButton>
                </ListItem>
                <Divider variant='inset' component='li' />
              </div>
            );
          })}
      </List>
    </GlassCard>
  );
}
