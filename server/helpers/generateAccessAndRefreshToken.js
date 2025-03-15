import UserModel from "../models/admin.model.js"

export const generateAccessAndRefreshToken = async (id) => {
    const user = await UserModel.findById(id);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
        validateBeforeSave: true,
    });

    return { accessToken, refreshToken };
}