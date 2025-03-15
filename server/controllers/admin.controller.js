import Joi from 'joi';
import UserModel from '../models/admin.model.js';
import customErrorHandler from '../helpers/customErrorHandler.js';
import { generateAccessAndRefreshToken } from '../helpers/generateAccessAndRefreshToken.js';

export const adminRegisterController = async (req, res) => {
    const { userName, email, mobile, password } = req?.body;

    // Define validation schema for user input data
    const userValidationData = Joi.object({
        userName: Joi.string().min(5).max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(8).required(),
        mobile: Joi.string().min(10).required()
    })

    // Validate input data
    const { error } = userValidationData.validate({ userName, email, mobile, password });
    if (error) {
        return res.status(400).json(new customErrorHandler(400, error.message));
    }

    const existingUser = await UserModel.findOne({
        $or: [{ email }, { mobile }]
    });  

    if (existingUser) {
        return res.status(400).json(new customErrorHandler(400, "User already exists"));
    }

    console.log(existingUser);

    // Create user instance
    const newUser = new UserModel({
        userName,
        email,
        mobile,
        password
    });

    // Save user to database;
    await newUser.save();

    res.status(201).json({
        status: 201,
        success: true,
        message: "User registered successfully",
        user: { userName, email, mobile }
    });
}

export const adminLoginController = async (req, res) => {
    const { email, password } = req.body;

    // validate email and password
    const loginValidationSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(8).required()
    });

    // Validate input data
    const { error } = loginValidationSchema.validate({ email, password });
    if (error) {
        return res.status(400).json(new customErrorHandler(400, error.message));
    }

    // // Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
        return res.status(401).json(new customErrorHandler(401, "Invalid email or password"));
    }

    const isMatch = await existingUser.comparePassword(password);
    if(!isMatch) {
        return res.status(401).json(new customErrorHandler(401, "Password does not match"));
    }

    // Generate JWT token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(existingUser._id);
    
    res.status(200).json({
        status: 200,
        success: true,
        message: "Login successfully",
        accessToken, 
        refreshToken
    })
}

export const adminLogoutController = async (req, res) => {
    await UserModel.findByIdAndUpdate(req.user._id, { 
        $unset: {
            refreshToken: 1
        }
    })

    return res.json({
        status: 200,
        message: 'Logged out successfully'
    })
}