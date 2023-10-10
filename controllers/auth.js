/**
 * File to perform the task related to authorization
 * Controllers:
 *          - signup
 *          - login
 *          - logout
 */


import Users from "../models/Users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


/**
 * store the user data in database
 * before saving the data we are hashing the password using bcrypt package
 * @param {} req 
 * @param {*} res 
 * @returns 
 */
export const signup = async (req, res) => {
    try {
        const { name, email, username, gender, password, deaf } = req?.body;

        const hash = await bcrypt.hash(password, 10)  // encrypting the password
        const user = await Users.create([{ name, username, email, gender, password: hash, deaf }]) // storing the details in db

        if (!user) {
            console.log(`Error - User data not created for user ${name} - [signup]`)
            return res.status(500).json({ message: "Internal Server Error" })
        }
        return res.status(200).json({ message: "Successfully your account was created. Please login to access your account." })
    } catch (err) {
        console.log(`Error - ${err?.message} - [signup]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}



/**
 * Checks the user login data and gives user access to access the application
 * If credentials correct creates token to authorize
 * @param {} req 
 * @param {*} res 
 * @returns 
 */
export const login = async (req, res) => {
    try {
        const { authData, password } = req?.body;

        if (!authData || !password) {
            return res.status(400).json({ message: "Please enter email or username and password to login." })
        }

        // checking if email or username exist or not in db
        let user = await Users.findOne({ $or: [{ email: authData }, { username: authData }] }).select("password role").lean()

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials. PLease try again." })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password) // comparing the hash password stored in db and current user entered password
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid Credentials. PLease try again." })
        }

        let token = jwt.sign({_id: user?._id, role: user?.role}, process.env.TOKEN_SECRET, {expiresIn: "2d"} )

        return res.status(200).json({ token, message: "Successfully logged in." })
    } catch (err) {
        console.log(`Error - ${err?.message} - [signup]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export const fetchProfile = async(req, res) => {
    try{
        const user = await Users.findOne({_id: req?.user?._id}).select("name email gender").lean()
        return res.status(200).json({user, message: "Successfully fetched Profile data"})
    }catch (err) {
        console.log(`Error - ${err?.message} - [fetchProfile]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export const resetPassword = async(req, res) => {
    try{
        const { oldPassword, newPassword } = req?.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Please enter all the required details" })
        }

        // checking if email or username exist or not in db
        let user = await Users.findOne({ _id: req?.user?._id}).select("password").exec()
        if (!user) {
            return res.status(401).json({ message: "Something went wrong." })
        }



        const isPasswordCorrect = await bcrypt.compare(oldPassword, user?.password) // comparing the hash password stored in db and current user entered password
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Your old password is incorrect" })
        }  

        const hash = await bcrypt.hash(newPassword, 10)  // encrypting the password
        
        user.password = hash

        await user.save()

        return res.status(200).json({message: "Successfully reset your password"})


    }catch (err) {
        console.log(`Error - ${err?.message} - [resetPassword]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}