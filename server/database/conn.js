const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

async function connect() {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoose.set('strictQuery',true)
    const options = { useNewUrlParser: true, useUnifiedTopology: true };

const db = await mongoose.connect(uri)
console.log("db connected");
return db


}
module.exports={
connect
}



