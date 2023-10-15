import request from "supertest"
import { app } from "../app.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

describe("Testing Auth routes", () => {

    describe("Testing on Login routes", () => {

        test("Testing if input details won't send", async () => {
            const data = {
                authData: "", password:""
            }
            const response = await request(app)
                .post('/api/v1/user/login')
                .send(data)
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Please enter email or username and password to login.");
        })

        test("Testing if credentials are wrong", async () => {
            const data = {
                authData: "sdfjbdkjbdkgjbg", password:"dskjfbsdkjgbdskgjdg"
            }
            const response = await request(app)
                .post('/api/v1/user/login')
                .send(data)
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
    
            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Invalid Credentials. PLease try again.");
        })


        test("Testing if credentials are right", async () => {
            const data = {
                authData: "randomuser@gmail.com", password:"Random@123"
            }
            const response = await request(app)
                .post('/api/v1/user/login')
                .send(data)
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
    
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Successfully logged in.");
        })
    })

    describe("Testing on signup routes", () => {

        test("Testing if signup details won't send", async () => {
            const data = {
                name: "", email: "", username: "", gender: "", password: "", deaf: ""
            }
            const response = await request(app)
                .post('/api/v1/user/signup')
                .send(data)
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')

            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Please enter all the required fields.");

            mongoose.disconnect()
        })
    })


    
})