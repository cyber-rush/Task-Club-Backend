const User = require('../models/user')

const test = (req, res) => {
    res.json('test is working')
}

const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body

        //Check if name was entered
        if (!name) {
            return res.json({
                error: 'Name is requires'
            })
        }

        // Check if username was entered
        if (!username) {
            return res.json({
                error: 'Username is required'
            });
        }

        //Check if password is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be atleast 6 characters long'
            })
        }

        // Check email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.json({
                error: 'Email is taken'
            });
        }

        // Check username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.json({
                error: 'Username is taken'
            });
        }

        // Create a new user
        const newUser = await User.create({
            name,
            username,
            email,
            password
        });

        return res.json(newUser)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    test,
    registerUser
}