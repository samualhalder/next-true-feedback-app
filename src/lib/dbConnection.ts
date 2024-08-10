import mongoose from "mongoose";

type connectionType = {
  isConnected?: number;
};

const conection: connectionType = {};

async function dbConect(): Promise<void> {
  if (conection.isConnected) {
    console.log("data base is already connected.");

    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || "");
    conection.isConnected = db.connections[0].readyState;
    console.log("data base connected succesfully");
  } catch (error) {
    console.log("db connection failed", error);
    process.exit(1);
  }
}

export default dbConect;
