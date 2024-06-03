import bcrypt from 'bcrypt';
import User from "../Model/userModel.js";
import genTokenAndSetCookie from '../utils/genToken.js';

export const signupUser = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).send('Password don not matched!')
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('User already exist! ');
        }

        //Hashing Password with salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });


        if (newUser) {

            const token = genTokenAndSetCookie(newUser._id)
            await newUser.save();

            res.status(201).json({
                message: 'User Created Successfully',
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
                token: token
            })
        }
        else {
            res.status(400).json({ error: 'Invalid user data' })
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error while creating user!'
        })

    }
};

export const loginUser = async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({
                error: 'Invaild Username or Password !'
            })
        }

        const token = genTokenAndSetCookie(user._id, res);

        res.status(201).json({
            message: 'login Successful',
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            token: token
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error while logging in',
        })
    }
};

export const logoutUser = (req, res) => {
    try {

        // res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: 'Logged Out Successfully' })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error during logOut'
        })
    }
};