//require mongodb will return a mongo object, but we are only interested in the mongoclient object inside the mongo object. mongoclient = mongoshell
const MongoClient = require("mongodb").MongoClient; 

async function connect (mongoUri, dbName){
    const client = await MongoClient.connect(mongoUri, {
        "useUnifiedTopology": true //to use all different versions of mongo
    })
    
    const db = client.db(dbName);
    return db;
}

module.exports = {
    connect //or just connect since key and value are exactly the same
}