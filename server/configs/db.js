import mongoose from "mongoose";
import dns from "dns";

// Fix: Node.js on this machine defaults to 127.0.0.1 as DNS server.
// Explicitly set reliable public DNS servers so MongoDB Atlas SRV lookups work.
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database connected"));
        mongoose.connection.on('error', (err) => console.error("MongoDB connection error:", err));
        mongoose.connection.on('disconnected', () => console.log("MongoDB disconnected"));

        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
}

export default connectDB;