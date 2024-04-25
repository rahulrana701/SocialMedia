import mongoose from "mongoose";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const baseurl = process.env.DB_URL;

const connectionString = `${baseurl}`;
console.log(connectionString);

export const dbconnect = async () => {
  await mongoose.connect(connectionString);
};
