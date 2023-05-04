const {MongoClient} = require("mongodb");

const mongouri = "mongodb+srv://camkirk:bananabanana@cluster0.0ejrueo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongouri);
const collection = client.db("test").collection("payloads");

const changeStream = collection.watch();
changeStream.on('change', theChange => {
  console.log(theChange);
});
