import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DATABASE_Name}`);
        console.log(`Server Running on ${mongoose.connection.host}`.bgCyan.white);
    } 
    catch (error) {
        console.log(`${error}`.bgRed);
    }
}

export default connectDB;