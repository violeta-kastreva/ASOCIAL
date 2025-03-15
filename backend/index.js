require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const userRoutes = require('./routes/user.route');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(express.json());
app.use(helmet());

app.use('/auth', userRoutes);



app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});


