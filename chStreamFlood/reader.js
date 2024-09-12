const {MongoClient} = require("mongodb")
// import {MongoClient} from "mongodb";

const mongouri = "mongodb+srv://camkirk:bananabanana@cluster0.qdgica8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(mongouri);
const collection = client.db("test").collection("payloads");

const changeStream = collection.watch();
changeStream.on('change', theChange => {
  console.log(theChange);
});
