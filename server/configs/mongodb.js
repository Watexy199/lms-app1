import mongoose from "mongoose";

let isConnected = false; // track connection across invocations

const connectDB = async () => {
  if (isConnected) return; // Already connected, skip

  try {
    mongoose.connection.on("connected", () => console.log("Database Connected"));
    mongoose.connection.on("error", (err) => console.error("DB connection error:", err));

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // fail immediately if DB not ready
    });

    isConnected = true; // mark as connected
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;




// import mongoose from "mongoose";

// //Connect to the MongoDB database

// const connectDB = async () => {
//     mongoose.connection.on("connected", ()=> console.log("Database Connected"))
//     await mongoose.connect(process.env.MONGO_URI);

// }

// export default connectDB