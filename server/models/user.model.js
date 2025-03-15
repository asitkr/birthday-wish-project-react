import moment from "moment";
import mongoose from 'mongoose';

const userAllSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    dateOfBirth: { 
        type: String, 
        required: true 
    },
    notified: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true
});

const UserAllModel = mongoose.model("ALL_USER_DATA", userAllSchema);
export default UserAllModel;