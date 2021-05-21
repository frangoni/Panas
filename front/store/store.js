import { configureStore } from '@reduxjs/toolkit';
import service from './reducer/service';
import client from './reducer/client';
import product from './reducer/product';
import user from './reducer/user';

const store = configureStore({
  reducer: {
    service,
    client,
    product,
    user,
  },
});

export default store;
