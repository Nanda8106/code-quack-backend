/**
 * A middle ware to check the details of users whether the input is in correct or not
 */

import Users from "../models/Users.js"




/**
 * Verifies the user details and if correct then give access to next procedure
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const verifyDetails = async(req, res, next) => {
    try{
        const {name, username, email, gender, deaf, password} = req.body

        if(!name || !username || !email || !gender || deaf === undefined || !password){
            return res.status(401).json({message: "Please enter all the required fields."})
        }

        // validating each input 

        // checking if username already exist or not
        const usernameExist = await Users.exists({username})
        if(usernameExist){
            return res.status(400).json({message: "Username already exist. Please retry with another username."})
        }

        // checking if email already exist or not
        const emailExist = await Users.exists({email})
        if(emailExist){
            return res.status(400).json({message: "Email already exist. Please retry with another email."})
        }


        // checking if gender input is correct or not
        if(!["male", "female", "other"]?.includes(gender)){
            return res.status(400).json({message: "Failed to process request because gender is incorrect. Contact admin"})
        }

        next()


    }catch(err){
        console.log(`Error - ${err?.message} - [verifyDetails]`)
        return res.status(500).json({message: "Internal Server Error"})
    }
}