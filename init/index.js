const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listining.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/findmyroom";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "691e8ad7b0feb036d9542de0",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
