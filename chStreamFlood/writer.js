const { MongoClient } = require("mongodb");
// import {MongoClient} from "mongodb";

const mongouri = "mongodb+srv://camkirk:bananabanana@cluster0.qdgica8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(mongouri);
const collection = client.db("test").collection("payloads");

const cluster = require("cluster");
const process = require("process");
const numCPUs = require("os").cpus().length;

function generate() {
    return [...Array(200)].map(() => {
        return { value: Math.round(Math.random() * 20) }
    })
}

function write() {
    const values = generate();

    collection.insertMany(values, { ordered: false }, (result) => {
        write();
    });

}

if (cluster.isPrimary) {
    console.log(`primary: ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

} else {
    console.log(`starting ${process.pid}`);
    write();

}

// while (true) {
//     write();

// }
