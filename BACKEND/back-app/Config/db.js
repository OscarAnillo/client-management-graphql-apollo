import mongoose from 'mongoose';

let connectDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Connected to ${connect.connection.host}`)
}


export default connectDB;