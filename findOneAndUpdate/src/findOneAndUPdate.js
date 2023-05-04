const {MongoClient} = require("mongodb");

const mongouri = "mongodb+srv://camkirk:bananabanana@cluster0.3zt9gfn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongouri);
const collection = client.db("test").collection("payloads");

const cluster = require("cluster");
const process = require("process");
const numCPUs = require("os").cpus().length;

const documentKeys = {
    ID: "_id"
}

async function run() {
    
    const queryDoc = {
        [documentKeys.ID]:"testDoc"
    };
    const mutationDoc = {
        $inc:{
            value:1,
            timesAccessed:1
        }};
    const optionDoc = {
        upsert: true, 
        returnDocument: "after"
    };
    
    const testDoc = await collection.findOneAndUpdate(queryDoc, mutationDoc, optionDoc);
    console.log(testDoc)
    


}

if (cluster.isPrimary) {
    console.log(`primary: ${process.pid}`);

    for (let i = 0; i < numCPUs/2; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

} else {
    console.log(`starting ${process.pid}`);

    let loops = 0;
    while (loops < 10){
        run();
        loops++;
    }

    // process.exit();
}