import jwt from "jsonwebtoken";


/**
 * To verify wether requested user is authenticated or not if authenticate he is admin or not 
 */
export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).json({ message: 'You are not authenticated. Please login again' });
        }



        // Split the header to get the Bearer token
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
            if(err){
                return res.status(403).json({message: "You are not authenticated. Please login again"})
            }
            if(payload?.role !== 'user'){
                return res.status(401).json({message: "Access denied!"})
            }
            if(payload){
                req.user = payload
                next()
            }
        })
        
    } catch (err) {
        console.log(`Error - ${err?.message} - [verifyToken]`)
        return res.status(500).json({message: "Internal Server Error"})
    }
}