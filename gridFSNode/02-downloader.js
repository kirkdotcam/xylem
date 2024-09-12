const { MongoClient, ServerApiVersion, GridFSBucket, ObjectId } = require('mongodb');
const fs = require("fs");
const uri = "mongodb+srv://camkirk:bananabanana@cluster0.0ejrueo.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const db = client.db("test");
const bucket = new GridFSBucket(db);

async function getBucketItems(){
    const docs = await bucket.find({}).toArray()
    return docs
}

async function getImages(){
    let docs = await getBucketItems()
    console.log(docs)
    for (let imageData of docs){
        console.log(imageData.metadata?.species)
        bucket.openDownloadStream(imageData._id)
            .pipe(fs.createWriteStream(`./target/${imageData.metadata?.species}.jpg`))

    }



}

getImages()

// console.log(files)
