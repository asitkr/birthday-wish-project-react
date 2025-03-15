import JWT from "jsonwebtoken";
import customErrorHandler from "../helpers/customErrorHandler.js";
import UserModel from "../models/admin.model.js";

/**
 * Middleware to verify access token and refresh if expired.
 */
export const verifyAccessToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.json(new customErrorHandler(401, "Access token required"));
    }

    // split the token
    const splitToken = token.split(" ")[1];

    let decodedToken;
    try {
        decodedToken = await JWT.verify(splitToken, process.env.JWT_SECRET_ACCESS_TOKEN_KEY);
    }
    catch (error) {
        return res.json(new customErrorHandler(401, "Invalid access token"));
    }

    // Find user in database
    const userId = await UserModel.findById(decodedToken?.id).select("-refreshToken");
    req.user = userId;
    
    next();
}