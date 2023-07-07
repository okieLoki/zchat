require('dotenv').config()
const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_CONNECTION_URL)
  console.log('Database connected');
}

exports.connect = main