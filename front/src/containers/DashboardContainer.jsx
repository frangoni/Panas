import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// ICONOS
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import AddIcon from '@material-ui/icons/Add';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import AddProducts from '../containers/AddProductContainer';
import AllProductsContainer from './AllProductsContainer';
import MetricsContainer from './MetricsContainer';
import AddProductsContainer from '../containers/AddProductContainer';
import SearchPlateContainer from './SearchPlateContainer';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    position: 'fixed',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: 'rgba(80, 69, 69)',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'visible',
    flexDirection: 'column',
  },
  icons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  },
  container: {
    margin: '0vh 0',
    overflowY: 'scroll',
  },
}));

export default function DashboardContainer() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [items, setItems] = useState(1);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
      >
        {open ? (
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerOpen} style={{ outline: 'none' }}>
              <ChevronLeftIcon style={{ color: 'white' }} />
            </IconButton>
          </div>
        ) : (
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerOpen} style={{ outline: 'none' }}>
              <ChevronRightIcon style={{ color: 'white' }} />
            </IconButton>
          </div>
        )}

        <Divider />
        <div className={classes.icons}>
          <ListItem button onClick={() => setItems(1)}>
            <ListItemIcon>
              <BarChartIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText style={{ color: 'white' }} primary={`Métricas`} />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setItems(2)}>
            <ListItemIcon>
              <ShoppingBasketIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText style={{ color: 'white' }} primary={`Productos`} />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setItems(3)}>
            <ListItemIcon>
              <AddIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText style={{ color: 'white' }} primary={`Añadir Productos`} />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setItems(4)}>
            <ListItemIcon>
              <SearchIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText style={{ color: 'white' }} primary={`Buscar Patente`} />
          </ListItem>
        </div>
      </Drawer>

      <Container maxWidth='xl' className={classes.container}>
        <Grid>
          <Grid item xs={12}>
            {items == 1 && <MetricsContainer />}
          </Grid>
          <Grid item xs={12}>
            {items == 2 && <AllProductsContainer />}
          </Grid>
          <Grid item xs={12}>
            {items == 3 && <AddProductsContainer />}
          </Grid>
          <Grid item xs={12}>
            {items == 4 && <SearchPlateContainer />}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
