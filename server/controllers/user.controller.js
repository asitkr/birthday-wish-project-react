import Joi from "joi";
import moment from "moment";
import nodemailer from "nodemailer";
import customErrorHandler from "../helpers/customErrorHandler.js";
import UserAllModel from "../models/user.model.js";
import UserModel from "../models/admin.model.js";

export const addUserController = async (req, res) => {
    // Extracted from token
    const adminId = req.user._id;

    // Get today's date
    const today = moment().format("DD/MM/YYYY");

    if (!adminId) {
        return res.status(401).json(new customErrorHandler(401, "Unauthorized: Invalid Token"));
    }

    // Verify the admin exists in the database
    const admin = await UserModel.findById(adminId);
    if (!admin) {
        return res.status(403).json(new customErrorHandler(403, "Forbidden: Admin not found"));
    }

    const { userName, email, dateOfBirth, description } = req.body;

    // Define validation schema for user input data
    const userValidationData = Joi.object({
        userName: Joi.string().min(5).max(10).required(),
        email: Joi.string().email().required(),
        description: Joi.string().max(400).required(),
        dateOfBirth: Joi.string()
            .pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
            .custom((value, helpers) => {
                const parsedDate = moment(value, "DD/MM/YYYY", true);
                if (!parsedDate.isValid()) {
                    return helpers.message("Date of birth must be in DD/MM/YYYY format");
                }
                if (parsedDate.isAfter(moment())) {
                    return helpers.message("Date of birth cannot be in the future");
                }
                return value;
            })
            .required()
    })

    // Validate input data
    const { error } = userValidationData.validate({ userName, email, dateOfBirth, description });
    if (error) {
        return res.status(400).json(new customErrorHandler(400, error.message));
    }

    const existingUser = await UserAllModel.findOne({
        $or: [{ email }]
    });

    if (existingUser) {
        return res.status(400).json(new customErrorHandler(400, "User already exists"));
    }

    // Create user instance
    const newUser = new UserAllModel({
        userName,
        email,
        dateOfBirth: moment(dateOfBirth, "DD/MM/YYYY").toDate(),
        description
    });

    await newUser.save();

    return res.status(201).json({
        status: 200,
        success: true,
        message: "User created successfully",
        user: newUser
    });
}

// export const sendBirthMessageOnMails = async (req, res) => {
//     try {
//         // Get today's date and month
//         const todayDate = moment().format("DD/MM");
//         const todayDay = parseInt(moment().format("D"), 10); // Converts "01" -> 1, "10" -> 10
//         const todayMonth = parseInt(moment().format("M"), 10); // Converts "06" -> 6, "12" -> 12

//         //     // Check if it's December 30, reset notified for all users
//         //     if (todayDate === "1/1") {
//         //         await UserAllModel.updateMany({}, { $set: { notified: false } });
//         //         return res.status(200).json(new customErrorHandler(200, "Notified status reset for all users."));
//         //     }

//         //     // Fetch users from the database
//         //     const birthdayUsers = await UserAllModel.find();

//         //     if (!birthdayUsers || birthdayUsers?.length === 0) {
//         //         return res.status(400).json({ status: 400, success: false, message: "No users found in the database." });
//         //     }

//         //     // Filter users whose birthday matches today's date & month
//         //     const usersWithBirthday = birthdayUsers?.filter(user => {
//         //         if (!user?.dateOfBirth) {
//         //             return false;
//         //         }

//         //         const userDay = parseInt(moment(user?.dateOfBirth).format("D"), 10);
//         //         const userMonth = parseInt(moment(user?.dateOfBirth).format("M"), 10);

//         //         return userDay === todayDay && userMonth === todayMonth;
//         //     });

//         //     if (usersWithBirthday?.length === 0) {
//         //         return res.status(400).json(new customErrorHandler(400, "No birthdays today."));
//         //     }

//         //     const transporter = nodemailer.createTransport({
//         //         service: "gmail",
//         //         auth: {
//         //             user: process.env.EMAIL_USER,
//         //             pass: process.env.EMAIL_PASS,
//         //         }
//         //     });

//         //     // Send emails and update notified status
//         //     for (const user of usersWithBirthday) {
//         //         const mailOptions = {
//         //             from: process.env.EMAIL_USER,
//         //             to: user.email,
//         //             subject: `🎉 Happy Birthday, ${user.userName}! 🎂`,
//         //             text: `Dear ${user.userName},\n\nWishing you a fantastic birthday filled with love and joy! 🎈🎁\n\n${user.description}\n\nBest wishes,\nYour Team`
//         //         };

//         //         try {
//         //             await transporter.sendMail(mailOptions);
//         //             console.log(`Email sent to ${user.email}`);

//         //             // Update notified to true
//         //             await UserAllModel.updateOne({ _id: user._id }, { $set: { notified: true } });
//         //         } catch (error) {
//         //             console.error(`Error sending email to ${user.email}:`, error);
//         //         }
//         //     }

