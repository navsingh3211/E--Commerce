const mongoose = require("mongoose");
// const MONGODB_URI = process.env.MONGODB_URI;
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongo database is connected!!! ${conn.connection.host} `);
  } catch (error) {
    console.error(`Error: ${error} `);
    process.exit(1); //passing 1 - will exit the proccess with error
  }
};

module.exports = {
  connectDB
};
// export default connectDB;