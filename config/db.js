const mongoose = require("mongoose");
const config = require("config");
const dbURI = config.get("mongoURI");

// mongoose.connect(db); // To connect to mongoDB we use mongoose.connect and it returns us a promise.
connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1); // exit process with failure
  }
};

module.exports = connectDB;