//         //     return res.status(200).json({
//         //         status: 200,
//         //         success: true,
//         //         notified: true,
//         //         message: "Birthday emails sent successfully!"
//         //     });
//         // }
//         // catch (error) {
//         //     console.error("Error in sendBirthMessageOnMails:", error);
//         //     if (res) {
//         //         return res.status(500).json({ status: 500, success: false, message: "Internal server error." });
//         //     }
//         // }

//         // Reset notified status for all users on January 1st
//         if (todayDay === 1 && todayMonth === 1) {
//             await UserAllModel.updateMany({}, { $set: { notified: false } });
//             return res.status(200).json({ status: 200, success: true, message: "Notified status reset for all users." });
//         }

//         // Fetch users from the database
//         const birthdayUsers = await UserAllModel.find({}, "dateOfBirth email userName description notified");

//         if (!birthdayUsers || birthdayUsers.length === 0) {
//             return res.status(404).json({ status: 404, success: false, message: "No users found in the database." });
//         }

//         // Filter users whose birthday matches today's date & month
//         const usersWithBirthday = birthdayUsers.filter(user => {
//             if (!user?.dateOfBirth) return false;

//             const userDay = parseInt(moment(user.dateOfBirth).format("D"), 10);
//             const userMonth = parseInt(moment(user.dateOfBirth).format("M"), 10);

//             return userDay === todayDay && userMonth === todayMonth;
//         });

//         if (!usersWithBirthday.length) {
//             return res.status(200).json({ status: 200, success: true, message: "No birthdays today." });
//         }

//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             }
//         });

//         // Send emails only if there are users with birthdays
//         for (const user of usersWithBirthday) {
//             const mailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: user.email,
//                 subject: `🎉 Happy Birthday, ${user.userName}! 🎂`,
//                 text: `Dear ${user.userName},\n\nWishing you a fantastic birthday filled with love and joy! 🎈🎁 ${user.description && `\n\n${user.description}`}\n\n
// May this year bring you success, health, and endless happiness. Enjoy your special day!\n\nBest wishes,\n${user.userName}`
//             };

//             try {
//                 await transporter.sendMail(mailOptions);

//                 // Update notified status
//                 await UserAllModel.updateOne({ _id: user._id }, { $set: { notified: true } });
//             } catch (error) {
//                 console.error(`Error sending email to ${user.email}:`, error);
//             }
//         }

//         return res.status(200).json({
//             status: 200,
//             success: true,
//             message: "Birthday emails sent successfully!",
//             notified: true,
//         });

//     } catch (error) {
//         console.error("Error in sendBirthMessageOnMails:", error);
//         return res?.status(500).json({ status: 500, success: false, message: "Internal server error." });
//     }
// }

export const sendBirthMessageOnMails = async (req, res) => {
    try {
        // Get today's date in "DD-MM" format
        const todayDate = moment().format("DD-MM");

        // Reset notified status for all users on January 1st
        if (todayDate === "01-01") {
            await UserAllModel.updateMany({}, { $set: { notified: false } });
            return res.status(200).json({ status: 200, success: true, message: "Notified status reset for all users." });
        }

        // Fetch users from the database
        const birthdayUsers = await UserAllModel.find({}, "dateOfBirth email userName description notified");

        if (!birthdayUsers || birthdayUsers.length === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No users found in the database." });
        }

        // Filter users whose birthday matches today's date (ignoring the year)
        const usersWithBirthday = birthdayUsers.filter(user => {
            if (!user?.dateOfBirth) return false;

            // Extract "DD-MM" from stored dateOfBirth (string format)
            const userBirthDate = user.dateOfBirth.substring(0, 5); // Extracts "DD-MM"

            return userBirthDate === todayDate;
        });

        if (!usersWithBirthday.length) {
            return res.status(200).json({ status: 200, success: true, message: "No birthdays today." });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        // Send emails only if there are users with birthdays
        for (const user of usersWithBirthday) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: `🎉 Happy Birthday, ${user.userName}! 🎂`,
                text: `Dear ${user.userName},\n\nWishing you a fantastic birthday filled with love and joy! 🎈🎁 
                ${user.description ? `\n\n${user.description}` : ""}
                
                May this year bring you success, health, and endless happiness. Enjoy your special day!\n\nBest wishes,\nYour Team`
            };

            try {
                await transporter.sendMail(mailOptions);

                // Update notified status
                await UserAllModel.updateOne({ _id: user._id }, { $set: { notified: true } });
            } catch (error) {
                console.error(`Error sending email to ${user.email}:`, error);
            }
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Birthday emails sent successfully!",
            notified: true,
        });

    } catch (error) {
        console.error("Error in sendBirthMessageOnMails:", error);
        return res.status(500).json({ status: 500, success: false, message: "Internal server error." });
    }
};
