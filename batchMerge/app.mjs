import {MongoClient} from "mongodb";
const mongourl = "mongodb://localhost:27017";

const client = new MongoClient(mongourl)
await client.connect()
const db = client.db("test")
const renterCollection = db.collection("renterData")

//insert some fake data into the db
const fakedata = Array.from({length: 500}, ()=>  ({ ...{tenantId: "54321"} }))
await renterCollection.insertMany(fakedata)

//define the agg pipeline for our data
function definePipeline(tenantIdArg, skipValue, batchSize) {


  const matchTenant = {$match: {tenantId: tenantIdArg}}
  const skipTargets = {$skip: skipValue}
  const limitWindow = {$limit: batchSize}
  const setNewValue = {$set: {nextBillDue: new Date()} }
  const mergeToCollection = {$merge: {
    into: "renterData",
    on: "_id",
    whenMatched: "merge",
    whenNotMatched: "discard" //could also insert for upsert behavior
  }}

  return [
    matchTenant,
    skipTargets,
    limitWindow,
    setNewValue,
    mergeToCollection
  ]
}

async function run(){

  //using the definePipeline Method created above to 
  //generate the pipeline for our "batched" updates.
  //of course, you can also put this in a loop or function
  //to walk over a larger range of values to modify
  let initialOffset = 10
  let batchSize = 100

  //only updating documents 11-210 for this demo
  for (let i = 0; i < 3; i++){
    let pipeline = definePipeline("54321", ((i*batchSize) + initialOffset), batchSize)
    await renterCollection.aggregate(pipeline).toArray()
  }

  //will see counts for the docs modified, and the timestamps for when different grups of data were modified
  console.log(await renterCollection.aggregate([{$sortByCount: "$nextBillDue"}]).toArray())

}

run()
