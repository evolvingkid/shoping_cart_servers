const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors());

app.use(express.json({
    extended: false
}));


app.get('/', (req, res) => res.send('Aparel-hub API Running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server starts on  ${PORT}`));