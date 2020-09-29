const express = require('express');
const app = express();
var cors = require('cors');
const connectDB = require('./config/db');
const firebaseAdminSDK = require('./config/firebaseadminsdk')

app.use(cors());
connectDB();

app.use(express.json({
    extended: false
}));

firebaseAdminSDK();

app.get('/', (req, res) => res.send('Aparel-hub API Running'));

app.use('/api/users/emailandpassword', require('./api/auth/emailandpassword'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server starts on  ${PORT}`));