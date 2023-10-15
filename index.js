/**
 * Main file to initialize the server
 * Creating mongoose connections
 * Using middlewares to check incoming request
 * Cors configuring
 */


import dotenv from "dotenv";
dotenv.config()


import { connectDatabase } from "./config/database.js";
import { httpServer } from "./app.js";


const PORT = process.env.port ||  3000
httpServer.listen(PORT, () => {
    try{
        connectDatabase()
        console.log(`Server listening at port - ${PORT}`)
    }catch(err){
        console.log("server not connect")
    }
})








