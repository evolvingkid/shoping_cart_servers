const express = require('express');
const app = express();
var cors = require('cors');
const connectDB = require('./config/db');
const firebaseAdminSDK = require('./config/firebaseadminsdk');
const mongoose = require('mongoose');

app.use(cors());
connectDB();

app.use(express.json({
    extended: false
}));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

firebaseAdminSDK();

app.get('/', (req, res) => res.send('Aparel-hub API Running'));

app.use('/api/users/emailandpassword', require('./api/auth/emailandpassword'));

app.use('/api/users/auth/emailandpassword', require('./api/auth/emailandpasswordlogin'));

app.use('/api/users/auth/externalSignup', require('./api/auth/googlesigin'));

app.use('/api/external/category', require('./api/externaldata/category'));

app.use('/api/external/product', require('./api/externaldata/product'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server starts on  ${PORT}`));