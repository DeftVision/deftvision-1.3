const bcrypt = require('bcrypt');
const userModel = require('../models/userModel')
const { generateToken } = require('../utility/auth');



exports.newUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, location, active } = req.body
        if (!firstName || !email || !password || !role || !location || !lastName) {
            return res.send({
                message: 'all fields are required'
            })
        }
        const alreadyExist = await userModel.findOne({ email });
        if(alreadyExist){
            return res.send({
                message: 'email already used',
            })
        }

        const hashedPassword = await bcrypt.hash(password, 14);


        const user = new userModel({firstName, lastName, role, location, active, email, password: hashedPassword});
        await user.save();
        return res.send({
            message: 'user registered successfully',
            user,
        })

    } catch (error) {
        console.log(error);
        return res.send({
            message: 'failed to register user',
            error: error
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        if(!users) {
            return res.send({
                message: 'no users'
            })
        }
        return res.send({
            userCount: users.length,
            users,
        });
    } catch (error) {
        console.log(error);
        return res.send({
            message: 'error processing get users',
            error: error

        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findById(id);
        if(!user) {
            return res.send({
                message: 'User not found'
            })
        }
        return res.send({
            user,
        })
    } catch (error) {
        console.log(error)
        return res.send({
            message: 'error getting user'
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, password, role, location, active } = req.body;
        const user = await userModel.findByIdAndUpdate(id, req.body, {new: true});
        if(!user) {
            return res.send({
                message: 'User not found'
            })
        }
        return res.send({
            message: 'User updated successfully',
            user,
        })
    } catch (error) {
        console.log(error)
        return res.send({
            message: 'error processing user update'
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);
        if(!user) {
            return res.send({
                message: 'User not found'
            })
        }
        return res.send({
            message: 'User deleted successfully',
            user,
        })
    } catch (error) {
        console.log(error)
        return res.send({
            message: 'error processing user deletion',
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({
                message: '2 fields are required'
            })
        }


        const user = await userModel.findOne({ email })
        if (!user) {
            return res.send({
                message: 'error finding user'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.send({
                message: 'error logging in - check credentials',
            })
        }
        const token = generateToken(user._id);

        return res.send({
            message: 'user is logged in',
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        return res.send({
            message: "server error", error
        })

    }
}

exports.toggleUserStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {isActive} = req.body;
        const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if(!user) {
            return res.send({
                error: 'User not found',
            })
        } else {
            return res.send({
                message: 'User status updated successfully',
                user,
            })
        }
    }  catch (error) {

    }
}

exports.getUserData = async (req, res) => {
    try {
        const users = await userModel
            .find({})
            .select('username location role isActive');
        if(!users) {
            return res.send({
                message: 'No users found',
            });
        } else {
            return res.send({
                users
            })
        }
    } catch (error) {
        console.log(error)
        return res.send({
            message: 'Oops, something went wrong fetching the evaluations',
            error,
        })
    }
}
