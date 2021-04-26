import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// ICONOS
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BarChartIcon from "@material-ui/icons/BarChart";
import AddIcon from "@material-ui/icons/Add";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";

import Checkin from "../containers/CheckinContainer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "mediumaquamarine",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  icons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
  },
}));

export default function Panel() {
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
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
      >
        {open ? (
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerOpen} style={{ outline: "none" }}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        ) : (
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerOpen} style={{ outline: "none" }}>
              <ChevronRightIcon />
            </IconButton>
          </div>
        )}

        <Divider />
        <div className={classes.icons}>
          <ListItem button onClick={() => setItems(1)}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItem>
          <Divider />

          <ListItem button onClick={() => setItems(6)}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Métricas" />
          </ListItem>
          <Divider />

          <ListItem button onClick={() => setItems(3)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Añadir Productos" />
          </ListItem>
        </div>
      </Drawer>

      <Container maxWidth="lg" className={classes.container}>
        <Grid>
          <Grid item xs={12}>
            {items == 1 && <Checkin />}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
