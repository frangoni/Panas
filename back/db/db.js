require('dotenv').config();
const mongoose = require('mongoose');
const { PASS } = process.env;
mongoose
  .connect(`mongodb+srv://admin:${PASS}@cluster0.twouk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch(err => console.log(err));
