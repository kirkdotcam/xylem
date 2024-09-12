
const { MongoClient, ServerApiVersion, GridFSBucket } = require('mongodb');
const fs = require("fs")
const path = require("path")
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


function findFiles(){
  return fs.readdirSync("./images")
}
// console.log(findFiles())

async function uploadFiles(){
  let filenames = findFiles()

  for (let filename of filenames){
    
    let species = filename.slice(0,-4)
    console.log(`uploading ${filename}`)
    fs.createReadStream(`./images/${filename}`)
        .pipe(
            bucket.openUploadStream(species, {
                chunkSizeBytes: 1024*1024, //1MB chunks
                metadata:{ 
                  description: "Basil Plant", 
                  species: `${species}`
                }
            })
        )
  }

}

uploadFiles()


