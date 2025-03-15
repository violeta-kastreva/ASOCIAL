const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const User = require('./models/userModel');
        
        const userExists = await User.findOne({ 
            $or: [
                { email },
                { username }
            ]
        });
        
        if (userExists) {
            return res.status(400).json({ 
                message: userExists.email === email 
                    ? 'Email already registered' 
                    : 'Username already taken'
            });
        }
        
        const user = await User.create({
            username,
            email,
            password
        });
        
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 