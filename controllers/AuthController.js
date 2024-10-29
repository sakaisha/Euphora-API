import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please provide username, email, and password' });
    }

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user: { id: user.id } };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token }); // Return the token
    } catch (err) {
        console.log('Error during registration:', err);
        res.status(500).send('Server error');
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide email and password' });
    }

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token }); // Return the token
    } catch (err) {
        console.log('Error during login:', err);
        res.status(500).send('Server error');
    }
};

export const verifyJWT = async (token) => {
    try {
        const userJWT = jwt.verify(token, process.env.JWT_SECRET);
        if (userJWT) {
            const user = await User.findById(userJWT.user.id); // Access user ID from the decoded token
            return user ? user : false;
        }
    } catch (error) {
        console.log('Invalid token:', error);
        return false; // Return false if verification fails
    }
};