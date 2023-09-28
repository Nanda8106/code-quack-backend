/**
 * 
 */

import Videos from "../models/Videos.js";

/**
 * To insert new programming video information
 * @param {*} req 
 * @param {*} res 
 * @throws {Error} when required body not came or db technical issue
 * @returns 
 */
export const createVideos = async(req, res) => {
    try{
        const {language, shortDescription, longDescription, url, quiz} = req?.body;

        if(!language || !shortDescription || !longDescription || !url  || !quiz){
            return res.status(400).json({message: "Please enter all the required fields."})
        }
        if(quiz?.length <= 0){
            return res.status(400).json({message: "Please enter at least one quiz details"})
        }

        const videos = await Videos.create([{language, shortDescription, longDescription, url, quiz }]);

        if(!videos){
            throw new Error("Videos not inserted")
        }

        return res.status(200).json({message: "Successfully inserted new video"})
    }catch(err){
        console.log(`Error - ${err?.message} - [createVideos]`)
        return res.status(500).json({message: "Internal Server Error"})
    }
}


/**
 * To fetch all the videos to show case in the home page
 */
export const fetchVideos = async(req, res) => {
    try{
        let videos = await Videos.find({}).select("language shortDescription").lean();
        return res.status(200).json({videos: videos? videos : [], message: "Successfully fetched videos"})
        
    }catch(err){
        console.log(`Error - ${err} - [fetchVideos]`)
        return res.status(500).json({message: "Internal Server Error"})
    }
}