const mongoose = require('mongoose').set('debug', true);
mongoose
  .connect('mongodb://localhost:27017/panas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err));
