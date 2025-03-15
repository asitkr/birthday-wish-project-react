import cors from "cors";
import cron from "node-cron";
import express from 'express';
import adminRouter from './routes/admin.route.js';
import userRouter from './routes/user.route.js';
import { sendBirthMessageOnMails } from "./controllers/user.controller.js";

// express object
const app = express();

// Proper CORS configuration
const corsOptions = {
    origin: "birthday-wish-project-react.vercel.app", // Change this to your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allows cookies if needed
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/admin", userRouter);

// Run birthday mail function safely
// (async () => {
//     try {
//         const mockReq = {};
//         const mockRes = {
//             status: (code) => ({
//                 json: (data) => console.log("Response:", data)
//             })
//         };

//         await sendBirthMessageOnMails(mockReq, mockRes);
//     } catch (error) {
//         console.error("Error sending birthday emails:", error);
//     }
// })();

cron.schedule("0 10 * * *", async () => {
    console.log("Running scheduled birthday email job at 9:25 PM...");
    try {
        await sendBirthMessageOnMails({}, {
            status: (code) => ({
                json: (data) => console.log("Response:", data),
            }),
        });
    } catch (error) {
        console.error("Error running scheduled birthday email job:", error);
    }
});


export default app;
