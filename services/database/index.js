import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

// async function initialize() {
//   await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "Quizzes",
//   });

//   const db = mongoose.connection;
//   db.on("error", console.error.bind(console, "Mongoose Connection Error: "));
//   db.once("open", function () {
//     console.log("Mongoose Connection Established");
//   });

//   return db;
// }

// const db = await initialize();
// export default db;

export default await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Quizzes",
});
