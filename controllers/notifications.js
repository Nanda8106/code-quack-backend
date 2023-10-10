import Notifications from "../models/Notifications.js"

export const fetchNotifications = async(req, res) => {
    try{
        const notifications = await Notifications.find({to: "all"}).lean()
        return res.status(200).json({notifications, message: "Successful"})
    }catch(err){
        console.log(`Error - ${err?.message} - [fetchNotifications]`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}