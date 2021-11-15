require('dotenv').config();
const mongoose = require('mongoose');
const { DB_PASS } = process.env;
mongoose
  .connect(`mongodb+srv://dario:${DB_PASS}@panas.hb59c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch(err => console.log(err));
