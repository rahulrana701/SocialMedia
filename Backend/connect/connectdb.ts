import mongoose from "mongoose";

const baseurl = process.env.DB_URL;

const connectionString = `${baseurl}`;
console.log(connectionString);

export const dbconnect = async () => {
  await mongoose.connect(connectionString);
};
