const MongoClient = require('mongodb').MongoClient;

require('dotenv').config()


const connectDb = (dbName, collectionName) => {
    const uri = process.env.MONGO_URI
    const client = new MongoClient(uri)
    const db = client.db(dbName).collection(collectionName)
    return {
        client,
        db
    }
}

module.exports = { connectDb }