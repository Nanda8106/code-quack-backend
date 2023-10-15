import request from "supertest"
import { app } from "../app.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

describe("Testing Videos routes", () => {

        test("Testing on successful fetching videos", async () => {
            
            const response = await request(app)
                .get('/api/v1/auth/videos/all')
                .set('Content-type', 'application/json')

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Successfully fetched videos");

            mongoose.disconnect()
        })



})