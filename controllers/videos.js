/**
 * 
 */

import Notifications from "../models/Notifications.js";
import Submissions from "../models/Submission.js";
import Users from "../models/Users.js";
import Videos from "../models/Videos.js";

/**
 * To insert new programming video information
 * @param {*} req 
 * @param {*} res 
 * @throws {Error} when required body not came or db technical issue
 * @returns 
 */
export const createVideos = async (req, res) => {
    try {
        const { language, shortDescription, longDescription, url, quiz } = req?.body;

        if (!language || !shortDescription || !longDescription || !url || !quiz) {
            return res.status(400).json({ message: "Please enter all the required fields." })
        }
        if (quiz?.length <= 0) {
            return res.status(400).json({ message: "Please enter at least one quiz details" })
        }

        const videos = await Videos.create([{ language, shortDescription, longDescription, url, quiz }]);

        if (!videos) {
            throw new Error("Videos not inserted")
        }

        const notifications = await Notifications.create([{title: "Video Uploaded", from: "admin", to: "all", message: `A new ${language} language is uploaded. Please check once.`}])

        return res.status(200).json({ message: "Successfully inserted new video" })
    } catch (err) {
        console.log(`Error - ${err?.message} - [createVideos]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/**
 * To fetch all the videos to show case in the home page
 */
export const fetchVideos = async (req, res) => {
    try {
        let videos = await Videos.find({}).select("language shortDescription").lean();
        return res.status(200).json({ videos: videos ? videos : [], message: "Successfully fetched videos" })

    } catch (err) {
        console.log(`Error - ${err} - [fetchVideos]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/**
 * To fetch all the videos to show case in the home page
 */
export const updateFavorites = async (req, res) => {
    try {
        const { videoID, status } = req?.body
        console.log("sdsdgggggg", videoID, status)
        if (status === "pull") {
            const result = await Users.updateOne(

                { _id: req?.user?._id }, // Replace with the ID of the document you want to update
                { $pull: { favorites: videoID } }
            );
        }else if(status === "push"){
            const result = await Users.updateOne(

                { _id: req?.user?._id }, // Replace with the ID of the document you want to update
                { $push: { favorites: videoID } }
            );
        }
        return res.status(200).json({  message: "Successfully updated favorites" })

    } catch (err) {
        console.log(`Error - ${err} - [updateFavorites]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export const fetchVideoData = async (req, res) => {
    try {
        const { videoID } = req.params;
        let video = await Videos.findOne({ _id: videoID }).select(" language longDescription url").lean();
        if (!video) {
            return res.status(400).json({ message: "Video not found." })
        }

        const favorite = await Users.exists({ _id: req?.user?._id, favorites: { $in: [video?._id] } })

        video.favorite = favorite ? true : false


        return res.status(200).json({ video, message: "Successfully fetched video data" })

    } catch (err) {
        console.log(`Error - ${err} - [fetchVideoData]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}



export const fetchQuizData = async (req, res) => {
    try {
        const { videoID } = req.params;
        let quiz = await Videos.findOne({ _id: videoID }).select(" language quiz").lean();
        if (!quiz) {
            return res.status(400).json({ message: "Quiz not found." })
        }
        return res.status(200).json({ quiz, message: "Successfully fetched quiz data" })

    } catch (err) {
        console.log(`Error - ${err} - [fetchQuizData]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export const submitQuiz = async (req, res) => {
    try {
        const { videoID } = req.params;
        const { answers } = req?.body;
        let quiz = await Videos.findOne({ _id: videoID }).select("quiz").lean();
        if (!quiz) {
            return res.status(500).json({ message: "Internal Server Error." })
        }

        let index = 0;
        let score = 0
        for (const eachQuiz of quiz.quiz) {
            if (answers[index] === eachQuiz?.answer) {
                score += 1
            }
            index += 1
        }

        const submission = await Submissions.create([{ user: req?.user?._id, video: videoID, answersSubmitted: answers, score }])

        return res.status(200).json({ results: { score, total: index }, message: "Successfully calculated scores" })

    } catch (err) {
        console.log(`Error - ${err} - [fetchQuizData]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export const fetchFavoriteVideos = async (req, res) => {
    try {
        let users = await Users.findOne({ _id: req?.user?._id }).select("favorites").populate("favorites", "language shortDescription").lean();
        return res.status(200).json({  videos: users?.favorites, message: "Successfully fetched favorites videos" })

    } catch (err) {
        console.log(`Error - ${err} - [fetchFavoriteVideos]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}



export const searchVideos = async(req, res) => {
    try {

        const {searchQuery} = req?.query
        if(!searchQuery){
            return res.status(400).json({message: "Please enter something to search"})
        }
        let videos = await Videos.find({language: new RegExp(searchQuery, "i")}).select("language shortDescription").lean();
        return res.status(200).json({  videos, message: "Successfully fetched favorites videos" })

    } catch (err) {
        console.log(`Error - ${err} - [fetchFavoriteVideos]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}