/**
 * Configuring the cors options like from which origin the backend can accept the request
 */
export const corsOptions = {
    // origin: process.env.CLIENT_URL,
    origin: "*",
    methods: "POST, GET, DELETE, PUT",
    optionsSuccessStatus: 200
}