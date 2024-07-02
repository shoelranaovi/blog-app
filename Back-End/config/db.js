import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://alineboyovi787:admin123@cluster0log.maeqci9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0log"
    );
  } catch (err) {
    console.log("Error", err);
  }
}

export default connectDB;
