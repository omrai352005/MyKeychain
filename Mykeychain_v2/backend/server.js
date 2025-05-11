const express = require('express')
const dotenv= require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')



const app = express() 
const port = 3000
const { MongoClient } = require('mongodb');

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

// console.log(process.env.MONGO_URI) 
dotenv.config(); 


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'MyKeychain';
client.connect();
// Database Name
app.get('/', async(req, res) => {
    
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})
app.post('/', async(req, res) => {
    const password = req.body; 

    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({"succes":true , result:findResult});
})
app.delete('/', async(req, res) => {
    const password = req.body; 

    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({"succes":true , result:findResult} );
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})