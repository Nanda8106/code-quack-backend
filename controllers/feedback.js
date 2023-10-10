import Feedbacks from "../models/Feedback.js"

export const createFeedback = async(req, res) => {
    try{
        const {rating, videos, quiz, ui, icons, favoritePage} = req?.body
        let feedback = await Feedbacks.create([{user: req?.user?._id, rating, videos, quiz, ui, icons, favoritePage}])
        return res.status(200).json({message: "Successfully uploaded feedback"})
    }catch (err) {
        console.log(`Error - ${err?.message} - [createFeedback]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}