import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
    userName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    mobile: {
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    refreshToken: {
        type: String
    }
}, { 
    timestamps: true 
});

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.generateAccessToken = async function () {
    return await JWT.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET_ACCESS_TOKEN_KEY, { expiresIn: process.env.JWT_EXPIRE_ACCESS_TIME });
}

adminSchema.methods.generateRefreshToken = async function () {
    return await JWT.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET_REFRESH_TOKEN_KEY, { expiresIn: process.env.JWT_EXPIRE_REFRESH_TIME });
}

const UserModel = mongoose.model("USER", adminSchema);
export default UserModel;