import Requests from "../models/Request.js";


export const requestVideos = async(req, res) => {
    try{
        const {language, message} = req?.body;
        if(!language){
            return res.status(400).json({message: "Please enter language name for which you are requesting."})
        }

        const newRequests = new Requests({
            language,
            user: req?.user?._id,

        })
        if(message){
            newRequests.message = message
        }
        const savedRequest = await newRequests.save()
        return res.status(200).json({message: "Your request sent to admin. "})
    }catch(err){
        console.log(`Error - ${err?.message} - [requestVideos]`)
        return res.status(500).json({message: "Internal Server Error"})
    }
}